import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

// Navigation component for the main navigation bar
function Navigation() {
  const location = useLocation(); // Get current location

  // Helper to set 'active' class for the current page link
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="main-nav">
      <ul>
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/properties" className={isActive('/properties')}>Properties</Link></li>
        <li><Link to="/about" className={isActive('/about')}>About</Link></li>
        <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
        <li><Link to="/register" className={isActive('/register')}>Register</Link></li>
      </ul>
    </nav>
  );
}

// Main App component
function App() {
  const location = useLocation(); // Get current location

  // List of paths where the footer should be hidden
  const hideFooter = ['/login', '/register', '/about'].includes(location.pathname);

  return (
    <>
      {/* Header with logo and navigation */}
      <header className="main-header">
        <div className="container header-container">
          <div className="logo">
            <Link to="/"><img src="https://raw.githubusercontent.com/ndmh99/lyonplatform/refs/heads/main/img/logo.png" alt="LYON AI Logo" /></Link>
            <span>LYN AI Housing Investment</span>
          </div>
          <Navigation />
        </div>
      </header>

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* Conditionally render the footer unless on certain pages */}
      {!hideFooter && (
        <footer>
          <div className="container footer-container">
            {/* About section */}
            <div className="footer-section">
              <h3>About LYN AI</h3>
              <div className="section-separator"></div>
              <p>LYN AI Housing Investment uses cutting-edge artificial intelligence to help investors identify properties with high appreciation potential.</p>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

            {/* Quick links section */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <div className="section-separator"></div>
              <ul className="quick-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/properties">Search Properties</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register an Account</Link></li>
              </ul>
            </div>

            {/* Contact info section */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <div className="section-separator"></div>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Investment Ave, Real Estate City</span>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <span>(123) 456-7890</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>info@lynai.com</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer bottom copyright */}
          <div className="footer-bottom container">
            <p>&copy; 2025 LYN AI Housing Investment. All rights reserved.</p>
          </div>
        </footer>
      )}
    </>
  );
}

// Export App wrapped with Router so useLocation works
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
