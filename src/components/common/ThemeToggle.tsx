import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UserProfile } from '../../types/auth';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

interface ThemeToggleProps {
  user?: User | null;
  userData?: UserProfile | null;
  onOpenSettings?: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({ user, userData, onOpenSettings }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const handleToggle = () => {
    toggleTheme();
    const nextTheme = theme === 'dark' ? 'Light' : 'Dark';
    const icon = nextTheme === 'Light' ? '☀️' : '🌙';
    showToast(`Switched to ${nextTheme} Mode ${icon}`, 'info');
  };

  const displayName = userData?.name || user?.displayName || user?.email?.split('@')[0] || 'Student';
  const initial = displayName.charAt(0).toUpperCase();
  const isPremium = userData?.isPremium === true;

  return (
    <>
      {/* Subtle Persistent Brand Logo on Top Left */}
      <div
        onClick={() => navigate('/')}
        className="fixed top-2.5 left-2.5 sm:top-4 sm:left-4 z-40 flex items-center gap-2 cursor-pointer opacity-85 hover:opacity-100 transition-all group"
        title="MockLab Entry Test Portal Home"
      >
        <img
          src="/MockLab.png"
          alt="MockLab"
          className="h-6 sm:h-9 w-auto object-contain drop-shadow-[0_4px_10px_rgba(99,102,241,0.25)] group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Header Profile, Settings & Theme Controls on Top Right */}
      <div className="fixed top-2.5 right-2.5 sm:top-4 sm:right-4 z-40 flex items-center gap-1.5 sm:gap-2 max-w-[90vw]">

        {/* Persistent User Profile Header Indicator */}
        {user && (
          <div
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full glass-panel border border-slate-700/80 shadow-lg backdrop-blur-xl cursor-pointer hover:border-indigo-500/50 transition-all group"
            title={`Logged in as ${displayName}`}
          >
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-indigo-500/40"
                />
              ) : (
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-sm ${isPremium ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 shadow-glow-amber' : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-glow-indigo'}`}>
                  {initial}
                </div>
              )}
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${isPremium ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                {displayName}
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                {isPremium ? 'PRO Pass' : 'Free Member'}
              </span>
            </div>

            {isPremium ? (
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-widest hidden sm:inline-block">
                PRO
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase tracking-widest hidden sm:inline-block">
                Free
              </span>
            )}
          </div>
        )}

        {/* Settings Button */}
        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Open Settings"
            className="p-2 sm:px-3 sm:py-2 rounded-full border transition-all duration-300 flex items-center gap-1.5 text-xs font-bold shadow-lg backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transform hover:scale-105 active:scale-95 bg-slate-900/90 border-slate-700/80 text-slate-300 hover:text-white"
          >
            <span className="text-sm">⚙️</span>
            <span className="hidden lg:inline uppercase tracking-wider text-[11px]">Settings</span>
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="px-3 py-2 rounded-full border transition-all duration-300 flex items-center gap-1.5 text-xs font-bold shadow-lg backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transform hover:scale-105 active:scale-95 bg-slate-900/90 border-slate-700/80 text-amber-300 hover:text-white"
        >
          <span className="text-sm">{theme === 'dark' ? '🌙' : '☀️'}</span>
          <span className="hidden lg:inline uppercase tracking-wider text-[11px]">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
    </>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
