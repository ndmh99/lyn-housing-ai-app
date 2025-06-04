import { useParams, useNavigate } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import PropertyMap from '../components/PropertyMap';
import PriceHistoryChart from '../components/PriceHistoryChart';
import ScoreBadge from '../components/ScoreBadge';
import './styles/PropertyDetailPage.css';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Use the custom hook with numeric ID
  const { listings: property, loading, error } = useListings(parseInt(id));

  if (loading) return <div className="loading">Loading property details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return <div className="error">Property not found</div>;

  return (
    <div className="property-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Properties
      </button>
      
      <div className="property-detail-container">
        <div className="property-images">
          <img src={property.image_url} alt={property.title} className="main-image" />
        </div>
        
        <div className="property-info">
          <h1>{property.title}</h1>
          <p className="price">${property.current_price?.toLocaleString()}</p>
          <p className="location">{property.street_address}, {property.city}, {property.province}</p>
          
          <div className="property-features">
            <span>{property.bedrooms} beds</span>
            <span>{property.bathrooms} baths</span>
            <span>{property.square_feet} sqft</span>
          </div>
          
          <div className="description">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          {/* Add price history chart */}
          {property.price_histories && (
            <div className="price-history-section">
              <PriceHistoryChart priceHistory={property.price_histories[0].price_values} />
            </div>
          )}

          {/* Add walkability scores */}
          <div className="walkability-section">
            <h3>Walkability & Transit</h3>
            <ScoreBadge 
              streetAddress={property.street_address}
              city={property.city}
              province={property.province}
            />
          </div>

          {/* Add the map section */}
          <div className="property-location">
            <h3>Location</h3>
            <PropertyMap property={property} />
          </div>
          
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