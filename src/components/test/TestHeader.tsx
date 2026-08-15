import React from 'react';
import { formatTime } from '../../utils/formatters';

interface TestHeaderProps {
  timeLeft: number;
}

export const TestHeader: React.FC<TestHeaderProps> = React.memo(({ timeLeft }) => {
  const isWarning = timeLeft <= 600; // <= 10 mins
  const isCritical = timeLeft <= 300; // <= 5 mins

  return (
    <div className="flex justify-between items-center glass-panel p-4 rounded-t-2xl border-b border-slate-700/80 shadow-lg relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
          📝
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-white tracking-wide">MockLab Live CBT Portal</h2>
          <p className="text-[11px] text-slate-400">Official Exam Simulation Engine</p>
        </div>
      </div>

      <div
        className={`flex items-center gap-2 font-mono font-black text-lg sm:text-xl py-1.5 px-4 rounded-xl border transition-all ${
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
    </div>
  );
});

TestHeader.displayName = 'TestHeader';

