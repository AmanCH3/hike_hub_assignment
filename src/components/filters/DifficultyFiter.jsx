import React from 'react'

export default function DifficultyFiter() {
  return (
    <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'> Difficulty Level</label>
        <div className='space-y-2 text-sm text-gray-500'>
            <div className='flex items-center'>
                <input type='radio' id = "add" name='difficulty' className='accent-green-600' defaultChecked/>
                <label htmlFor="all" className='ml-2'>All Difficulties</label>
            </div>

            <div className='flex items-center'>
                <input type='radio' id='easy' name = 'difficulty' className='accent-green-600'/>
                <label htmlFor="easy" className='ml-2'>Easy</label>
            </div>

            <div className='flex items-center'>
                <input type="radio" id='moderate' name = 'difficulty' className='accent-green-600' />
                <label htmlFor="moderate" className='ml-2'>Moderate</label>
            </div>

            <div className='flex items-center'>
                <input type='radio' id = 'diffculty' name = 'difficulty' className='accent-green-600'/>
                <label htmlFor="difficulty" className='ml-2'>Difficult</label>

            </div>
        </div>
    </div>
  )
}
