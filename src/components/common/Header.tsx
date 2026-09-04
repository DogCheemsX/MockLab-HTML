import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const Header: React.FC = React.memo(() => {
  const { theme } = useTheme();
  const LOGOS = [
    { name: 'COMSATS', logo: '/logos/comsats.jpg' },
    { name: 'NTS', logo: '/logos/nts.png' },
    { name: 'PIEAS', logo: '/logos/pieas.png' },
    { name: 'Air', logo: '/logos/air.png' },
    { name: 'Bahria', logo: '/logos/bahria.png' },
    { name: 'CUST', logo: '/logos/cust.jpg' }
  ];

  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6">
      {/* Promotional University Logos Pill Bar */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 mb-5 shadow-lg backdrop-blur-md">
        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-indigo-400">
          Official Test Banks:
        </span>
        <div className="flex items-center gap-2">
          {LOGOS.map((u, idx) => (
            <div
              key={idx}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl p-1 bg-white/95 border border-slate-700/80 shadow-sm shrink-0 flex items-center justify-center transition-transform hover:scale-110"
              title={u.name}
            >
              <img src={u.logo} alt={u.name} className="w-full h-full object-contain rounded-lg" />
            </div>
          ))}
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
          + and more!
        </span>
      </div>

      {/* Brand Logo */}
      <img
        src={theme === 'light' ? '/MockLab-light.png' : '/MockLab.png'}
        alt="MockLab Logo"
        className="w-32 sm:w-52 h-auto mb-3 filter drop-shadow-[0_10px_25px_rgba(99,102,241,0.25)] transition-transform duration-300 hover:scale-105"
      />


      <p className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base max-w-md leading-relaxed">
        Pakistan's 1st all in one university entrance test platform
      </p>
    </div>
  );
});

Header.displayName = 'Header';
