import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import PropertyMap from '../components/PropertyMap';
import PriceHistoryChart from '../components/PriceHistoryChart';
import ScoreBadge from '../components/ScoreBadge';
import ImageGallery from '../components/ImageGallery';
import './styles/PropertyDetailPage.css';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { listings: property, loading, error } = useListings(parseInt(id));

  if (loading) return <div className="loading">Loading property details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return <div className="error">Property not found</div>;

  const imageUrls = [property.image_url, property.image_url, property.image_url].filter(Boolean);

  return (
    <div className="property-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Properties
      </button>

      <div className="property-detail-container">
        {/* Left Column*/}
        <div className="property-left-section">
          {/* Image Gallery */}
          <div className="property-images">
            <ImageGallery
              images={imageUrls}
              alt={property.title}
            />
          </div>

          {/* Property Info Container */}
          <div className="property-info-container">
            {/* Header Information */}
            <div className="property-header">
              <h1>{property.title}</h1>
              <p className="price">${property.current_price?.toLocaleString()}</p>
              <p className="location">{property.street_address}, {property.city}, {property.province}</p>
            </div>
            <div className="property-features">
              <span>{property.bedrooms} beds</span>
              <span>{property.bathrooms} baths</span>
              <span>{property.square_feet} sqft</span>
            </div>
            <div className="description">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="property-right-section">

          {/* Location & Map Section */}
          <div className="property-location">
            <h3>Location & Walkability Scores</h3>
            <div className="location-content">
              <div className="walkability-scores">
                <ScoreBadge
                  streetAddress={property.street_address}
                  city={property.city}
                  province={property.province}
                />
              </div>
              <div className="map-container">
                <PropertyMap property={property} />
              </div>
            </div>
          </div>

          {/* Price History */}
          {property.price_histories && (
            <div className="price-history-section">
              <PriceHistoryChart priceHistory={property.price_histories[0].price_values} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="contact-section">
            <button className="ai-analysis">Magic LynAI</button>
            <button className="schedule-button">Schedule Viewing</button>
            <button className="favorite-button"> ♥ Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;