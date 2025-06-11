import React from 'react';
import { Link } from 'react-router-dom';
import './styles/UserDashboardPage.css';

const UserDashboardPage = () => {
  return (
    <div className="user-dashboard-page">
      <div className="dashboard-container">
        <h1>Welcome to your Dashboard!</h1>
        <p>You have successfully logged in.</p>
        <Link to="/properties" className="dashboard-link"><u><i>Explore LynAI Power</i></u></Link>
        {/* Add more user-specific content and features here */}
      </div>
    </div>
  );
};

export default UserDashboardPage;
