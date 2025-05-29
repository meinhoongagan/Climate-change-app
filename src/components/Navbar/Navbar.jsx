// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCoins, 
  faTachometerAlt, 
  faBars, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';
import '../Navbar/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/UserSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 860);
  const isLogedIn = useSelector((state) => state.UserStates.isLogedIn);
  const dispatch= useDispatch();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setMenuOpen(false);
      }
      setIsMobile(window.innerWidth <= 860);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuOpen && !e.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]);


  const handleLogout = () => {
    isMobile && setMenuOpen(false);
    dispatch(setLogout());
  };

  return (
      <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Climate Action</Link>
      </div>

      <button 
        className="navbar-toggle" 
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => isMobile && setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/tips" onClick={() => isMobile && setMenuOpen(false)}>Tips</Link></li>
        <li><Link to="/calculator" onClick={() => isMobile && setMenuOpen(false)}>Calculator</Link></li>
        <li><Link to="/events" onClick={() => isMobile && setMenuOpen(false)}>Upcoming Events</Link></li>
        <li><Link to="/resources" onClick={() => isMobile && setMenuOpen(false)}>Resources</Link></li>
        <li><Link to="/cart" onClick={() => isMobile && setMenuOpen(false)}>Eco Basket</Link></li>
        <li><Link to="/simulator" onClick={() => isMobile && setMenuOpen(false)}>Simulator</Link></li>
        {/* todo : make either community section private or use cookies for verification */}
        {isLogedIn && <li><Link to="/community" onClick={() => isMobile && setMenuOpen(false)}>Community</Link></li>}
      </ul>

      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <div>
          <FontAwesomeIcon icon={faCoins} /> Eco-Coin <span style={{ color: "#b1cab3" }}>0</span>
        </div>
        <Link to="/dashboard" onClick={() => isMobile && setMenuOpen(false)}>
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </Link>
        <Link 
          to="/subscribe" 
          className="subscription-button"
          onClick={() => isMobile && setMenuOpen(false)}
        >
          Subscribe
        </Link>
      </div>

      <div className={`navbar-login ${menuOpen ? 'active' : ''}`}>
        <button className='Log-In' style={{backgroundColor: '#ff8800'}}>
          <Link to="/login" onClick={handleLogout} style={{ textDecoration: 'none', color: 'white'}} >{isLogedIn ? "Log Out" : "Log In"}</Link>
        </button>
      </div>
    </nav>
    
  );
};

export default Navbar;