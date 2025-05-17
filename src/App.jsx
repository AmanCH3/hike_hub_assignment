import { useState } from 'react'

import Navbar from './components/landing/Header'
import HeroSection from './components/landing/HeroSection'
import HikeFeatures from './components/landing/FeatureSection'

function App() {
  

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar/>
      <HeroSection/>
      <HikeFeatures/>
    </div>
  )
}

export default App
