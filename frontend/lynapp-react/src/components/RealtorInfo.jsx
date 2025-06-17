import React from 'react';
import './styles/RealtorInfo.css';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const emptyStars = totalStars - filledStars;

  return (
    <div className="star-rating">
      {[...Array(filledStars)].map((_, i) => (
        <span key={`filled-${i}`} className="star filled">★</span>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star empty">★</span>
      ))}
      <span className="rating-text">{rating.toFixed(1)}</span>
    </div>
  );
};

const RealtorInfo = ({ realtor }) => {
  if (!realtor) {
    return null;
  }

  return (
    <div className="realtor-info-card">
      <div className="realtor-main-info">
        <img src={realtor.imageUrl} alt={realtor.name} className="realtor-image" />
        <div className="realtor-details">
          <h3 className="realtor-name">{realtor.name}</h3>
          <p className="realtor-title">Lead Listing Agent</p>
          <StarRating rating={realtor.rating} />
        </div>
      </div>
      <div className="realtor-contact-info">
        <a href={`tel:${realtor.phone}`} className="contact-link">
          <span className="icon">📞</span>
          {realtor.phone}
        </a>
        <a href={`mailto:${realtor.email}`} className="contact-link">
          <span className="icon">✉️</span>
          {realtor.email}
        </a>
      </div>
      <div className="realtor-stats">
        <div className="stat-item">
          <span className="stat-value">{realtor.propertiesListed}</span>
          <span className="stat-label">Properties Listed</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{realtor.experience}</span>
          <span className="stat-label">Years of Experience</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{realtor.degree}</span>
          <span className="stat-label">Degree</span>
        </div>
      </div>
    </div>
  );
};

export default RealtorInfo; 