import React from 'react';

export const Header: React.FC = React.memo(() => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="MockLab.png"
        alt="MockLab Logo"
        className="w-48 sm:w-56 h-auto mb-3 drop-shadow-2xl mx-auto transition-transform hover:scale-105"
      />
      <p className="text-center text-indigo-300 font-bold text-sm sm:text-base mb-8 uppercase tracking-widest px-2 drop-shadow-md">
        Pakistan's ultimate <br className="sm:hidden" /> All in One Entry Test Platform!
      </p>
    </div>
  );
});

Header.displayName = 'Header';
