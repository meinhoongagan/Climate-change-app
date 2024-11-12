import React from 'react';
import './Impact.css';

const Impact = ({ 
  para, 
  min, 
  mid, 
  mid2, 
  max, 
  max2, 
  minImpact, 
  midImpact, 
  maxImpact 
}) => {
  const hasExtendedRanges = mid2 !== '' && max2 !== '';

  if (hasExtendedRanges) {
    return (
      <div className="impact-container">
        {(para > min && para <= mid) && (
          <div className="impact-text">{minImpact}</div>
        )}
        {(para > mid && para <= max) && (
          <div className="impact-text">{midImpact}</div>
        )}
        {para > max && (
          <div className="impact-text">{maxImpact}</div>
        )}
      </div>
    );
  }

  return (
    <div className="impact-container">
      {(para >= min && para <= mid2) && (
        <div className="impact-text">{minImpact}</div>
      )}
      {((para > mid2 && para <= max2) || (para >= mid && para < min)) && (
        <div className="impact-text">{midImpact}</div>
      )}
      {((para > max && para < mid) || para > max2) && (
        <div className="impact-text">{maxImpact}</div>
      )}
    </div>
  );
};

export default Impact;