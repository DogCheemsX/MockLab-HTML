import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

interface ThemeToggleProps {
  onOpenSettings?: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({ onOpenSettings }) => {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const handleToggle = () => {
    toggleTheme();
    const nextTheme = theme === 'dark' ? 'Light' : 'Dark';
    const icon = nextTheme === 'Light' ? '☀️' : '🌙';
    showToast(`Switched to ${nextTheme} Mode ${icon}`, 'info');
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      {onOpenSettings && (
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Open Settings"
          className="p-2 sm:px-3.5 sm:py-2 rounded-full border transition-all duration-300 flex items-center gap-1.5 text-xs font-bold shadow-lg backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transform hover:scale-105 active:scale-95 bg-slate-900/90 border-slate-700/80 text-slate-300 hover:text-white"
        >
          <span className="text-sm">⚙️</span>
          <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Settings</span>
        </button>
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="px-3.5 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 text-xs font-bold shadow-lg backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transform hover:scale-105 active:scale-95 bg-slate-900/90 border-slate-700/80 text-amber-300 hover:text-white"
      >
        <span className="text-sm">{theme === 'dark' ? '🌙' : '☀️'}</span>
        <span className="hidden sm:inline uppercase tracking-wider text-[11px]">
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    </div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
