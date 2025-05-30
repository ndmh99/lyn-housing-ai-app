import { useState, useRef } from 'react';
import { useListings } from '../hooks/useListings';
import { getCitySuggestions } from '../services/api';
import ListingCard from '../components/ListingCard';
import './styles/HomePage.css';

const HomePage = () => {
    const [city, setCity] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    const { listings, loading, error } = useListings(city);

    // Autocomplete handler
    const handleInputChange = async (e) => {
        const value = e.target.value;
        setInputValue(value);
        setShowSuggestions(true);
        if (value.length > 0) {
            const cities = await getCitySuggestions(value);
            setSuggestions(cities);
        } else {
            setSuggestions([]);
        }
    };

    // On suggestion click
    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setCity(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    // On form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(inputValue.trim());
        setShowSuggestions(false);
    };

    // Hide suggestions on blur
    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 100);
    };

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Next Investment Property</h1>
                    <p>Use our AI-powered predictions to discover high-appreciation real estate opportunities</p>
                    <form className="search-form" onSubmit={handleSubmit} autoComplete="off">
                        <div className="form-row">
                            <div className="form-group" style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="City, Neighborhood, or Postal Code"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={handleBlur}
                                    ref={inputRef}
                                    autoComplete="off"
                                />
                                {showSuggestions && suggestions.length > 0 && (
                                    <ul className="autocomplete-suggestions">
                                        {suggestions.map((s, idx) => (
                                            <li
                                                key={s + idx}
                                                onMouseDown={() => handleSuggestionClick(s)}
                                            >
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn">Search Properties</button>
                            </div>
                        </div>
                    </form>
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
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        listings.slice(0, 3).map(listing => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
