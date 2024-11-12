import React from 'react';
import '../../App.css';

const Subscribe = () => {
  return (
    <div className="subscribe">
      <h1>Subscribe to our Services</h1>
      <div className="subscription-plans">
        <div className="plan">
          <h2>Freemium</h2>
          <ul>
            <li>Decent climate report</li>
            <li>No agent for services</li>
            <li>No personalized tips</li>
          </ul>
          <button className="btn">Select Freemium</button>
        </div>
        <div className="plan">
          <h2>Pro</h2>
          <ul>
            <li>Personalized climate diet report</li>
            <li>Suggestions and tips for tools</li>
            <li>Improving health according to climate</li>
            <li>No mentor for renewable energy resources installment</li>
          </ul>
          <button className="btn">Select Pro</button>
        </div>
        <div className="plan">
          <h2>Pro Plus</h2>
          <ul>
            <li>Access to all features</li>
            <li>Personalized climate diet report</li>
            <li>Suggestions and tips for tools</li>
            <li>Improving health according to climate</li>
            <li>Mentor for guiding renewable energy resources installment</li>
          </ul>
          <button className="btn">Select Pro Plus</button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
