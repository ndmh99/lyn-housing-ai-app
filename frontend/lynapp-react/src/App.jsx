import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import HomePage from './pages/guest/HomePage';
import PropertiesPage from './pages/guest/PropertiesPage';
import AboutPage from './pages/guest/AboutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PropertyDetailPage from './pages/guest/PropertyDetailPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import './App.css';
import ScrollToTop from './tools/ScrollToTop';
import { useAuth } from './contexts/AuthContext';

// Navigation component for the main navigation bar
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      setIsDropdownOpen(false);
      window.location.href = '/login';
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="main-nav">
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <ul className={isOpen ? 'nav-open' : ''}>
        <li><NavLink to="/" className="nav-home" onClick={() => setIsOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/properties" className="nav-properties" onClick={() => setIsOpen(false)}>Properties</NavLink></li>
        <li><NavLink to="/about" className="nav-about" onClick={() => setIsOpen(false)}>About</NavLink></li>

        {currentUser ? (
          <li className="nav-user-dropdown" ref={dropdownRef}>
            <NavLink onClick={() => setIsDropdownOpen(prev => !prev)} className="dropdown-toggle">
              Hello, {currentUser.email.split('@')[0]} <span className="arrow">▼</span>
            </NavLink>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/dashboard" onClick={() => { setIsOpen(false); setIsDropdownOpen(false); }}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={handleLogout} className="dropdown-item-button">Logout</NavLink>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li><NavLink to="/login" className="nav-login" onClick={() => setIsOpen(false)}>Login</NavLink></li>
            <li><NavLink to="/register" className="nav-register" onClick={() => setIsOpen(false)}>Register</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

// This component contains the layout and routes, which need to be inside the Router
function AppContent() {
  // Add useEffect to load GTranslate
  useEffect(() => {
    // Set up GTranslate configuration
    window.gtranslateSettings = {
      "default_language": "en",
      "languages": ["en", "fr", "zh-CN", "vi"],
      "wrapper_selector": ".gtranslate_wrapper",
      "flag_style": "2d",
      "flag_size": 24,
      "widget_look": "flags",
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

  return (
    <>
      <ScrollToTop />
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

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
      </Routes>

      {/* GTranslate Wrapper Div*/}
      <div className="gtranslate_wrapper"></div>

      {/* Footer is always rendered, but hidden by CSS on specific pages */}
      <footer className="main-footer">
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
    </>
  );
}

// The main App component now acts as the entry point, setting up the Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
