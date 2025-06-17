import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import FinancialMetrics from './FinancialMetrics';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './styles/PriceHistoryChart.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const PriceHistoryChart = ({ priceHistory }) => {
  // Parse the JSON string if it's a string, or use as-is if it's already an array
  const historyData = typeof priceHistory === 'string'
    ? JSON.parse(priceHistory)
    : priceHistory;

  const averagePrice = historyData.reduce((sum, item) => sum + item.price, 0) / historyData.length;
  // Calculate linear trend line
  const calculateTrendLine = (data) => {
    const n = data.length;
    const sumX = data.reduce((sum, _, index) => sum + index, 0);
    const sumY = data.reduce((sum, item) => sum + item.price, 0);
    const sumXY = data.reduce((sum, item, index) => sum + (index * item.price), 0);
    const sumXX = data.reduce((sum, _, index) => sum + (index * index), 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return data.map((_, index) => slope * index + intercept);
  };

  const trendLineData = calculateTrendLine(historyData);

  // Prepare data for Chart.js
  const chartData = {
    labels: historyData.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    }),
    datasets: [
      {
        label: 'Property Price',
        data: historyData.map(item => item.price),
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'gold',
        pointBorderColor: 'rgb(75, 192, 192)',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Average Price',
        data: new Array(historyData.length).fill(averagePrice),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderWidth: 3,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0,
      },
      {
        label: 'Trend Line',
        data: trendLineData,
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
      tension: {
        duration: 4000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      },
    },
    plugins: {
      datalabels: {
        display: function (context) {
          return (context.datasetIndex === 0 || context.datasetIndex === 1) &&
            context.dataIndex === context.dataset.data.length - 1; // Show label on the last point of both Property Price and Average Price lines
        },
        backgroundColor: function (context) {
          if (context.datasetIndex === 0) {
            return 'rgb(75, 192, 192)'; // Property Price color
          } else {
            return 'rgb(255, 99, 133)'; // Average Price color
          }
        },
        borderColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        color: 'white',
        font: {
          size: 10,
          weight: 'bold'
        },
        padding: 4,
        formatter: function (value) {
          return '$' + Math.round(value).toLocaleString();
        },
        anchor: 'end',
        align: 'top',
        offset: 8,
      },
      legend: {
        display: true,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      },
      title: {
        display: true,
        text: 'PRICE OF PROPERTY OVER TIME',
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
          color: '#374151',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          callback: function (value) {
            return '$' + value.toLocaleString();
          },
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period',
          color: '#374151',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        }
      }
    },
    elements: {
      point: {
        hoverBackgroundColor: 'rgb(75, 192, 192)',
      }
    }
  };

  return (
    <div className="price-history-chart">
      <h3>Price History</h3>
      <div className="chart-wrap">
        <Line data={chartData} options={options} />
      </div>
      <FinancialMetrics historyData={historyData} />
    </div>
  );
};

export default PriceHistoryChart;