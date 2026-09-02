import React from 'react';

interface ExitConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirmExit: () => void;
}

export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = React.memo(({ isOpen, onCancel, onConfirmExit }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border-2 border-rose-500/40 shadow-glow-rose relative overflow-hidden text-center bg-gradient-to-br from-rose-950/30 via-slate-900/95 to-slate-950/90 transition-all duration-300 ease-out transform animate-page-enter"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-modal-title"
      >
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-glow-rose">
          ⚠️
        </div>

        <h2 id="exit-modal-title" className="text-xl sm:text-2xl font-black font-display text-white tracking-tight mb-2">
          Exit Exam Session?
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          Are you sure you want to leave this test? All your current answer selections and progress will be lost.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all border border-slate-700"
          >
            Resume Exam
          </button>
          <button
            type="button"
            onClick={onConfirmExit}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-glow-rose border border-rose-400/40"
          >
            Yes, Exit Test
          </button>
        </div>
      </div>
    </div>
  );
});

ExitConfirmModal.displayName = 'ExitConfirmModal';
