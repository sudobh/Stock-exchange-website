import React, { useState, useEffect } from 'react';
import styles from './StockStream.module.css';


const companies = [
  { name: 'Bira', symbol: 'BIRA' },
  { name: 'CSK', symbol: 'CSK' },
  { name: 'TATA', symbol: 'TATA' },
  { name: 'Studds', symbol: 'STUD' },
  { name: 'Boat', symbol: 'BOAT' },
  { name: 'GKN Driveline', symbol: 'GKN' },
  { name: 'Mohan Meakin', symbol: 'MOMK' },
];

const getRandomInitialPrice = () => {
  return (Math.random() * 2 + 0.5).toFixed(2);
};

const getRandomFluctuation = (currentPrice) => {
  const percentageChange = (Math.random() - 0.5) * 0.05;
  const changeAmount = currentPrice * percentageChange;
  return changeAmount;
};

function App() {
  const [stocks, setStocks] = useState(() =>
    companies.map(company => ({
      ...company,
      price: parseFloat(getRandomInitialPrice()),
      change: 0,
      changePercent: 0,
    }))
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStocks(currentStocks =>
        currentStocks.map(stock => {
          const fluctuation = getRandomFluctuation(stock.price);
          const newPrice = Math.max(0.01, stock.price + fluctuation);
          const change = newPrice - stock.price;
          const changePercent = ((change / stock.price) * 100);

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2)),
          };
        })
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '20px' }}>
        <a href="/" className={styles.homeButton}>
          🏠 Home
        </a>
      </div>

      <h1 className={styles.title}>
        Live Stock Stream (Simulated)
      </h1>
      <table className={styles.stockTable}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.headerCellCompany}>Company</th>
            <th className={styles.headerCell}>Price (Cr.)</th>
            <th className={styles.headerCell}>Change (Cr.)</th>
            <th className={`${styles.headerCell} ${styles.hideOnSmall}`}>% Change</th>
          </tr>
        </thead>
        <tbody className={styles.stockList}>
          {stocks.map(stock => (
            <tr key={stock.symbol} className={styles.stockRow}>
              <td className={styles.cellCompany}>
                {stock.name} <span className={styles.symbol}>({stock.symbol})</span>
              </td>

              <td className={styles.cellPrice}>
                ₹{stock.price.toFixed(2)}
              </td>

              <td className={`${styles.cellChange} ${stock.change >= 0 ? styles.positiveChange : styles.negativeChange}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                {stock.change >= 0 ? ' ▲' : ' ▼'}
              </td>

              <td className={`${styles.cellPercentChange} ${styles.hideOnSmall} ${stock.changePercent >= 0 ? styles.positiveChange : styles.negativeChange}`}>
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.disclaimer}>
        Disclaimer: Prices (in Cr.) are simulated and do not represent real market data. Updates every 2 seconds.
      </p>
    </div>
  );
}

export default App;