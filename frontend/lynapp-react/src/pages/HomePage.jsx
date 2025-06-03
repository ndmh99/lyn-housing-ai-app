import { useListings } from '../hooks/useListings';
import ListingCard from '../components/ListingCard';
import './styles/HomePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertySearchBox from '../components/PropertySearchBox';

const HomePage = () => {
    const { listings, loading, error } = useListings();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Next Investment Property</h1>
                    <p>Use our AI-powered predictions to discover high-appreciation real estate opportunities</p>
      <PropertySearchBox
        initialValue={""}
        onSubmit={city => {
          const trimmed = city.trim();
          navigate(trimmed ? `/properties/?city=${encodeURIComponent(trimmed)}` : '/properties');
        }}
      />
                </div>
            </section>

            <section className="features container">
                <div className="section-header">
                    <h2>Why Choose LYN AI</h2>
                    <p>We leverage artificial intelligence to help you make smarter investment decisions</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa fa-chart-line"></i>
                        </div>
                        <h3>AI Price Predictions</h3>
                        <p>Our advanced algorithms analyze market trends to forecast property appreciation</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa fa-map-marked-alt"></i>
                        </div>
                        <h3>Neighborhood Analysis</h3>
                        <p>Get detailed insights on neighborhood growth potential and investment viability</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa fa-calculator"></i>
                        </div>
                        <h3>ROI Calculator</h3>
                        <p>Estimate your return on investment with our comprehensive financial tools</p>
                    </div>
                </div>
            </section>

            <section className="properties container">
                <div className="section-header">
                    <h2>Featured Properties</h2>
                    <p>Discover top investment opportunities selected by our AI</p>
                </div>

                <div className="property-grid">
                    {listings.slice(0, 3).map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
