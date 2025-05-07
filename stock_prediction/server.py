import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import StandardScaler
import warnings
import pickle
import os
from flask import Flask, jsonify, request 
from flask_cors import CORS

warnings.filterwarnings('ignore', category=UserWarning, module='sklearn')

# --- Configuration ---
N_LAGS = 3 
TEST_SPLIT_RATIO = 0.2
CSV_PATH = "sim_stock_data720d.csv"

# --- Pickle Filenames ---
MODEL_FILENAME = "stock_model.pkl"
SCALER_FILENAME = "stock_scaler.pkl"
LAG_COLS_FILENAME = "lag_columns.pkl"
MODEL_FEATURE_COLS_FILENAME = "model_feature_columns.pkl"
MODEL_COMPANY_IDS_FILENAME = "model_company_ids.pkl"

# --- Flask App Initialization ---
app = Flask(__name__)
CORS(app) 

# --- Global Variables for Model and Data ---
active_model = None
active_scaler = None
active_lag_cols_to_scale = None
active_model_feature_columns = None
active_model_company_ids = None
full_df_context = None 
predictor_initialized = False

# --- Helper Functions ---

def load_and_preprocess_data_for_flask(csv_path=CSV_PATH, n_lags=N_LAGS):
    try:
        df = pd.read_csv(csv_path)
    except FileNotFoundError:
        app.logger.error(f"Error: The file {csv_path} was not found.")
        return None, None, None, None, None

    df['Date'] = pd.to_datetime(df['Date'])
    df.sort_values(by=['CompanyID', 'Date'], inplace=True)

    for i in range(1, n_lags + 1):
        df[f'Price_lag{i}'] = df.groupby('CompanyID')['Price'].shift(i)

    company_id_dummies = pd.get_dummies(df['CompanyID'], prefix='CompanyID')
    all_company_ids_ordered = sorted(list(df['CompanyID'].unique()))
    df_processed = pd.concat([df.copy(), company_id_dummies], axis=1)
    
    current_feature_columns = [f'Price_lag{i}' for i in range(1, n_lags + 1)] + \
                              [f'CompanyID_{cid}' for cid in all_company_ids_ordered]
    target_column = 'Price'
    columns_for_nan_check = [target_column] + [f'Price_lag{i}' for i in range(1, n_lags + 1)]
    df_processed.dropna(subset=columns_for_nan_check, inplace=True)

    if df_processed.empty:
        app.logger.error("Error: DataFrame is empty after preprocessing.")
        return None, None, None, None, None

    for col in current_feature_columns:
        if col not in df_processed.columns:
            df_processed[col] = 0

    X = df_processed[current_feature_columns]
    y = df_processed[target_column]
    
    return X, y, df_processed, current_feature_columns, all_company_ids_ordered

def train_model_for_flask(X, y, test_split_ratio=TEST_SPLIT_RATIO):
    if X is None or y is None or X.empty or y.empty:
        app.logger.error("Error: Cannot train model with empty X or y.")
        return None, None, None

    split_index = int(len(X) * (1 - test_split_ratio))
    X_train, X_test = X.iloc[:split_index], X.iloc[split_index:]
    y_train, y_test = y.iloc[:split_index], y.iloc[split_index:]

    if X_train.empty or X_test.empty:
        app.logger.error(f"Error: Training or test set is empty. X_train: {X_train.shape}, X_test: {X_test.shape}")
        return None, None, None

    lag_feature_columns_to_scale = [col for col in X_train.columns if 'Price_lag' in col]
    
    scaler = StandardScaler()
    X_train_scaled = X_train.copy()
    X_test_scaled = X_test.copy()

    if not lag_feature_columns_to_scale: 
        app.logger.warning("No lag features to scale.")
    else:
        X_train_scaled[lag_feature_columns_to_scale] = scaler.fit_transform(X_train[lag_feature_columns_to_scale])
        X_test_scaled[lag_feature_columns_to_scale] = scaler.transform(X_test[lag_feature_columns_to_scale])
    
    model = LinearRegression()
    model.fit(X_train_scaled, y_train)

    y_pred_test = model.predict(X_test_scaled)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    mae = mean_absolute_error(y_test, y_pred_test)
    r2 = r2_score(y_test, y_pred_test)
    app.logger.info("\n--- Model Evaluation (on Test Set during training) ---")
    app.logger.info(f"RMSE: {rmse:.4f}")
    app.logger.info(f"MAE: {mae:.4f}")
    app.logger.info(f"R-squared (R²): {r2:.4f}")
    
    return model, scaler, lag_feature_columns_to_scale

