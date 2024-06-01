import React from 'react';
import './SignUpPage.css';

const SignupPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" id="name" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-input" required />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
