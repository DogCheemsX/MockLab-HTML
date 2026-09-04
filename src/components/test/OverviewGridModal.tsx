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
      <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-backdrop-enter overflow-y-auto">
        <div className="bg-white border border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-700/80 rounded-3xl p-5 sm:p-8 w-full max-w-3xl my-auto max-h-[88vh] sm:max-h-[90vh] overflow-y-auto relative animate-modal-enter">
          <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Question Navigator Grid</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Click any question number to jump directly</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 font-bold text-sm bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:text-slate-400 dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              ✕ Close
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-xs font-semibold justify-center bg-slate-50 border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 p-3 rounded-2xl">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <span className="w-3 h-3 bg-emerald-500 rounded-md"></span> Answered ({Object.keys(userAnswers).length})
            </span>
            <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
              <span className="w-3 h-3 bg-amber-500 rounded-md"></span> Marked ({Object.values(reviewStatus).filter(Boolean).length})
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-md"></span> Remaining ({totalQuestions - Object.keys(userAnswers).length})
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5">
            {Array.from({ length: totalQuestions }).map((_, i) => {
              const isReviewed = reviewStatus[i];
              const isAnswered = userAnswers[i] !== undefined;
              const isCurrent = i === currentQIndex;

              let styleClasses = 'w-full aspect-square rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center transition-all border ';

              if (isReviewed) {
                styleClasses += 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/50 shadow-sm';
              } else if (isAnswered) {
                styleClasses += 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/50 shadow-sm';
              } else {
                styleClasses += 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-white';
              }

              if (isCurrent) {
                styleClasses += ' ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-105';
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

