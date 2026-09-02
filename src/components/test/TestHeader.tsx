import React from 'react';
import { formatTime } from '../../utils/formatters';

interface TestHeaderProps {
  timeLeft: number;
  testTitle?: string;
  onExit?: () => void;
  onSubmit?: () => void;
}

export const TestHeader: React.FC<TestHeaderProps> = React.memo(({ timeLeft, testTitle, onExit, onSubmit }) => {
  const isWarning = timeLeft <= 600; // <= 10 mins
  const isCritical = timeLeft <= 300; // <= 5 mins

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 glass-panel p-4 rounded-t-2xl border-b border-slate-700/80 shadow-lg relative z-10">
      {/* Left: Dynamic Test Title & Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-base shrink-0 shadow-sm">
          📝
        </div>
        <div className="text-left">
          <h2 className="text-sm sm:text-base font-extrabold text-white tracking-wide line-clamp-1">
            {testTitle || 'MockLab Official CBT Exam'}
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">
            MockLab Official Entrance Test Runner
          </p>

        </div>
      </div>

      {/* Right: Timer & Action Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
        {/* Timer Badge */}
        <div
          className={`flex items-center gap-2 font-mono font-black text-base sm:text-lg py-1 px-3.5 rounded-xl border transition-all ${
            isCritical
              ? 'text-rose-400 bg-rose-950/40 border-rose-500/50 shadow-glow-rose animate-pulse'
              : isWarning
              ? 'text-amber-400 bg-amber-950/40 border-amber-500/50'
              : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40'
          }`}
          id="timer-display"
        >
          <span className="text-xs uppercase font-sans font-semibold tracking-wider opacity-75">Time:</span>
          {formatTime(timeLeft)}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 transition-all shadow-sm flex items-center gap-1"
              title="Cancel test and return to menu"
            >
              <span>✕</span> Exit Test
            </button>
          )}

          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              className="px-3.5 py-1.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/40 transition-all shadow-glow-emerald flex items-center gap-1"
            >
              <span>✓</span> Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

TestHeader.displayName = 'TestHeader';
