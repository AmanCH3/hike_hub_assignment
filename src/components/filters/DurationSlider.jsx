import React from 'react'

export default function DurationSlider() {
  return (
    <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Duration (hours)</label>
        <input type='range' min={0} max={8} className='w-full accent-green-600'/>
        <div className='flex justify-between text-xs text-gray-500'>
            <span> 0 hrs</span>
            <span> 8 hrs</span>

        </div>
      
    </div>
  )
}
