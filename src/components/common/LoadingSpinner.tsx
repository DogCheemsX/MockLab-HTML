import React from 'react';

export const LoadingSpinner: React.FC = React.memo(() => {
  return (
    <div id="screen-loading" className="min-h-[60vh] w-full flex flex-col items-center justify-center text-center p-6">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping"></div>
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-emerald-400 border-r-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-300 font-semibold tracking-wider text-sm uppercase animate-pulse">Initializing MockLab...</p>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

