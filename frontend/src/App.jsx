// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Projects from './components/Projects';
import FoodExpenseDetails from './components/FoodExpenseDetails';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import DonateNow from './components/DonateNow';
import DonationSuccess from './components/DonationSuccess';
import './App.css';

function App() {
  console.log('App is rendering');
  
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <StatsStrip />
              <AboutUs />
              <Services />
              <Projects />
              <FoodExpenseDetails />
              <ContactUs />
            </>
          } />
          <Route path="/donate" element={<DonateNow />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;