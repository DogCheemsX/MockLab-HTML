import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UniPathMatcherScreenProps {
  onBackToHome?: () => void;
}

export const UniPathMatcherScreen: React.FC<UniPathMatcherScreenProps> = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 text-center">
      {/* Coming Soon Card Container */}
      <div className="w-full bg-white dark:bg-slate-900/90 border-2 border-amber-300 dark:border-amber-500/40 shadow-2xl rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center animate-page-enter">
        {/* Decorative Ambient Glow Effects */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Feature Icon Badge */}
        <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 border-2 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 flex items-center justify-center text-4xl font-black mb-6 shadow-md">
          🎯
        </div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          FEATURE UNDER MAINTENANCE
        </div>

        {/* Header Title */}
        <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white tracking-tight mb-2">
          University Eligibility Checker
        </h1>

        {/* Coming Soon Highlight */}
        <div className="inline-block px-4 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-extrabold text-sm sm:text-base mb-4 border border-amber-200 dark:border-amber-500/30">
          ✨ COMING SOON ✨
        </div>

        {/* Description Text */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed mb-8 font-medium">
          We are currently updating and fine-tuning our university eligibility criteria, aggregate formulas, and program rules. This tool will be available soon!
        </p>

        {/* Return to Dashboard Action Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-glow-indigo transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 border border-indigo-400/30 cursor-pointer"
        >
          <span>← Back to Home</span>
        </button>
      </div>
    </div>
  );
});

UniPathMatcherScreen.displayName = 'UniPathMatcherScreen';