def predict_single_company_price_from_history(company_name_to_predict, current_full_df_context, 
                                   model_to_use, scaler_to_use, 
                                   feature_columns_model_expects,
                                   lag_columns_to_scale_for_model,
                                   company_ids_model_expects,
                                   n_lags=N_LAGS):
    # This function predicts based on historical data in full_df_context
    if model_to_use is None or scaler_to_use is None:
        app.logger.error("Error: Model or scaler is not available for prediction.")
        return None

    company_info = current_full_df_context[current_full_df_context['CompanyName'] == company_name_to_predict]
    if company_info.empty:
        app.logger.warning(f"Company name '{company_name_to_predict}' not found in context.")
        return None
    company_id_to_predict = company_info['CompanyID'].iloc[0]

    company_recent_data = current_full_df_context[current_full_df_context['CompanyID'] == company_id_to_predict].sort_values(by='Date', ascending=False)

    if len(company_recent_data) < 1:
        app.logger.warning(f"Not enough data for '{company_name_to_predict}' (need 1 day's price).")
        return None

    next_day_features_dict = {}
    next_day_features_dict['Price_lag1'] = company_recent_data['Price'].iloc[0] # Today's price becomes lag1 for tomorrow
    for i in range(2, n_lags + 1):
        lag_col_name_in_recent_data = f'Price_lag{i-1}' # e.g. for Price_lag2 (next day), use Price_lag1 (today) from historical data
        if lag_col_name_in_recent_data in company_recent_data.columns and not pd.isna(company_recent_data[lag_col_name_in_recent_data].iloc[0]):
            next_day_features_dict[f'Price_lag{i}'] = company_recent_data[lag_col_name_in_recent_data].iloc[0]
        else:
            app.logger.error(f"Missing historical data for '{lag_col_name_in_recent_data}' for {company_name_to_predict}. Cannot construct lags.")
            return None
            
    for cid_expected in company_ids_model_expects:
        full_cid_col_name = f'CompanyID_{cid_expected}'
        next_day_features_dict[full_cid_col_name] = 1 if cid_expected == company_id_to_predict else 0
    
    prediction_sample_list = [next_day_features_dict.get(col, 0) for col in feature_columns_model_expects]
    prediction_sample_df = pd.DataFrame([prediction_sample_list], columns=feature_columns_model_expects)
    
    prediction_sample_scaled_df = prediction_sample_df.copy()
    if lag_columns_to_scale_for_model: 
        try:
            prediction_sample_scaled_df[lag_columns_to_scale_for_model] = scaler_to_use.transform(prediction_sample_df[lag_columns_to_scale_for_model])
        except Exception as e:
            app.logger.error(f"Error scaling prediction sample for {company_name_to_predict}: {e}")
            return None

    predicted_price_array = model_to_use.predict(prediction_sample_scaled_df)
    
    latest_date_for_company = company_recent_data['Date'].iloc[0]
    prediction_date = latest_date_for_company + pd.Timedelta(days=1)

    return {
        "company_name": company_name_to_predict,
        "predicted_price": round(predicted_price_array[0], 2),
        "prediction_for_date": prediction_date.strftime('%Y-%m-%d')
    }

