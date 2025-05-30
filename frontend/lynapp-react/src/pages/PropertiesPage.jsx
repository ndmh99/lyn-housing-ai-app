import { useState, useRef, useEffect } from 'react';
import { useListings } from '../hooks/useListings';
import { getCitySuggestions } from '../services/api';
import ListingCard from '../components/ListingCard';
import './styles/PropertiesPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Always get city from URL
  const params = new URLSearchParams(location.search);
  const cityParam = params.get('city') || '';

  const [inputValue, setInputValue] = useState(cityParam);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Keep inputValue in sync with URL changes
  useEffect(() => {
    setInputValue(cityParam);
  }, [cityParam]);

  const { listings, loading, error } = useListings(cityParam);

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

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    navigate(`/properties/?city=${encodeURIComponent(suggestion)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    setShowSuggestions(false);
    navigate(trimmed ? `/properties/?city=${encodeURIComponent(trimmed)}` : '/properties');
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="properties-page">
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
            listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
