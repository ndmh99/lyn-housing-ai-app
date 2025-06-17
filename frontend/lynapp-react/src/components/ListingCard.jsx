import { Link } from 'react-router-dom';
import './styles/ListingCard.css';

const ListingCard = ({ listing }) => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="listing-card">
      <div className="listing-image">
        <img 
          src={listing.image_url} 
          alt={listing.title}
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x300';
          }}
        />
        <div className="price-tag">
          {formatPrice(listing.current_price)}
        </div>
      </div>
      
      <div className="listing-content">
        <h3 className="listing-title">{listing.title}</h3>
        
        <p className="listing-address">
          📍 {listing.street_address}, {listing.city}, {listing.province}
        </p>
        
        <div className="listing-details">
          <span className="detail-item">
            🛏️ {listing.bedrooms} beds
          </span>
          <span className="detail-item">
            🚿 {listing.bathrooms} baths
          </span>
          <span className="detail-item">
            📐 {listing.square_feet?.toLocaleString()} sq ft
          </span>
        </div>
        
        <p className="listing-description">
          {listing.description?.substring(0, 120)}
          {listing.description?.length > 120 ? '...' : ''}
        </p>
        
        <Link to={`/properties/${listing.id}`}>
          <button className="view-details-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;