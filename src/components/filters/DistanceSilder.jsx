import React from 'react'

export default function DistanceSilder() {
  return (
    <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'> Distance(km)</label>
        <input type='range' min={0} max = {20} className='w-full accent-green-600'/>
        <div className='flex justify-between text-xs text-gray-500'>
            <span> 0 km</span>
            <span>20 km</span>
        </div>
      
    </div>
  )
}
