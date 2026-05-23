import { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import AboutUs from './Components/AboutUs'
import './App.css'
import HeroSection from './Components/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <HeroSection />
      <AboutUs/>
    </BrowserRouter>

  )
}

export default App
