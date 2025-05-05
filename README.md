# Stock Exchange Simulation Website

## Description

This project is a web-based simulation of a stock exchange platform developed for university project
## Features

* **User Authentication:** Secure user registration and login.
* **Real-time/Simulated Stock Data:** Display of stock prices 
* **Stock Browsing & Searching:** Users can search for and view details of various stocks.
* **Portfolio Management:** Users can view their current holdings, virtual cash balance, and overall portfolio value.
* **Trading Simulation:** Users can place buy and sell orders for stocks using their virtual currency.


## Setup and Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/sudobh/stock-exchange-website.git](https://github.com/sudobh/stock-exchange-website.git)
    cd stock-exchange-website
    ```

2.  **Backend Setup:**
    * Navigate to the backend directory: `cd backend`
    * Install dependencies:
        ```bash
        npm install
        ```
    * Set up environment variables: Create a `.env` file in the backend directory for database connection URL and JWT secret.
    * **Generate Prisma Client:** 
        ```bash
        npx prisma generate
        ```
    * Run the backend development server:
        ```bash
        npm run dev
        ```

3.  **Frontend Setup:**
    * Navigate to the frontend directory 
    * Install dependencies:
        ```bash
        npm install
        ```
    * Run the frontend development server:
        ```bash
        npm run start
        ```

4.  **Access the application:**
    * Open your web browser and navigate to `http://localhost:3000`
