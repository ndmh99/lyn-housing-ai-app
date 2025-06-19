import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useListings } from '../../hooks/useListings';
import PropertyMap from '../../components/PropertyMap';
import PriceHistoryChart from '../../components/PriceHistoryChart';
import ScoreBadge from '../../components/ScoreBadge';
import ImageGallery from '../../components/ImageGallery';
import RealtorInfo from '../../components/RealtorInfo';
import SimpleToast from '../../components/utility/SimpleToast';
import FavoriteButton from '../../components/buttons/FavoriteButton';
import ScheduleButton from '../../components/buttons/ScheduleButton';
import AiAnalysisButton from '../../components/buttons/AiAnalysisButton';
import RoiCalculatorButton from '../../components/buttons/RoiCalculatorButton';
import './styles/PropertyDetailPage.css';
import { useAuth } from '../../contexts/AuthContext';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { listings: property, loading, error } = useListings(parseInt(id));

  // State for our simple toast
  const [toastMessage, setToastMessage] = useState('');
  const [propertyUrl, setPropertyUrl] = useState('');
  const [isInternalNavigation, setIsInternalNavigation] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setPropertyUrl(window.location.href);

    // Check if the referrer is from the same site.
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
      setIsInternalNavigation(true);
    }
  }, []);

  const handleBackClick = () => {
    if (isInternalNavigation) {
      navigate(-1); // Go back to the previous page in history
    } else {
      navigate('/properties'); // Go to the default properties page
    }
  };

  const handleClick = (e) => {
    // If the user is NOT logged in...
    if (!currentUser) {
      // Stop the button from toggling its state.
      e.preventDefault(); 
      setToastMessage('Please log in or register to use this feature.');
      return;
    }
  };

  if (loading) return <div className="loading">Loading property details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return <div className="error">Property not found</div>;

  const imageUrls = [property.image_url, property.image_url, property.image_url].filter(Boolean);

  return (
    <div className="property-detail-page">
      <button className="back-button" onClick={handleBackClick}>
        ← Back to Properties
      </button>

      <div className="property-detail-container">
        {/* Left Column*/}
        <div className="property-left-section">

          {/* Property Info Container */}
          <div className="property-info-container">
            {/* Image Gallery */}
            <div className="property-images">
              <ImageGallery
                images={imageUrls}
                alt={property.title}
              />
            </div>
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

          {property && (
            <div className="social-section">
              <h3>Share this Property</h3>
              <div className="social-buttons">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="social-button facebook"
                  aria-label="Share on Facebook"
                >
                  <i
                    className="fab fa-facebook-f"
                    style={{ paddingLeft: "3px", paddingRight: "2.5px" }}
                  ></i>
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(propertyUrl)}&text=${encodeURIComponent(property.title)}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="social-button twitter"
                  aria-label="Share on Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(propertyUrl);
                    setToastMessage(
                      "Link copied! Paste it in your Instagram story."
                    );
                    window.open("https://www.instagram.com/create/story", "_blank");
                  }}
                  className="social-button instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(propertyUrl);
                    setToastMessage("Link copied! Paste it in your TikTok video.");
                    window.open("https://www.tiktok.com/tiktokstudio/upload", "_blank");
                  }}
                  className="social-button tiktok"
                  aria-label="Share on TikTok"
                >
                  <i className="fab fa-tiktok"></i>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(propertyUrl);
                    setToastMessage("Link copied to clipboard!");
                  }}
                  className="social-button copy-link"
                  aria-label="Copy link"
                >
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
          )}

          <div className="realtor-info-separator"></div>

          {/* Realtor Info Section */}
          {(() => {
            const mockRealtor = {
              name: 'Jane Doe',
              phone: '123-456-7890',
              email: 'jane.doe@lynrealty.com',
              propertiesListed: 124,
              experience: 8,
              degree: 'B.Com, Real Estate',
              rating: 4.8,
              imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            };
            return <RealtorInfo realtor={mockRealtor} />;
          })()}
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
            <AiAnalysisButton onClick={handleClick} />
            <ScheduleButton onClick={handleClick} />
            <RoiCalculatorButton onClick={handleClick} />
            <FavoriteButton onClick={handleClick} />
          </div>
        </div>
      </div>

      {/* Conditionally render the toast */}
      {toastMessage && (
        <SimpleToast
          message={toastMessage}
          onClose={(() => setToastMessage(''))}
        />
      )}
    </div>
  );
};

export default PropertyDetailPage;
