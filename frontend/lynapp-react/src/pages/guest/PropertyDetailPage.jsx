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

  // AI Analysis state
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);

  // Schedule Viewing state
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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

  const handleAiAnalysisClick = async (e) => {
    // Check authentication first
    handleClick(e);
    if (e.defaultPrevented) return;

    // If hiding the analysis, clear all analysis data
    if (showAiAnalysis) {
      setShowAiAnalysis(false);
      setAiAnalysis('');
      setAiError('');
      setAiLoading(false);
      return;
    }

    // Show the analysis section and start loading
    setShowAiAnalysis(true);
    setAiLoading(true);
    setAiError('');
    setAiAnalysis('');

    try {
      const startTime = Date.now();
      let response;

      // Try localhost first, then fallback to production
      try {
        // First attempt: localhost (development)
        response = await fetch('http://localhost:8000/api/listings/analyze-housing/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listing_id: property.id
          }),
        });

        // Check if localhost request was successful
        if (!response.ok) {
          throw new Error('Localhost request failed');
        }
      } catch (localhostError) {
        // Fallback: production backend
        console.log('Localhost failed, trying production backend...');
        response = await fetch('https://lyn-housing-ai-app-backend.onrender.com/api/listings/analyze-housing/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listing_id: property.id
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Calculate elapsed time and add minimum delay for better UX
      const elapsedTime = Date.now() - startTime;
      const minDelay = 1000; // 1 second minimum for cool animation
      const additionalDelay = Math.max(0, minDelay - elapsedTime);

      await new Promise(resolve => setTimeout(resolve, additionalDelay));

      setAiAnalysis(data.analysis);
    } catch (error) {
      setAiError(error.message || 'Failed to get AI analysis');
    } finally {
      setAiLoading(false);
    }
  };

  const handleScheduleClick = (e) => {
    // Check authentication first
    handleClick(e);
    if (e.defaultPrevented) return;

    // If hiding the schedule, clear selections
    if (showSchedule) {
      setSelectedDate('');
      setSelectedTime('');
    }

    setShowSchedule(!showSchedule);
  };

  // Generate available time slots for next 7 days
  const generateTimeSlots = () => {
    const slots = [];
    const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      times.forEach(time => {
        slots.push({
          id: `${date.toISOString().split('T')[0]}-${time}`,
          day: dayName,
          date: dateStr,
          time: time,
          available: Math.random() > 0.3, // 70% chance of being available
          fullDate: date.toISOString().split('T')[0]
        });
      });
    }
    return slots;
  };

  const getAvailableDates = () => {
    const timeSlots = generateTimeSlots();
    const dates = [];
    const dateMap = new Map();

    timeSlots.forEach(slot => {
      if (!dateMap.has(slot.fullDate)) {
        dateMap.set(slot.fullDate, {
          fullDate: slot.fullDate,
          day: slot.day,
          date: slot.date,
          hasAvailable: timeSlots.some(s => s.fullDate === slot.fullDate && s.available)
        });
      }
    });

    return Array.from(dateMap.values()).filter(date => date.hasAvailable);
  };

  const getAvailableTimesForDate = (selectedFullDate) => {
    const timeSlots = generateTimeSlots();
    return timeSlots.filter(slot => slot.fullDate === selectedFullDate && slot.available);
  }; if (loading) return <div className="loading">Loading property details...</div>;
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
            <AiAnalysisButton onClick={handleAiAnalysisClick} loading={aiLoading} />
            <ScheduleButton onClick={handleScheduleClick} />
            <RoiCalculatorButton onClick={handleClick} />
            <FavoriteButton onClick={handleClick} />
          </div>
        </div>

        {/* Schedule Viewing Section */}
        {showSchedule && (
          <div className="schedule-viewing-section">
            <h3>📅 Schedule a Property Viewing</h3>
            <div className="schedule-content">
              <p className="schedule-intro">Select your preferred date and time to visit this property:</p>

              {/* Desktop/Tablet Grid View */}
              <div className="schedule-grid desktop-schedule">
                {generateTimeSlots().map((slot) => (
                  <button
                    key={slot.id}
                    className={`time-slot ${!slot.available ? 'unavailable' :
                      selectedDate === slot.fullDate && selectedTime === slot.time ? 'selected' : 'available'
                      }`}
                    disabled={!slot.available}
                    onClick={() => {
                      if (slot.available) {
                        setSelectedDate(slot.fullDate);
                        setSelectedTime(slot.time);
                      }
                    }}
                  >
                    <div className="slot-day">{slot.day}</div>
                    <div className="slot-date">{slot.date}</div>
                    <div className="slot-time">{slot.time}</div>
                    {!slot.available && <span className="unavailable-label">Booked</span>}
                  </button>
                ))}
              </div>

              {/* Mobile Dropdown View */}
              <div className="mobile-schedule">
                <div className="dropdown-container">
                  <label htmlFor="date-select">Select Date:</label>
                  <select
                    id="date-select"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime(''); // Reset time when date changes
                    }}
                    className="schedule-dropdown"
                  >
                    <option value="">Choose a date...</option>
                    {getAvailableDates().map((date) => (
                      <option key={date.fullDate} value={date.fullDate}>
                        {date.day}, {date.date}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedDate && (
                  <div className="dropdown-container">
                    <label htmlFor="time-select">Select Time:</label>
                    <select
                      id="time-select"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="schedule-dropdown"
                    >
                      <option value="">Choose a time...</option>
                      {getAvailableTimesForDate(selectedDate).map((slot) => (
                        <option key={slot.id} value={slot.time}>
                          {slot.time}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {selectedDate && selectedTime && (
                <div className="booking-confirmation">
                  <div className="selected-slot">
                    <h4>✨ Selected Viewing Time</h4>
                    <p>
                      <strong>{getAvailableDates().find(d => d.fullDate === selectedDate)?.day}</strong>, {' '}
                      {getAvailableDates().find(d => d.fullDate === selectedDate)?.date} at <strong>{selectedTime}</strong>
                    </p>
                  </div>

                  <div className="booking-actions">
                    <button className="confirm-booking-btn">
                      🏠 Confirm Viewing
                    </button>
                    <button
                      className="clear-selection-btn"
                      onClick={() => {
                        setSelectedDate('');
                        setSelectedTime('');
                      }}
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Analysis Section */}
        {showAiAnalysis && (
          <div className="ai-analysis-section">
            <h3>🤖 LynAI Market Analysis</h3>
            {aiLoading && (
              <div className="ai-loading">
                <div className="loading-spinner"></div>
                <p>Analyzing property with AI...</p>
              </div>
            )}
            {aiError && (
              <div className="ai-error">
                <p>❌ {aiError}</p>
                <button onClick={handleAiAnalysisClick} className="retry-btn">
                  Try Again
                </button>
              </div>
            )}
            {aiAnalysis && (
              <div className="ai-result">
                <div className="analysis-content">
                  <div className="analysis-text">
                    {aiAnalysis
                      .split('\n')
                      .map((line, index) => {
                        if (line.trim() === '') return <br key={index} />;

                        // Handle bold text with **
                        let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                        // Check if line ends with a colon (likely a section header)
                        if (line.trim().endsWith(':')) {
                          formattedLine = `<strong>${line}</strong>`;
                        }

                        return (
                          <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: formattedLine }}
                            style={{
                              marginBottom: line.trim().endsWith(':') ? '12px' : '8px',
                              marginTop: line.trim().endsWith(':') ? '16px' : '0px'
                            }}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
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
