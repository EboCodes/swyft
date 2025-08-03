import React, { useState, useRef, useEffect } from 'react';
import "./App.css";

export default function App() {
  const [showPromo, setShowPromo] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [cardHeight, setCardHeight] = useState(60); // Percentage of viewport height
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    startHeight.current = cardHeight;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY.current - currentY;
    const viewportHeight = window.innerHeight;
    const deltaPercent = (deltaY / viewportHeight) * 100;
    
    let newHeight = startHeight.current + deltaPercent;
    newHeight = Math.max(25, Math.min(85, newHeight)); // Limit between 25% and 85%
    
    setCardHeight(newHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Snap to common positions
    if (cardHeight < 35) {
      setCardHeight(25); // Minimized
    } else if (cardHeight < 55) {
      setCardHeight(45); // Half
    } else if (cardHeight < 75) {
      setCardHeight(60); // Default
    } else {
      setCardHeight(80); // Expanded
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const currentY = e.clientY;
      const deltaY = startY.current - currentY;
      const viewportHeight = window.innerHeight;
      const deltaPercent = (deltaY / viewportHeight) * 100;
      
      let newHeight = startHeight.current + deltaPercent;
      newHeight = Math.max(25, Math.min(85, newHeight));
      
      setCardHeight(newHeight);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        
        // Snap to positions
        if (cardHeight < 35) {
          setCardHeight(25);
        } else if (cardHeight < 55) {
          setCardHeight(45);
        } else if (cardHeight < 75) {
          setCardHeight(60);
        } else {
          setCardHeight(80);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, cardHeight]);

  return (
    <div className="app">
      {/* Map Section */}
      <div className="map-wrapper">
        <iframe
          className="map-iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15852.684079626552!2d7.00369835!3d4.8155541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cdae41c91b67%3A0x59c1ff4b6d8f6b9e!2sPort%20Harcourt%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1690800812345!5m2!1sen!2sng"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Port Harcourt Map"
        />

        {/* Top Controls */}
        <div className="map-controls">
          <button className="hamburger-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="profile-btn">
            <img src="https://i.pravatar.cc/150?img=32" alt="Profile" />
          </div>
        </div>

        {/* Location Button */}
        <button className="location-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </button>
      </div>

      {/* Promo Banner (Desktop) */}
      {showPromo && (
        <div className="desktop-only promo-banner">
          <div className="promo-content">
            <span className="promo-icon">🎁</span>
            <div>
              <span className="promo-text"><strong>20% off on 5 rides</strong></span>
              <span className="promo-subtext">Maximum promo ₦600</span>
            </div>
          </div>
          <button className="promo-close" onClick={() => setShowPromo(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Card Container */}
      <div 
        className="card-container"
        ref={cardRef}
        style={{
          '--card-height': `${cardHeight}vh`
        }}
      >
        {/* Drag Handle (Mobile only) */}
        <div 
          className="drag-handle mobile-only"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={(e) => {
            setIsDragging(true);
            startY.current = e.clientY;
            startHeight.current = cardHeight;
          }}
        >
          <div className="drag-indicator"></div>
        </div>
        {/* Promo (Mobile only) */}
        {showPromo && (
          <div className="promo-banner mobile-only">
            <div className="promo-content">
              <span className="promo-icon">🎁</span>
              <div>
                <span className="promo-text"><strong>20% off on 5 rides</strong></span>
                <span className="promo-subtext">Maximum promo ₦600</span>
              </div>
            </div>
            <button className="promo-close" onClick={() => setShowPromo(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Trip Planning Section */}
        <div className="trip-section">
          <div className="route-display">
            <div className="route-line">
              <div className="route-dot start"></div>
              <div className="route-connector"></div>
              <div className="route-dot end"></div>
            </div>
            <div className="route-info">
              <div className="location-item">
                <span className="location-text current">Current Location</span>
              </div>
              <div className="location-item">
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="destination-input"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="schedule-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
              </svg>
              Later
            </button>
          </div>
        </div>

        {/* Service Options */}
        <div className="service-grid">
          <div className="service-card active">
            <div className="service-icon">🚗</div>
            <span className="service-label">Rides</span>
          </div>
          <div className="service-card">
            <div className="service-icon">🍕</div>
            <span className="service-label">Food</span>
          </div>
          <div className="service-card">
            <div className="service-icon">📦</div>
            <span className="service-label">Send</span>
          </div>
        </div>

        {/* Suggestions */}
        <div className="suggestions-section">
          <div className="suggestion-item">
            <div className="suggestion-icon home">🏠</div>
            <div className="suggestion-info">
              <div className="suggestion-title">Home</div>
              <div className="suggestion-subtitle">Saved place</div>
            </div>
            <div className="suggestion-action">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>

          <div className="suggestion-item">
            <div className="suggestion-icon work">💼</div>
            <div className="suggestion-info">
              <div className="suggestion-title">Work</div>
              <div className="suggestion-subtitle">Saved place</div>
            </div>
            <div className="suggestion-action">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>

          <div className="suggestion-item">
            <div className="suggestion-icon location">📍</div>
            <div className="suggestion-info">
              <div className="suggestion-title">Market Square GRA</div>
              <div className="suggestion-subtitle">34 Woji Road, Obio/Akpor</div>
            </div>
            <div className="suggestion-action">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>

          <div className="suggestion-item">
            <div className="suggestion-icon location">📍</div>
            <div className="suggestion-info">
              <div className="suggestion-title">Waterlines Bus Stop</div>
              <div className="suggestion-subtitle">323 PH-Aba Expy, Port Harcourt</div>
            </div>
            <div className="suggestion-action">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile only) */}
      <nav className="bottom-nav mobile-only">
        <button className="nav-item active">
          <div className="nav-icon">🏠</div>
          <span className="nav-label">Home</span>
        </button>
        <button className="nav-item">
          <div className="nav-icon">🧾</div>
          <span className="nav-label">Activity</span>
        </button>
        <button className="nav-item">
          <div className="nav-icon">💳</div>
          <span className="nav-label">Wallet</span>
        </button>
        <button className="nav-item">
          <div className="nav-icon">👤</div>
          <span className="nav-label">Profile</span>
        </button>
      </nav>
    </div>
  );
}
