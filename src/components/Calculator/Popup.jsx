import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Popup.css';

const Popup = ({ data, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} title="Close">&times;</button>
        <h3>Carbon Footprint Report</h3>
        <div className="popup-data">
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
        <div className="popup-footer">
          <button className="popup-close-btn" onClick={onClose}>Close Report</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
