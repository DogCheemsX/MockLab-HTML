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
      <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto border-2 border-gray-600 shadow-2xl">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-white">Test Overview</h2>
            <button onClick={onClose} className="text-red-400 font-extrabold hover:text-red-300 text-lg">
              ✕ Close
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mb-6 text-xs font-bold uppercase tracking-wider justify-center">
            <span className="flex items-center gap-1 text-green-400">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div> Answered
            </span>
            <span className="flex items-center gap-1 text-yellow-400">
              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> Marked for Review
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <div className="w-3 h-3 bg-gray-600 rounded-sm"></div> Unanswered
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
            {Array.from({ length: totalQuestions }).map((_, i) => {
              const isReviewed = reviewStatus[i];
              const isAnswered = userAnswers[i] !== undefined;

              let baseClasses =
                'w-full aspect-square rounded-lg font-bold flex items-center justify-center transition-transform hover:scale-110 shadow-sm border ';
              if (isReviewed) {
                baseClasses += 'bg-yellow-500 text-yellow-900 border-yellow-600';
              } else if (isAnswered) {
                baseClasses += 'bg-green-500 text-white border-green-600';
              } else {
                baseClasses += 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600';
              }

              if (i === currentQIndex) {
                baseClasses += ' ring-2 ring-white ring-offset-2 ring-offset-gray-800';
              }

              return (
                <button
                  key={i}
                  className={baseClasses}
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
