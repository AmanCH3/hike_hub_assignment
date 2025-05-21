import React from 'react'
import DistanceSilder from '../../components/filters/DistanceSilder'
import ElevationSlider from '../../components/filters/ElevationSlider'
import DurationSlider from '../../components/filters/DurationSlider'
import DifficultyFiter from '../../components/filters/DifficultyFiter'
import { SlidersHorizontal } from 'lucide-react'

export default function TrailFilterPanel() {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 mb-6 space-y-6'>

      
      <div className='flex flex-col md:flex-row  md:justify-start gap-4'>
        <input
          type='text'
          placeholder='Search trails by name or location'
          className='w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />
        <button className='flex items-center border border-gray-300 px-4 py-2 rounded-md'>
          <SlidersHorizontal className='w-4 h-4 mr-2' />
          Filters
        </button>
      </div>

     
      <div className='grid md:grid-cols-4 gap-6'>
        <DistanceSilder />
        <ElevationSlider />
        <DurationSlider />
        <DifficultyFiter />
      </div>

     
      <div className='flex justify-end space-x-2'>
        <button className='border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition'>Clear All</button>
        <button className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition'>Apply Filters</button>
      </div>
    </div>
  )
}
