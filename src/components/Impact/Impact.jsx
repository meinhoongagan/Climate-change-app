import React from 'react';
import './Impact.css'

const Impact = ({ para, min, mid, mid2, max, max2, minImpact, midImpact, maxImpact }) => {
  if (!mid2 && !max2) {
    // Clear boundaries with 'else if' for mutually exclusive ranges
    if (para > min && para <= mid) {
      return <div className='impact-container'>{minImpact}</div>;
    } else if (para > mid && para <= max) {
      return <div className='impact-container'>{midImpact}</div>;
    } else if (para > max) {
      return <div className='impact-container'>{maxImpact}</div>;
    }
  } else {
    // Clear boundaries with 'else if' for mutually exclusive ranges
    if (para >= min && para <= mid2) {
      return <div className='impact-container'>{minImpact}</div>;
    } else if (para > mid2 && para <= max2) {
      return <div className='impact-container'>{midImpact}</div>;
    } else if (para > max || para > max2) {
      return <div className='impact-container'>{maxImpact}</div>;
    }
  }
  // Return nothing if no condition is met
  return null;
};

export default Impact; // Export statement added
