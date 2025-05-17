import { useState } from 'react'

import Navbar from './components/landing/Header'
import HeroSection from './components/landing/HeroSection'
import HikeFeatures from './components/landing/FeatureSection'
import FeaturedTrails from './components/landing/FeatureTrails'
import Footer from './components/landing/Footer'

function App() {
  

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar/>
      <HeroSection/>
      <HikeFeatures/>
      <FeaturedTrails/>
      <Footer/>
    </div>
  )
}

export default App
