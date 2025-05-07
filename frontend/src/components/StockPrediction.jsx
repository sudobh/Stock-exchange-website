import React, { useState, useEffect } from 'react';

import { companyData } from '../assets/companyData.js'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './StockPrediction.module.css';
import NavBar from './Navbar.jsx';

const fluctuatePrice = (price, percentage = 5) => {
  const change = (Math.random() * percentage * 2) - percentage;
  const newPrice = price * (1 + change / 100);
  return Math.max(0.01, parseFloat(newPrice.toFixed(2)));
};

// PriceChart Component for Manual Predictor
const PriceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>4-Day Price Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" /> 
          <XAxis dataKey="day" tick={{ fill: '#9ca3af' }} />
          <YAxis 
            tickFormatter={(value) => `₹${value}`} 
            tick={{ fill: '#9ca3af' }}
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          <Tooltip 
            formatter={(value) => `₹${value.toFixed(2)}`}
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#f3f4f6' }}
            itemStyle={{ color: '#f3f4f6' }}
            cursor={{fill: 'rgba(75, 85, 99, 0.3)'}}
          />
          <Legend wrapperStyle={{ color: '#9ca3af' }} />
          <Line type="monotone" dataKey="price" stroke="#34d399" activeDot={{ r: 8, fill: '#34d399', stroke: '#111827', strokeWidth: 2 }} name="Stock Price" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ManualPredictor Component
const ManualPredictor = ({ companies }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [day1Price, setDay1Price] = useState(null);
  const [day2Price, setDay2Price] = useState(null);
  const [day3Price, setDay3Price] = useState(null);
  const [manualPrediction, setManualPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  const [chartData, setChartData] = useState([]);

  const handleCompanyChange = (event) => {
    const companyId = event.target.value;
    setSelectedCompanyId(companyId);
    setManualPrediction(null); 
    setPredictionError(null); 
    setChartData([]);

    if (companyId) {
      const company = companies.find(c => c.id === companyId);
      if (company) {
        const d1 = company.stockPrice;
        const d2 = fluctuatePrice(d1);
        const d3 = fluctuatePrice(d2);
        setDay1Price(d1);
        setDay2Price(d2);
        setDay3Price(d3);
      }
    } else {
      setDay1Price(null);
      setDay2Price(null);
      setDay3Price(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedCompanyId || day1Price === null || day2Price === null || day3Price === null) {
      setPredictionError("Please select a company and ensure prices are generated.");
      return;
    }

    setIsPredicting(true);
    setManualPrediction(null);
    setPredictionError(null);
    setChartData([]);

    const company = companies.find(c => c.id === selectedCompanyId);
    if (!company) {
      setPredictionError("Selected company not found.");
      setIsPredicting(false);
      return;
    }

    const pricesForApi = [day3Price, day2Price, day1Price];

    try {
      const response = await fetch('http://localhost:5000/predict_manual_input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name_or_id: company.companyName, 
          last_prices: pricesForApi,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `API request failed with status ${response.status}`);
      }
      setManualPrediction(result);
      if (result && result.predicted_price_next_day !== undefined) {
        setChartData([
          { day: 'Day 1 (Actual)', price: day1Price },
          { day: 'Day 2 (Sim.)', price: day2Price },
          { day: 'Day 3 (Sim.)', price: day3Price },
          { day: 'Day 4 (Pred.)', price: parseFloat(result.predicted_price_next_day.toFixed(2)) },
        ]);
      }

    } catch (err) {
      console.error("Failed to fetch manual prediction:", err);
      setPredictionError(err.message || "Failed to fetch manual prediction.");
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className={styles.manualPredictorContainer}>
        <NavBar/>
      <h2 className={styles.manualPredictorTitle}> Stock Predictor</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="company-select" className={styles.label}>
          Select Company:
        </label>
        <select
          id="company-select"
          value={selectedCompanyId}
          onChange={handleCompanyChange}
          className={styles.selectControl}
        >
          <option value="">-- Select a Company --</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>

      {selectedCompanyId && (
        <div className={styles.priceDisplayGrid}>
          <div>
            <p className={styles.priceLabel}>Day 1 Price (Actual):</p>
            <p className={styles.priceValue}>₹{day1Price !== null ? day1Price.toFixed(2) : 'N/A'}</p>
          </div>
          <div>
            <p className={styles.priceLabel}>Day 2 Price (Simulated):</p>
            <p className={styles.priceValue}>₹{day2Price !== null ? day2Price.toFixed(2) : 'N/A'}</p>
          </div>
          <div>
            <p className={styles.priceLabel}>Day 3 Price (Simulated):</p>
            <p className={styles.priceValue}>₹{day3Price !== null ? day3Price.toFixed(2) : 'N/A'}</p>
          </div>
        </div>
      )}

      {selectedCompanyId && (
        <button
          onClick={handlePredict}
          disabled={isPredicting}
          className={styles.predictButton}
        >
          {isPredicting ? (
            <div className={styles.buttonLoadingContainer}>
              <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Predicting...
            </div>
          ) : (
            'Predict Next Day Stock (Day 4)'
          )}
        </button>
      )}

      {predictionError && (
        <div className={styles.errorAlert}>
          <p>Error: {predictionError}</p>
        </div>
      )}

      {manualPrediction && (
        <div className={styles.successAlert}>
          <h3 className={styles.alertTitleSuccess}>Prediction Result (Day 4):</h3>
          <p className={styles.alertPriceSuccess}>
            ₹{manualPrediction.predicted_price_next_day !== undefined ? manualPrediction.predicted_price_next_day.toFixed(2) : 'Error in prediction format'}
          </p>
          <p className={styles.alertInfo}>
            Based on input prices: Day1: ₹{day1Price?.toFixed(2)}, Day2: ₹{day2Price?.toFixed(2)}, Day3: ₹{day3Price?.toFixed(2)}
          </p>
           <p className={styles.alertSubInfo}>Company: {manualPrediction.company_name_or_id_provided}</p>
        </div>
      )}
      {chartData.length > 0 && <PriceChart data={chartData} />}
    </div>
  );
};

// Main App Component
function App() {
  const companies = companyData || [];
  if (!companyData) {
      console.warn("companyData is not loaded. Please ensure '../assets/companyData.js' exists and exports the data correctly.");
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.contentWrapper}>
        {companies.length > 0 ? (
          <ManualPredictor companies={companies} />
        ) : (
          <div className={styles.dataLoadingErrorContainer}>
            <p className={styles.dataLoadingErrorText}>Company data could not be loaded. Please check the console and ensure '../assets/companyData.js' is correctly set up.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