def predict_with_manual_prices(company_name_or_id, manual_prices,
                                model_to_use, scaler_to_use,
                                feature_columns_model_expects,
                                lag_columns_to_scale_for_model,
                                company_ids_model_expects,
                                current_full_df_context, # Needed to map company_name to company_id if name is given
                                n_lags=N_LAGS):
    # This function predicts based on manually provided prices
    if model_to_use is None or scaler_to_use is None:
        app.logger.error("Error: Model or scaler is not available for manual prediction.")
        return None, "Model or scaler not available."

    if not isinstance(manual_prices, list) or len(manual_prices) != n_lags:
        return None, f"Invalid 'last_prices'. Expected a list of {n_lags} prices."

    # Determine CompanyID
    company_id_to_predict = None
    # Check if company_name_or_id is one of the known CompanyIDs
    if company_name_or_id in company_ids_model_expects:
        company_id_to_predict = company_name_or_id
    else: # Assume it's a CompanyName and try to find its ID
        if current_full_df_context is not None:
            company_info = current_full_df_context[current_full_df_context['CompanyName'] == company_name_or_id]
            if not company_info.empty:
                company_id_to_predict = company_info['CompanyID'].iloc[0]
            else: # CompanyName not found
                 return None, f"Company name '{company_name_or_id}' not found in historical data context."
        else: # No context to look up CompanyName
            return None, "Full data context not available to resolve company name to ID."

    if company_id_to_predict not in company_ids_model_expects:
        return None, f"Company ID '{company_id_to_predict}' (derived from '{company_name_or_id}') was not part of the model's training data (unknown company)."


    manual_features_dict = {}
    for i in range(n_lags):
        manual_features_dict[f'Price_lag{i+1}'] = manual_prices[i] # manual_prices[0] is Price_lag1, etc.

    for cid_expected in company_ids_model_expects:
        full_cid_col_name = f'CompanyID_{cid_expected}'
        manual_features_dict[full_cid_col_name] = 1 if cid_expected == company_id_to_predict else 0

    prediction_sample_list = [manual_features_dict.get(col, 0) for col in feature_columns_model_expects]
    prediction_sample_df = pd.DataFrame([prediction_sample_list], columns=feature_columns_model_expects)

    prediction_sample_scaled_df = prediction_sample_df.copy()
    if lag_columns_to_scale_for_model:
        try:
            prediction_sample_scaled_df[lag_columns_to_scale_for_model] = scaler_to_use.transform(prediction_sample_df[lag_columns_to_scale_for_model])
        except Exception as e:
            app.logger.error(f"Error scaling manual prediction sample for {company_name_or_id}: {e}")
            return None, "Error during feature scaling."
    
    predicted_price_array = model_to_use.predict(prediction_sample_scaled_df)
    
    return round(predicted_price_array[0], 2), None # Return predicted price and no error message


def initialize_predictor():
    global active_model, active_scaler, active_lag_cols_to_scale, \
           active_model_feature_columns, active_model_company_ids, \
           full_df_context, predictor_initialized

    if predictor_initialized:
        app.logger.info("Predictor already initialized.")
        return

    app.logger.info("Initializing predictor...")
    
    X_curr, y_curr, df_ctx, curr_feat_cols, curr_co_ids = load_and_preprocess_data_for_flask()
    
    if df_ctx is None:
        app.logger.error("Failed to load or preprocess data. Predictor initialization failed.")
        return
    full_df_context = df_ctx

    load_success = False
    if all(os.path.exists(f) for f in [MODEL_FILENAME, SCALER_FILENAME, LAG_COLS_FILENAME, MODEL_FEATURE_COLS_FILENAME, MODEL_COMPANY_IDS_FILENAME]):
        try:
            app.logger.info(f"Attempting to load model from {MODEL_FILENAME}...")
            with open(MODEL_FILENAME, 'rb') as f: active_model = pickle.load(f)
            with open(SCALER_FILENAME, 'rb') as f: active_scaler = pickle.load(f)
            with open(LAG_COLS_FILENAME, 'rb') as f: active_lag_cols_to_scale = pickle.load(f)
            with open(MODEL_FEATURE_COLS_FILENAME, 'rb') as f: active_model_feature_columns = pickle.load(f)
            with open(MODEL_COMPANY_IDS_FILENAME, 'rb') as f: active_model_company_ids = pickle.load(f)
            app.logger.info("Loaded existing model and associated objects from disk.")
            load_success = True
        except Exception as e:
            app.logger.error(f"Error loading model/scaler from disk: {e}. Will retrain.")
            active_model = None
    else:
        app.logger.info("Model files not found. Will train a new model.")

    if not load_success:
        app.logger.info("Training a new model...")
        if X_curr is None or y_curr is None:
            app.logger.error("Cannot train new model due to data loading issues.")
            return

        model_tuple = train_model_for_flask(X_curr, y_curr)
        if model_tuple:
            active_model, active_scaler, active_lag_cols_to_scale = model_tuple
            active_model_feature_columns = curr_feat_cols
            active_model_company_ids = curr_co_ids

            app.logger.info("Saving newly trained model and associated objects...")
            try:
                with open(MODEL_FILENAME, 'wb') as f: pickle.dump(active_model, f)
                with open(SCALER_FILENAME, 'wb') as f: pickle.dump(active_scaler, f)
                with open(LAG_COLS_FILENAME, 'wb') as f: pickle.dump(active_lag_cols_to_scale, f)
                with open(MODEL_FEATURE_COLS_FILENAME, 'wb') as f: pickle.dump(active_model_feature_columns, f)
                with open(MODEL_COMPANY_IDS_FILENAME, 'wb') as f: pickle.dump(active_model_company_ids, f)
                app.logger.info("Successfully saved model and associated objects.")
            except Exception as e:
                app.logger.error(f"Error saving model: {e}")
        else:
            app.logger.error("Model training failed.")
            return
            
    predictor_initialized = True
    app.logger.info("Predictor initialization complete.")

