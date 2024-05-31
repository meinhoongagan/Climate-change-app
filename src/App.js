// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home';

import Navbar from './components/Navbar';
import Tips from './components/Tips';
import Calculator from './components/Calculator';
import Resources from './components/Resources';
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
  <Route path="/resources" element={<Resources />} />
</Routes>
      </div>
    </Router>
  );
}

export default App;
