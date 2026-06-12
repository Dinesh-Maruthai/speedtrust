// App.js
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import FoodExpenseDetails from './components/FoodExpenseDetails';
import About from './components/AboutUs';
import Services from './components/Services';
import Projects from './components/Projects';
import ContactUs from './components/ContactUs';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <StatsStrip />
      <FoodExpenseDetails />
      <About/>
      <Services />
      <Projects />
      <ContactUs />
    </div>
  );
}

export default App;