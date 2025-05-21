import React from 'react'

export default function ElevationSlider() {
  return (
    <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Elevation Gain(m)</label>
        <input type='range' min={0} max={1500} className='w-full accent-green-500'/>
        <span> 0 m</span>
        <span>1500 m</span>
      
    </div>
  )
}
