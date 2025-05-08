# Stock Exchange Simulation Website

## Description

This project is a web-based simulation of a stock exchange platform developed for a university project.

## Features

* **User Authentication:** Secure user registration and login.
* **Real-time/Simulated Stock Data:** Display of stock prices.
* **Stock Browsing & Searching:** Users can search for and view details of various stocks.
* **Portfolio Management:** Users can view their current holdings, virtual cash balance, and overall portfolio value.
* **Trading Simulation:** Users can place buy and sell orders for stocks using their virtual currency.
* **Stock Price Prediction:** AI-powered next-day stock price prediction for individual companies.

## Setup and Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/sudobh/stock-exchange-website.git](https://github.com/sudobh/stock-exchange-website.git)
    cd stock-exchange-website
    ```

2.  **Prerequisites:**
    * Node.js and npm (for frontend and Node.js backend)
    * Python 3.11
    * `uv` (Python package manager and virtual environment tool). If you don't have `uv`, install it:
        ```bash
        # For macOS and Linux
        curl -LsSf [https://astral.sh/uv/install.sh](https://astral.sh/uv/install.sh) | sh
        # For Windows (PowerShell)
        irm [https://astral.sh/uv/install.ps1](https://astral.sh/uv/install.ps1) | iex
        # Or using pip (if you have another Python environment)
        pip install uv
        ```

3.  **Frontend and Node.js Backend Setup:**
    * Install all Node.js dependencies for both frontend and backend:
        ```bash
        npm install
        ```
    * Set up environment variables: Create a `.env` file in the `backend` directory. This file should contain your database connection URL and JWT secret. Example:
        ```env
        # backend/.env
        DATABASE_URL="postgresql://user:password@host:port/database"
        JWT_SECRET="your-super-secret-jwt-key"
        ```
    * Generate Prisma Client (for the Node.js backend):
        ```bash
        cd backend
        npx prisma generate
        cd .. 
        ```

4.  **Python (Flask) Stock Predictor Setup:**
    * Navigate to the stock predictor directory:
        ```bash
        cd stock_predictor
        ```
    * Create a Python 3.11 virtual environment using `uv` (this will create a `.venv` folder inside `stock_predictor`):
        ```bash
        uv venv -p 3.11 .venv
        ```

    * Install Python dependencies from `requirements.txt` using `uv`:
        ```bash
        uv pip install -r requirements.txt
        ```

    * Navigate back to the project root directory:
        ```bash
        cd ..
        ```

5.  **Run the Development Servers:**
    * This command will start the Node.js backend, the frontend, and the Flask stock predictor server concurrently. Ensure your Python virtual environment for the stock predictor is **not** active in the terminal where you run this, as the `package.json` script specifies the interpreter path directly.
        ```bash
        # Run this from the project root (stock-exchange-website directory)
        npm run dev
        ```

6.  **Access the application:**
    * Frontend (React app): Open your web browser and navigate to `http://localhost:3000`



## License

This project is licensed under the [MIT License](LICENSE). 
