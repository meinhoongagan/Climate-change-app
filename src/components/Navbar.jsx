// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins , faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Climate Action</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tips">Tips</Link></li>
        <li><Link to="/calculator">Calculator</Link></li>
        <li><Link to="/events">Upcoming Events</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/cart">Eco Basket</Link></li>
      </ul>
      <div className="navbar-menu">
          <FontAwesomeIcon icon={faCoins} />Eco-Coin <span style={{color:"dark-green"}}>0</span>
        <Link to="/dashboard">
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </Link>
        <Link to="/subscribe" className="subscription-button">
          Subscribe
        </Link>
      </div>
      <div>
        <button className='Log-In'><Link to="/login">Log-In</Link></button>
      </div>
    </nav>
  );
}

export default Navbar;
