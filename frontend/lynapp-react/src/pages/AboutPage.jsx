import './styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Revolutionizing Housing with <span className="gradient-text">AI Intelligence</span>
          </h1>
          <p className="hero-subtitle">
            Lyn Housing AI transforms the way you discover, analyze, and secure your perfect home 
            through cutting-edge artificial intelligence and predictive analytics.
          </p>
        </div>
        <div className="hero-visual">
          <div className="ai-animation">
            <div className="neural-node"></div>
            <div className="neural-node"></div>
            <div className="neural-node"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🏠</div>
              <h3>Smart Discovery</h3>
              <p>AI-powered property matching based on lifestyle preferences, commute patterns, and predictive market trends.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">📊</div>
              <h3>Data-Driven Insights</h3>
              <p>Real-time market analysis, price predictions, and neighborhood scoring using machine learning algorithms.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🔮</div>
              <h3>Future-Ready</h3>
              <p>Anticipate market changes, investment opportunities, and lifestyle shifts before they happen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="tech-section">
        <div className="container">
          <h2 className="section-title">Powered by Advanced AI</h2>
          <div className="tech-features">
            <div className="tech-feature">
              <div className="feature-header">
                <span className="feature-tag">Neural Networks</span>
                <h4>Predictive Property Valuation</h4>
              </div>
              <p>Our deep learning models analyze 200+ variables to predict property values with 95% accuracy.</p>
            </div>
            <div className="tech-feature">
              <div className="feature-header">
                <span className="feature-tag">Computer Vision</span>
                <h4>Automated Property Assessment</h4>
              </div>
              <p>AI-powered image analysis evaluates property conditions, renovations needed, and potential issues.</p>
            </div>
            <div className="tech-feature">
              <div className="feature-header">
                <span className="feature-tag">NLP Processing</span>
                <h4>Smart Search & Matching</h4>
              </div>
              <p>Natural language processing understands your preferences and finds properties that truly match your lifestyle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Properties Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Prediction Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12K+</div>
              <div className="stat-label">Happy Homeowners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Data Points</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet the Innovators</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">HN</div>
              <h4>Hieu Nguyen</h4>
              <p className="member-role">Front-End Lead</p>
              <p className="member-bio">Work on app design and technical support.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">YF</div>
              <h4>Yanfan Lin</h4>
              <p className="member-role">Back-End Lead</p>
              <p className="member-bio">Implement back-end features for front-end, establish databases.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">FY</div>
              <h4>Fei Yue</h4>
              <p className="member-role">Database Lead</p>
              <p className="member-bio">Data collection, organization and processing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Home?</h2>
            <p>Join thousands of smart homebuyers using AI to make better housing decisions.</p>
            <div className="cta-buttons">
              <button className="btn-primary">Start Your Search</button>
              <button className="btn-secondary">Register</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
