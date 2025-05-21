// src/components/TrailCard.jsx
import React from 'react';
import PropTypes from 'prop-types'; 


const difficultyColor = { // 2. Type annotation Record<string, string> is removed
  Easy: 'bg-green-500',
  Moderate: 'bg-orange-500',
  Difficult: 'bg-red-500',
};

export default function TrailCard({ difficulty }) { // 3. Type annotation : TrailCardProps is removed
  return (
    <div className="border rounded-md h-48 flex items-center justify-center relative bg-gray-100">
      <span
        className={`absolute top-2 right-2 text-xs text-white px-2 py-1 rounded-full ${difficultyColor[difficulty]}`}
      >
        {difficulty}
      </span>
      <div className="text-gray-400">Image Placeholder</div>
    </div>
  );
}

// 4. Define propTypes for the component
TrailCard.propTypes = {
  difficulty: PropTypes.oneOf(['Easy', 'Moderate', 'Difficult']).isRequired,
};