# --- Flask Routes ---
@app.route('/predict_all', methods=['GET'])
def predict_all_companies_route():
    global predictor_initialized, full_df_context, active_model, active_scaler, \
           active_model_feature_columns, active_lag_cols_to_scale, active_model_company_ids

    if not predictor_initialized:
        initialize_predictor() 
        if not predictor_initialized:
             return jsonify({"error": "Predictor service is not initialized. Check server logs."}), 500

    if full_df_context is None or active_model is None:
        return jsonify({"error": "Model or data context not available. Initialization might have failed."}), 500

    all_predictions = []
    unique_company_names = full_df_context['CompanyName'].unique()
    app.logger.info(f"Generating predictions for {len(unique_company_names)} companies using historical data.")

    for company_name in unique_company_names:
        prediction = predict_single_company_price_from_history( # Renamed original function
            company_name,
            full_df_context,
            active_model,
            active_scaler,
            active_model_feature_columns,
            active_lag_cols_to_scale,
            active_model_company_ids,
            n_lags=N_LAGS
        )
        if prediction:
            all_predictions.append(prediction)
        else:
            all_predictions.append({
                "company_name": company_name,
                "predicted_price": None,
                "prediction_for_date": None,
                "error": f"Could not generate prediction for {company_name} from history."
            })
            app.logger.warning(f"Failed to generate prediction for {company_name} from history.")
    return jsonify(all_predictions)

@app.route('/predict_manual_input', methods=['POST'])
def predict_manual_input_route():
    global predictor_initialized, active_model, active_scaler, \
           active_model_feature_columns, active_lag_cols_to_scale, active_model_company_ids, full_df_context

    if not predictor_initialized:
        initialize_predictor()
        if not predictor_initialized:
            return jsonify({"error": "Predictor service is not initialized. Check server logs."}), 500
    
    if active_model is None:
         return jsonify({"error": "Model not available. Initialization might have failed."}), 500

    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload."}), 400

    company_name_or_id = data.get('company_name_or_id') # Can be CompanyName or CompanyID
    last_prices = data.get('last_prices')

    if not company_name_or_id:
        return jsonify({"error": "Missing 'company_name_or_id' in request."}), 400
    if not last_prices:
        return jsonify({"error": "Missing 'last_prices' in request."}), 400
    if not isinstance(last_prices, list) or len(last_prices) != N_LAGS:
        return jsonify({"error": f"Field 'last_prices' must be a list of {N_LAGS} numbers."}), 400
    if not all(isinstance(price, (int, float)) for price in last_prices):
        return jsonify({"error": f"'last_prices' must contain only numbers."}), 400

    app.logger.info(f"Received manual prediction request for {company_name_or_id} with prices: {last_prices}")

    predicted_price, error_msg = predict_with_manual_prices(
        company_name_or_id,
        last_prices,
        active_model,
        active_scaler,
        active_model_feature_columns,
        active_lag_cols_to_scale,
        active_model_company_ids,
        full_df_context, 
        n_lags=N_LAGS
    )

    if error_msg:
        return jsonify({"error": error_msg, "company_name_or_id": company_name_or_id}), 400
    
    return jsonify({
        "company_name_or_id_provided": company_name_or_id,
        "input_prices": last_prices,
        "predicted_price_next_day": predicted_price
    })


@app.route('/', methods=['GET'])
def home():
    return "Stock Predictor API is running. Use /predict_all (GET) or /predict_manual_input (POST)."

if __name__ == '__main__':
    initialize_predictor() 
    app.run(host='0.0.0.0', port=5000)
