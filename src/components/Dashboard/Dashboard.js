import React from 'react';
import '../../App.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Climate Change App</h1>
      </div>
      <div className="profile-section">
        <div className="profile-card">
          <img src="https://images.pexels.com/photos/4974360/pexels-photo-4974360.jpeg?auto=compress&cs=tinysrgb&w=600" alt="User Profile" className="profile-pic" />
          <h2>John Doe</h2>
          <p>
            <span className="label">Email:</span> john.doe@example.com
          </p>
          <p>
            <span className="label">Location:</span> New York, USA
          </p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
        <div className="eco-score">
          <h3>Your Eco Score</h3>
          <div className="score-circle">
            <span className="score-value">0</span>
          </div>
          <p>Keep up the good work!</p>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="card">
          <h2>
            <i className="fas fa-chart-line"></i> Statistics
          </h2>
          <p>Track your climate impact statistics here.</p>
        </div>
        <div className="card">
          <h2>
            <i className="fas fa-leaf"></i> Activities
          </h2>
          <p>See your recent eco-friendly activities and updates.</p>
        </div>
        <div className="card">
          <h2>
            <i className="fas fa-book"></i> Resources
          </h2>
          <p>Access useful resources and tools to live a greener lifestyle.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;