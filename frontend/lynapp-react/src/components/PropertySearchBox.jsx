import { useState, useRef, useEffect } from 'react';
import { getCitySuggestions } from '../services/api';
import './styles/PropertySearchBox.css';

const PropertySearchBox = ({
  initialValue = '',
  onSubmit,
  autoFocus = false,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

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
    if (onSubmit) onSubmit(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSubmit) onSubmit(inputValue.trim());
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click on suggestion item
    setTimeout(() => {
      if (!inputRef.current?.contains(document.activeElement)) { // Check if focus is still within search box elements
        setShowSuggestions(false);
      }
    }, 150); // Increased delay slightly
  };

  return (
    <div className="property-search-box">
      <form className="search-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="location"
              placeholder="Enter City, Neighborhood, or Postal Code"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleBlur}
              ref={inputRef}
              autoComplete="off"
              autoFocus={autoFocus}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="autocomplete-suggestions">
                {suggestions.map((s, idx) => (
                  <li
                    key={s + idx}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSuggestionClick(s);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" className="btn">Search</button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearchBox;
