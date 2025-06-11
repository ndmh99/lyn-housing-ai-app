// filepath: c:\Users\Hieu\Desktop\Simple Web Project\In Developing\Lyn Housing AI App\frontend\lynapp-react\src\pages\auth\LoginPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add login logic here
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Sign in to your LYN AI account</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
          
          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
