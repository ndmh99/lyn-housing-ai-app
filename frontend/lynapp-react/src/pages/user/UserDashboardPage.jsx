import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './styles/UserDashboardPage.css';

const UserDashboardPage = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div className="user-dashboard-page">
      <div className="dashboard-container">
        <h1>Welcome to your Dashboard, {currentUser.email}!</h1>
        <p>You have successfully logged in.</p>
        <Link to="/properties" className="dashboard-link"><u><i>Explore LynAI Power</i></u></Link>
      </div>
    </div>
  );
};

export default UserDashboardPage;


