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
import Forum from './components/Forum';
import Thread from './components/Thread';
import Category from './components/Category';
import Subscribe from './components/Subscribe';
import Dashboard from './components/Dashboard';
import EcoCart from './components/EcoCart';
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
  <Route exact path="/forum" element={<Forum/>} />
  <Route path="/category/:categoryId" element={<Category/>} />
  <Route path="/thread/:threadId" element={<Thread/>} />
  <Route path="/subscribe" element={<Subscribe/>} />
   <Route path="/dashboard" element={<Dashboard/>} />
   <Route path="/cart" element={<EcoCart/>} />
</Routes>
      </div>
    </Router>
  );
}

export default App;
