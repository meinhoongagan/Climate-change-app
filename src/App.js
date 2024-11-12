// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home/Home';

import Navbar from './components/Navbar/Navbar';
import Tips from './components/Tips/Tips';
import Calculator from './components/Calculator/Calculator';
import Resources from './components/Resources/Resources';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';
import LoginPage from './components/Login/LoginPage';
import SignUpPage from './components/SingUp/SignupPage';
import Subscribe from './components/Subscribe/Subscribe';
import Dashboard from './components/Dashboard/Dashboard';
import EcoCart from './components/EcoCart/EcoCart';
import './App.css';

const SimulatorLayout = () => {
  return (
    <div className="main">
      <Parameter />
      <Routes>
        <Route index element={<UrbanPage />} />
        <Route path="urban" element={<UrbanPage />} />
        <Route path="forest" element={<ForestPage />} />
        <Route path="desert" element={<DesertPage />} />
        <Route path="mountain" element={<MountainPage />} />
      </Routes>
    </div>
  );
};

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
  <Route path="/subscribe" element={<Subscribe/>} />
   <Route path="/dashboard" element={<Dashboard/>} />
   <Route path="/cart" element={<EcoCart/>} />
</Routes>
      </div>
    </Router>
  );
}

export default App;