import React from 'react';

export const LoadingSpinner: React.FC = React.memo(() => {
  return (
    <div id="screen-loading" className="w-full flex flex-col items-center justify-center text-center py-12">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
      <p className="text-gray-400 font-bold tracking-widest uppercase">Loading MockLab...</p>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
