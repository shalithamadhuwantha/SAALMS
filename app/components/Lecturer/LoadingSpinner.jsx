// LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;
