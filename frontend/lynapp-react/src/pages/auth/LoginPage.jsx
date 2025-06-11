import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock admin login for testing purposes
    if (formData.email === 'admin@lynai.com' && formData.password === 'admin') {
      console.log('Admin login successful');
      navigate('/dashboard');
    } else {
      console.log('Login attempt failed:', formData);
      setError('Invalid credentials. Please try again.');
      // Keep other login logic if it exists
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Sign in to your LYN AI account</p>
          
          {error && <p className="error-message">{error}</p>}

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
