import React from 'react';
import { UserAnswers, ReviewStatus } from '../../types/test';

interface OverviewGridModalProps {
  totalQuestions: number;
  currentQIndex: number;
  userAnswers: UserAnswers;
  reviewStatus: ReviewStatus;
  isOpen: boolean;
  onSelectQuestion: (index: number) => void;
  onClose: () => void;
}

export const OverviewGridModal: React.FC<OverviewGridModalProps> = React.memo(
  ({ totalQuestions, currentQIndex, userAnswers, reviewStatus, isOpen, onSelectQuestion, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-slate-700/80 shadow-2xl relative">
          <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Question Navigator Grid</h2>
              <p className="text-xs text-slate-400">Click any question number to jump directly</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white font-bold text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              ✕ Close
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-xs font-semibold justify-center bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 bg-emerald-500 rounded-md"></span> Answered ({Object.keys(userAnswers).length})
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-3 bg-amber-500 rounded-md"></span> Marked ({Object.values(reviewStatus).filter(Boolean).length})
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 bg-slate-700 rounded-md"></span> Remaining ({totalQuestions - Object.keys(userAnswers).length})
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5">
            {Array.from({ length: totalQuestions }).map((_, i) => {
              const isReviewed = reviewStatus[i];
              const isAnswered = userAnswers[i] !== undefined;
              const isCurrent = i === currentQIndex;

              let styleClasses = 'w-full aspect-square rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center transition-all border ';

              if (isReviewed) {
                styleClasses += 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-glow-amber';
              } else if (isAnswered) {
                styleClasses += 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-glow-emerald';
              } else {
                styleClasses += 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white';
              }

              if (isCurrent) {
                styleClasses += ' ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950 scale-105';
              }

              return (
                <button
                  key={i}
                  className={styleClasses}
                  onClick={() => {
                    onSelectQuestion(i);
                    onClose();
                  }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

OverviewGridModal.displayName = 'OverviewGridModal';

