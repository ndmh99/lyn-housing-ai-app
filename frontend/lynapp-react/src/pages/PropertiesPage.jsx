import { useState, useEffect } from 'react';
import { useListings } from '../hooks/useListings';
import { getCitySuggestions } from '../services/api';
import ListingCard from '../components/ListingCard';
import './styles/PropertiesPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import PropertySearchBox from '../components/PropertySearchBox';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const cityParam = params.get('city') || '';

  const { listings, loading, error } = useListings(cityParam);

  return (
    <div className="properties-page">
      <PropertySearchBox
        initialValue={cityParam}
        onSubmit={city => {
          const trimmed = city.trim();
          navigate(trimmed ? `/properties/?city=${encodeURIComponent(trimmed)}` : '/properties');
        }}
      />
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
