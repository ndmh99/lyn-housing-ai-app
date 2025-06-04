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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './PriceHistoryChart.css'; // Import your CSS styles

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceHistoryChart = ({ priceHistory }) => {
  // Parse the JSON string if it's a string, or use as-is if it's already an array
  const historyData = typeof priceHistory === 'string' 
    ? JSON.parse(priceHistory) 
    : priceHistory;

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
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          },
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        }
      },
      x: {
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
        hoverBackgroundColor: '#3b82f6',
      }
    }
  };

  return (
    <div className="price-history-chart">
      <h3>Price History</h3>
      <div className="chart-wrap">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PriceHistoryChart;