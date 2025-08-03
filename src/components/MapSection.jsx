import React from 'react';
import './MapSection.css';

const MapSection = () => {
  return (
    <div className="map-wrapper">
      {/* Google Map */}
      <div className="map-container">
        <iframe
          title="Port Harcourt Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15852.684079626552!2d7.00369835!3d4.8155541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cdae41c91b67%3A0x59c1ff4b6d8f6b9e!2sPort%20Harcourt%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1690800812345!5m2!1sen!2sng"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Hamburger */}
        <button className="hamburger">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>

      {/* Promo Banner */}
      <div className="promo-banner">
        <div className="promo-content">
          <p>🎁 <strong>20% off on 5 rides</strong></p>
          <p className="small">Maximum promo ₦600</p>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
