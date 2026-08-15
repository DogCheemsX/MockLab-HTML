import React from 'react';

export const Header: React.FC = React.memo(() => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-inner">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
        NTS NAT • ECAT • MDCAT • PIEAS
      </div>
      <img
        src="MockLab.png"
        alt="MockLab Logo"
        className="w-44 sm:w-52 h-auto mb-3 filter drop-shadow-[0_10px_25px_rgba(99,102,241,0.25)] transition-transform duration-300 hover:scale-105"
      />
      <p className="text-center text-slate-300 font-medium text-sm sm:text-base max-w-sm">
        Pakistan's premier computer-based test portal for top universities.
      </p>
    </div>
  );
});

Header.displayName = 'Header';

