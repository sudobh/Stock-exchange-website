import React, { useState, useEffect, useMemo } from 'react';
import styles from './StockStream.module.css';
import { companyData } from '../assets/companyData';
import Navbar from './Navbar.jsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';



const generateSymbol = (name) => {
  return name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase();
};

const getRandomFluctuation = (currentPrice) => {
  const percentageChange = (Math.random() - 0.5) * 0.05;
  const changeAmount = currentPrice * percentageChange;
  return changeAmount;
};

const MAX_HISTORY_LENGTH = 30;

function App() {
  const [stocks, setStocks] = useState(() =>
    companyData.map(company => ({
      id: company.id,
      name: company.companyName,
      symbol: company.symbol || generateSymbol(company.companyName),
      price: parseFloat(company.stockPrice),
      change: 0,
      changePercent: 0,
    }))
  );

  const [priceHistory, setPriceHistory] = useState({});
  const [timeCounter, setTimeCounter] = useState(0);
  const [selectedStockId, setSelectedStockId] = useState(companyData[0]?.id || null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeCounter(prevCounter => prevCounter + 1);

      setStocks(currentStocks => {
        const updatedStocks = currentStocks.map(stock => {
          const fluctuation = getRandomFluctuation(stock.price);
          const newPrice = Math.max(0.01, stock.price + fluctuation);
          const oldPrice = stock.price;

          const changeSinceLastTick = newPrice - oldPrice;
          const changePercentSinceLastTick = oldPrice === 0 ? 0 : ((changeSinceLastTick / oldPrice) * 100);

          setPriceHistory(prevHistory => {
            const currentStockHistory = prevHistory[stock.id] || [];
            const newHistoryEntry = { time: timeCounter, price: parseFloat(newPrice.toFixed(2)) };
            let updatedStockHistory = [...currentStockHistory, newHistoryEntry];

            if (updatedStockHistory.length > MAX_HISTORY_LENGTH) {
              updatedStockHistory = updatedStockHistory.slice(-MAX_HISTORY_LENGTH);
            }
            return { ...prevHistory, [stock.id]: updatedStockHistory };
          });

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(changeSinceLastTick.toFixed(2)),
            changePercent: parseFloat(changePercentSinceLastTick.toFixed(2)),
          };
        });
        return updatedStocks.sort((a, b) => b.price - a.price);
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [timeCounter]);

  const handleStockSelect = (stockId) => {
    setSelectedStockId(stockId);
  };

  const displayedChartData = useMemo(() => {
    if (selectedStockId && priceHistory[selectedStockId]) {
      return priceHistory[selectedStockId];
    }
    return [];
  }, [priceHistory, selectedStockId]);

  const chartStockName = useMemo(() => {
    const stock = stocks.find(s => s.id === selectedStockId);
    return stock ? `${stock.name} (${stock.symbol})` : 'Stock';
  }, [stocks, selectedStockId]);

  return (
 
    <div className={styles.container}>
        <Navbar />

      <h1 className={styles.title}>
        Live Stock Stream (Simulated)
      </h1>

      {selectedStockId && (
        <div className={styles.chartContainer} style={{ width: '100%', height: 300, marginBottom: '30px' }}>
          <h2 style={{ textAlign: 'center' }}>Price History for {chartStockName}</h2>
          <ResponsiveContainer>
            <LineChart
              data={displayedChartData}
              margin={{
                top: 10,     
                right: 30,
                left: 45,    
                bottom: 45,  
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{
                  position: "insideBottom",
                  dy: 15,
                  dx: -30 
                }}
                tickFormatter={(tick) => `${tick}`}
                height={50} 
              />
              <YAxis
                domain={['dataMin - 1', 'dataMax + 1']}
                allowDataOverflow={false}
                label={{
                  value: 'Price (Cr.)',
                  angle: -90,
                  position: 'insideLeft',
                  dx: -30,
                  dy: 40,
                }}
                tickFormatter={(value) => `₹${parseFloat(value).toFixed(2)}`}
                tickCount={7}
                width={80} 
              />
              <Tooltip
                formatter={(value) => [`₹${parseFloat(value).toFixed(2)}`, "Price"]}
                labelFormatter={(label) => `Update: ${label}`}
              />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: "20px" }} 
              />
              <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 6 }} name={chartStockName} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

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
            <tr
              key={stock.id}
              className={`${styles.stockRow} ${selectedStockId === stock.id ? styles.selectedRow : ''}`}
              onClick={() => handleStockSelect(stock.id)}
              style={{ cursor: 'pointer' }}
            >
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
        Initial prices are from provided data. List is sorted by price. Click a row to view its chart.
      </p>
    </div>
  );
}

export default App;