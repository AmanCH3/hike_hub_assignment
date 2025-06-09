import React from 'react'

import HeroSection from '../components/landing/HeroSection'
import HikeFeatures from '../components/landing/FeatureSection'
import FeaturedTrails from '../components/landing/FeatureTrails'
import Navbar from '../layouts/Header'
import Footer from '../layouts/Footer'


export default function LandingPage() {
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
