// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home';

import Navbar from './components/Navbar';
import Tips from './components/Tips';
import Calculator from './components/Calculator';
import Resources from './components/Resources';
import UpcomingEvents from './components/UpcomingEvents';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignupPage';
import './App.css';




const App = () => {
  return (
    <Router>
      <div className="App">
          <Navbar />
         
          <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/tips" element={<Tips />} />
  <Route path="/calculator" element={<Calculator />} />
  <Route path="/events" element={<UpcomingEvents />} />
  <Route path="/resources" element={<Resources />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignUpPage />} />

</Routes>
      </div>
    </Router>
  );
}

export default App;
