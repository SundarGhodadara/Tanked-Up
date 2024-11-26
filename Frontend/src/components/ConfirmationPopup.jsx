// ConfirmationPopup.js
import React from 'react';
import './ConfirmationPopup.css'; // Add your CSS styles here

function ConfirmationPopup({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{message}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
