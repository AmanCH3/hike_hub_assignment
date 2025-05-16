import { useState } from 'react'

import Navbar from './components/landing/Header'
import HeroSection from './components/landing/HeroSection'

function App() {
  

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar/>
      <HeroSection/>
    </div>
  )
}

export default App
