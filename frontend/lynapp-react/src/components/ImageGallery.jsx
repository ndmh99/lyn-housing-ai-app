import React, { useState } from 'react';
import './styles/ImageGallery.css';

const ImageGallery = ({ images, alt = "Property image" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle different input types: string, JSON string, or array
  const parseImages = (input) => {
    if (!input) return [];
    
    // If it's already an array, use it
    if (Array.isArray(input)) return input;
    
    // If it's a string, try to parse as JSON first
    if (typeof input === 'string') {
      try {
        const parsed = JSON.parse(input);
        return Array.isArray(parsed) ? parsed : [input];
      } catch {
        // If JSON parsing fails, treat as single URL
        return [input];
      }
    }
    
    return [input];
  };
  
  const imageArray = parseImages(images);
  
  // Filter out any null/undefined images
  const validImages = imageArray.filter(Boolean);
  
  if (validImages.length === 0) {
    return <div className="no-images">No images available</div>;
  }

  const changeImage = (newIndex) => {
    if (isTransitioning) return; // Prevent rapid clicking
    
    setIsTransitioning(true);
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setIsTransitioning(false);
    }, 250);
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % validImages.length;
    changeImage(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + validImages.length) % validImages.length;
    changeImage(newIndex);
  };

  const currentImage = validImages[currentImageIndex];

  return (
    <div className="image-gallery">
      {/* Blurred background image */}
      <img 
        src={currentImage}
        alt=""
        className="background-image"
      />
      
      {/* Main focused image */}
      <img 
        src={currentImage} 
        alt={`${alt} ${currentImageIndex + 1}`}
        className={`main-image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
      />
      
      {validImages.length > 1 && (
        <>
          <button 
            className="gallery-btn prev-btn" 
            onClick={prevImage}
            disabled={isTransitioning}
          >
            ‹
          </button>
          <button 
            className="gallery-btn next-btn" 
            onClick={nextImage}
            disabled={isTransitioning}
          >
            ›
          </button>
          <div className="image-counter">
            {currentImageIndex + 1} / {validImages.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;