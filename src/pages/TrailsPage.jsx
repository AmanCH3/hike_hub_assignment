import React, { useState } from 'react';
import { useAdminTrail } from '../hooks/admin/useAdminTrail';
import TrailFilterPanel from '../features/trails/TrailFilterPanel';

const initialFilters = {
  page: 1,
  limit: 10,
  search: '',
  maxDistance: 20,
  maxElevation: 1500,
  maxDuration: 8,
  difficulty: 'All',
};

// Trail Card Component
const TrailCard = ({ trail }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'difficult': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDuration = (duration) => {
    if (duration?.min && duration?.max) {
      return `${duration.min}-${duration.max}h`;
    } else if (duration?.min) {
      return `${duration.min}h+`;
    } else if (duration?.max) {
      return `Up to ${duration.max}h`;
    }
    return 'Duration varies';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating || 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return stars;
  };

  const getSeasonEmoji = (season) => {
    switch (season?.toLowerCase()) {
      case 'spring': return '🌸';
      case 'summer': return '☀️';
      case 'fall': case 'autumn': return '🍂';
      case 'winter': return '❄️';
      default: return '🌿';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100">
        {trail.images && trail.images.length > 0 ? (
          <>
            <img
              src={trail.images[0]}
              alt={trail.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                e.target.parentElement.innerHTML = '<div class="text-gray-400"><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>';
              }}
            />
            {trail.images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-sm font-medium">
                +{trail.images.length - 1} photos
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
            </svg>
          </div>
        )}
        
        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(trail.difficult)}`}>
            {trail.difficult || 'Unknown'}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-1">{trail.name}</h3>
          {trail.location && (
            <p className="text-gray-600 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              {trail.location}
            </p>
          )}
        </div>

        {/* Description */}
        {trail.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">{trail.description}</p>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="font-bold text-lg text-blue-600">{trail.distance || 'N/A'}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Distance (km)</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-green-600">{trail.elevation || 'N/A'}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Elevation (m)</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-purple-600">{formatDuration(trail.duration)}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">Duration</div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <div className="flex">{renderStars(trail.averageRating)}</div>
            <span className="text-sm text-gray-600 ml-2">
              {trail.averageRating ? trail.averageRating.toFixed(1) : 'No rating'}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {trail.numRatings || 0} review{(trail.numRatings || 0) !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Participants */}
        {trail.participants && trail.participants.length > 0 && (
          <div className="flex items-center mb-4">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
            <span className="text-sm text-gray-600">
              {trail.participants.length} participant{trail.participants.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Features */}
        {trail.features && trail.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {trail.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">
                  {feature}
                </span>
              ))}
              {trail.features.length > 3 && (
                <span className="inline-block bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">
                  +{trail.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Seasons */}
        {trail.seasons && trail.seasons.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Best Seasons</p>
            <div className="flex flex-wrap gap-2">
              {trail.seasons.map((season, index) => (
                <span key={index} className="inline-flex items-center bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
                  <span className="mr-1">{getSeasonEmoji(season)}</span>
                  {season}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            View Details
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages, hasNext, hasPrev } = pagination;

  if (!totalPages || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

// Main TrailListPage Component
export default function TrailListPage() {
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  
  const { trails, pagination, isLoading, isError, error } = useAdminTrail(activeFilters);

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setActiveFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Trails</h1>
          <p className="text-gray-600">Find your perfect hiking adventure</p>
        </div>

        {/* Filter Panel */}
        <TrailFilterPanel onApplyFilters={handleApplyFilters} initialValues={initialFilters} />

        {/* Results Section */}
        <div className="mt-8">
          {/* Results Header */}
          {!isLoading && !isError && (
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {trails.length} of {pagination.totalTrails || 0} trails
              </p>
              {pagination.totalPages > 1 && (
                <p className="text-sm text-gray-500">
                  Page {pagination.currentPage || 1} of {pagination.totalPages || 1}
                </p>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="ml-4 text-gray-600">Loading trails...</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 mb-2">
                <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Trails</h3>
              <p className="text-red-600">{error?.message || 'Something went wrong. Please try again.'}</p>
            </div>
          )}

          {/* Trails Grid */}
          {!isLoading && !isError && (
            <>
              {trails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trails.map(trail => (
                    <TrailCard key={trail._id} trail={trail} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No trails found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                </div>
              )}

              {/* Pagination */}
              <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}