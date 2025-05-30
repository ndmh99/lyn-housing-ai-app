import { useState, useRef } from 'react';
import { useListings } from '../hooks/useListings';
import { getCitySuggestions } from '../services/api';
import ListingCard from '../components/ListingCard';
import './styles/PropertiesPage.css';

const PropertiesPage = () => {
  const [city, setCity] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const { listings, loading, error } = useListings(city);

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
    setCity(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputValue.trim());
    setShowSuggestions(false);
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
