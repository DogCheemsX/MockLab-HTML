import React, { useState, useEffect } from 'react';

interface TestCountdownModalProps {
  isOpen: boolean;
  testTitle: string;
  onClose: () => void;
  onComplete: () => void;
}

export const TestCountdownModal: React.FC<TestCountdownModalProps> = ({
  isOpen,
  testTitle,
  onClose,
  onComplete
}) => {
  const [step, setStep] = useState<'confirm' | 'countdown'>('confirm');
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!isOpen) {
      setStep('confirm');
      setCount(3);
      return;
    }

    if (step === 'confirm') {
      setCount(3);
      return;
    }

    setCount(3);
    const t1 = setTimeout(() => setCount(2), 1000);
    const t2 = setTimeout(() => setCount(1), 2000);
    const t3 = setTimeout(() => {
      setCount(0);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, step, onComplete]);

  if (!isOpen) return null;

  // Compute ring stroke offset for 3, 2, 1
  const strokeDashoffset = count === 3 ? 0 : count === 2 ? 108 : count === 1 ? 217 : 327;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-backdrop-enter select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="countdown-title"
    >
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-indigo-500/40 relative overflow-hidden text-center flex flex-col items-center gap-5 animate-modal-enter">
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {step === 'confirm' ? (
          <>
            {/* Heading */}
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-black uppercase tracking-widest shadow-sm">
                EXAM CONFIRMATION
              </span>
              <h2 id="countdown-title" className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                Are You Ready?
              </h2>
            </div>

            <div className="w-full space-y-2 my-1">
              <div className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-indigo-300 font-extrabold text-xs sm:text-sm truncate shadow-inner">
                {testTitle}
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Grab your rough sheet & pen before starting. Timer will begin as soon as your paper loads!
              </p>
            </div>

            {/* Confirmation Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setStep('countdown')}
                className="w-full sm:flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-glow-emerald transition-all border border-emerald-300 transform hover:scale-105 active:scale-95"
              >
                Yes, I'm Ready!
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl border border-slate-700 transition-all"
              >
                No, Not Yet 😅
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Heading */}
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-black uppercase tracking-widest shadow-sm">
                GET READY
              </span>
              <h2 id="countdown-title" className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                Starting Test<span className="inline-block animate-pulse text-indigo-400">...</span>
              </h2>
            </div>

            {/* Dynamic Countdown Circle */}
            <div className="relative w-36 h-36 flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="text-slate-800"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="text-indigo-500 transition-all duration-1000 ease-linear"
                  strokeWidth="8"
                  strokeDasharray="327"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                {count > 0 ? (
                  <span key={count} className="text-6xl font-black font-display text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-white to-emerald-300 animate-pulse drop-shadow-md">
                    {count}
                  </span>
                ) : (
                  <span className="text-3xl font-black font-display text-emerald-400 animate-bounce">
                    GO!
                  </span>
                )}
              </div>
            </div>

            {/* Test Name Badge */}
            <div className="w-full space-y-2">
              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 font-bold text-xs sm:text-sm truncate shadow-inner">
                {testTitle}
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Your exam session and question timer will begin immediately.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

TestCountdownModal.displayName = 'TestCountdownModal';
