// App.js
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import FoodExpenseDetails from './components/FoodExpenseDetails';
import About from './components/AboutUs';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <StatsStrip />
      <FoodExpenseDetails />
      <About/>
    </div>
  );
}

export default App;