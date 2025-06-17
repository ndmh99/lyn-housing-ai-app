import React from 'react';
import './styles/ScoreBadge.css';

const ScoreBadge = ({ streetAddress, city, province }) => {
  // Format address for Walk Score URL
  const formatAddressForUrl = () => {
    const address = `${streetAddress} ${city} ${province}`;
    return address.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  };

  const addressSlug = formatAddressForUrl();
  
  // Walk Score URLs
  const walkScoreUrl = `https://www.walkscore.com/score/120.dash.${addressSlug}?utm_source=badge&utm_medium=responsive&utm_campaign=badge`;
  const exploreUrl = `https://www.walkscore.com/CA-${province}/${city}?utm_source=badge&utm_medium=responsive&utm_campaign=badge`;
  
  // Image URLs for the scores
  const walkImageUrl = `//pp.walk.sc/badge/walk/120.dash.${addressSlug}.svg`;
  const transitImageUrl = `//pp.walk.sc/badge/transit/120.dash.${addressSlug}.svg`;
  const bikeImageUrl = `//pp.walk.sc/badge/bike/120.dash.${addressSlug}.svg`;

  return (
    <div className="score-badge">
      <div className="score-badge-content">
        
        <div className="score-badges-container">
          <div className="score-images">
            <a 
              rel="nofollow" 
              href={walkScoreUrl}
              target="_blank"
              className="score-link"
            >
              <img 
                src={walkImageUrl}
                alt={`Walk Score of ${streetAddress} ${city} ${province} Canada`}
                className="score-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <img 
                src={transitImageUrl}
                alt={`Transit Score of ${streetAddress} ${city} ${province} Canada`}
                className="score-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <img 
                src={bikeImageUrl}
                alt={`Bike Score of ${streetAddress} ${city} ${province} Canada`}
                className="score-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBadge;