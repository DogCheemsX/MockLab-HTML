import React, { useState, useEffect } from 'react';
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
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
      document.removeEventListener('webkitfullscreenchange', handleFSChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        (document.documentElement as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white border border-slate-200 shadow-sm text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 p-4 rounded-t-2xl relative z-10">
      {/* Left: Dynamic Test Title & Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-600/20 dark:border-indigo-500/30 dark:text-indigo-400 flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
          📝
        </div>
        <div className="text-left">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-wide line-clamp-1">
            {testTitle || 'MockLab Official CBT Exam'}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            MockLab Official Entrance Test Runner
          </p>
        </div>
      </div>

      {/* Right: Timer & Action Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
        {/* Timer Badge */}
        <div
          className={`flex items-center gap-2 font-mono font-bold text-base sm:text-lg py-1 px-3.5 rounded-xl border transition-all ${
            isCritical
              ? 'bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400 shadow-sm animate-pulse'
              : isWarning
              ? 'bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400'
          }`}
          id="timer-display"
        >
          <span className="text-xs uppercase font-sans font-semibold tracking-wider opacity-75">Time:</span>
          {formatTime(timeLeft)}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 dark:text-indigo-300 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 dark:border-indigo-500/40 transition-all shadow-sm flex items-center gap-1.5"
            title={isFullscreen ? "Exit Fullscreen Mode" : "Enter Fullscreen Mode"}
          >
            {isFullscreen ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 9L4 4m0 0l4 0m-4 0l0 4m11 5l5 5m0 0l-4 0m4 0l0-4M9 15l-5 5m0 0l4 0m-4 0l0-4m11-11l5-5m0 0l-4 0m4 0l0 4" />
                </svg>
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>

          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 dark:text-rose-300 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:border-rose-500/40 transition-all shadow-sm flex items-center gap-1"
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

