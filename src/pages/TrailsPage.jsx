import React from 'react'
import TrailFilterPanel from '../features/trails/TrailFilterPanel'
import TrailGrid from '../components/TrailGrid'
import Navbar from '../components/landing/Header'
import FeaturedTrails from '../components/landing/FeatureTrails'
import Footer from '../components/landing/Footer'

export default function TrailsPage() {
  return (

    <div className='bg-gray-50 min-h-screen flex flex-col'>
            <Navbar/>
            <main className='flex-grow p-6'>
   


        <h1 className='text-3xl font-bold mb-1'>Discover Trails</h1>
        <p className='text-gray-500 mb-6'>Find the perfect trail for your next adventure</p>
        <TrailFilterPanel/>
        <FeaturedTrails/>
      
    
    </main>
    <Footer/>
    </div>
  )
}
