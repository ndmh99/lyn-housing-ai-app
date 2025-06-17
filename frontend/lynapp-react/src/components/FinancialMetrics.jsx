import React, { useMemo } from 'react';
import './styles/FinancialMetrics.css';

const FinancialMetrics = ({ historyData }) => {
  const metrics = useMemo(() => {
    if (!historyData || historyData.length === 0) return null;

    const prices = historyData.map(item => item.price);
    const [firstPrice, lastPrice] = [prices[0], prices[prices.length - 1]];

    // Calculate all metrics once
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    // Volatility calculation
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - averagePrice, 2), 0) / prices.length;
    const volatility = (Math.sqrt(variance) / averagePrice) * 100;

    // Other calculations
    const totalReturn = ((lastPrice - firstPrice) / firstPrice) * 100;
    const recentChange = prices.length > 1
      ? ((lastPrice - prices[prices.length - 2]) / prices[prices.length - 2]) * 100
      : 0;
    const currentVsPeak = ((lastPrice - maxPrice) / maxPrice) * 100;

    const trend = lastPrice > averagePrice*1.05 ? 'UP' : lastPrice < averagePrice/1.05 ? 'DOWN' : 'FLAT';

    
    const yearsSinceBuilt = "n/a";

    return {
      totalReturn,
      trend,
      recentChange,
      currentVsPeak,
      volatility,
      minPrice,
      maxPrice,
      averagePrice,
      yearsSinceBuilt
    };
  }, [historyData]);

  // Early return if no data
  if (!metrics) {
    return (
      <div className="financial-metrics-container">
        <div className="metric-item">
          <span className="metric-value default">No price history available</span>
        </div>
      </div>
    );
  }

  // Metric configuration for cleaner JSX
  const metricItems = [
    {
      label: 'Trend',
      value: metrics.trend,
      className: metrics.trend === 'UP' ? 'positive' : metrics.trend === 'DOWN' ? 'negative' : 'neutral'
    },
    {
      label: `Total Return ${new Date().getFullYear() - new Date(historyData[0].date).getFullYear()}Y`,
      value: `${metrics.totalReturn.toFixed(1)}%`,
      className: metrics.totalReturn >= 0 ? 'positive' : 'negative'
    },
    {
      label: 'Recent Change',
      value: `${metrics.recentChange.toFixed(1)}%`,
      className: metrics.recentChange >= 0 ? 'positive' : 'negative'
    },
    {
      label: 'Current vs Peak',
      value: `${metrics.currentVsPeak.toFixed(1)}%`,
      className: metrics.currentVsPeak >= -5 ? 'positive' : 'negative'
    },
    {
      label: 'Volatility',
      value: `${metrics.volatility.toFixed(1)}%`,
      className: 'default'
    },
    {
      label: 'Price Range',
      value: `$${metrics.minPrice.toLocaleString()} - $${metrics.maxPrice.toLocaleString()}`,
      className: 'default'
    },
    {
      label: 'Average Price',
      value: `$${Math.round(metrics.averagePrice).toLocaleString()}`,
      className: 'default'
    },
    {
      label: 'Years Since Built',
      value: `${metrics.yearsSinceBuilt}`,
      className: 'default'
    },
  ];

  return (
    <div className="financial-metrics-container">
      {metricItems.map((item, index) => (
        <div key={index} className="metric-item">
          <strong>{item.label}:</strong>
          <span className={`metric-value ${item.className}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FinancialMetrics;