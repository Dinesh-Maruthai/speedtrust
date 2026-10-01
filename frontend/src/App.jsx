// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Event from './components/Events/Event';
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
import AboutDetails from './components/AboutDetails/AboutDetails';
import DetailedCard from './components/Events/DetailedCard';
import Gallery from './components/Gallery/Gallery';
import './App.css';
import RequireAuth from './components/RequireAuth';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

// Wrapper so we can read location inside Router context
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <StatsStrip />
            <AboutUs />
            <Services />
            <FoodExpenseDetails />
            <Projects />
            <ContactUs />
          </>
        } />
        <Route path="/about" element={<AboutDetails />} />
        <Route path="/donate" element={<DonateNow />} />
        <Route path="/donation-success" element={<DonationSuccess />} />
        <Route path="/events" element={<Event />} />
        <Route path="/events/:id" element={<DetailedCard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={<RequireAuth><AdminDashboard /></RequireAuth>}
        />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;