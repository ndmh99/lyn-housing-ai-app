import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import './App.css';

// Navigation component for the main navigation bar
function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="main-nav">
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <ul className={isOpen ? 'nav-open' : ''}>
        <li><Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/properties" className={isActive('/properties')} onClick={() => setIsOpen(false)}>Properties</Link></li>
        <li><Link to="/about" className={isActive('/about')} onClick={() => setIsOpen(false)}>About</Link></li>
        <li><Link to="/login" className={isActive('/login')} onClick={() => setIsOpen(false)}>Login</Link></li>
        <li><Link to="/register" className={isActive('/register')} onClick={() => setIsOpen(false)}>Register</Link></li>
      </ul>
    </nav>
  );
}

// Main App component
function App() {
  const location = useLocation();

  // Add useEffect to load GTranslate
  useEffect(() => {
    // Set up GTranslate configuration
    window.gtranslateSettings = {
      "default_language": "en",
      "languages": ["en", "fr", "zh-CN", "vi"],
      "wrapper_selector": ".gtranslate_wrapper",
      "flag_style": "2d",
      "flag_size": 24,
      "widget_look": "flags_name",
      "alt_flags": {
        "en": "canada",
      }
    };

    // Load GTranslate script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // List of paths where the footer should be hidden
  const hideFooter = ['/login', '/register', '/about'].includes(location.pathname);

  return (
    <>
      {/* Header with logo and navigation */}
      <header className="main-header">
        <div className="container header-container">
          <div className="logo">
            <Link to="/"><img src="/logo.png" alt="LYN AI Logo" /></Link>
            <span>LYN AI Housing Investment</span>
          </div>
          <Navigation />
        </div>
      </header>

      {/* GTranslate Wrapper Div - Move to better location */}
      <div className="gtranslate_wrapper"></div>

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
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
