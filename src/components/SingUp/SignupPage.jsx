import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import API_ENDPOINT from "../../config/api.js";

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    try {
      const response = await fetch(`${API_ENDPOINT}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (response.status === 201) {
        alert('Signup successful');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name" 
              className="form-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
