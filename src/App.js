// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import UrbanPage from './components/UrbanPage/UrbanPage';
import MountainPage from './components/MountainPage/MountainPage';
import DesertPage from './components/DesertPage/DesertPage';
import ForestPage from './components/ForestPage/ForestPage';
import Parameter from './components/Parameter/Parameter';
import Community from './components/Community/Community';
import Createblog from './components/Community/Createblog';
import EditBlog from './components/Community/EditBlog';

const SimulatorLayout = () => {
  return (
    <div className="main">
      <Parameter />
      <Routes>
        {/* Default route for /simulator */}
        <Route index element={<UrbanPage />} />
        
        {/* Nested routes */}
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
      <div className="app">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/events" element={<UpcomingEvents />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<EcoCart />} />
            <Route path="/simulator/*" element={<SimulatorLayout />} />
          <Route path="/community" element={<Community/>} />
          <Route path="/createblog" element={<Createblog/>} />
          <Route path="/update-post/:blogid" element={<EditBlog/>} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;