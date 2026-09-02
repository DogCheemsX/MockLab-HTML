import React from 'react';
import { Question } from '../../types/test';
import { MathText } from '../common/MathText';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedOption?: number;
  isReview: boolean;
  answeredCount: number;
  reviewCount: number;
  onSelectOption: (optionIndex: number) => void;
  onToggleReview: () => void;
  onJumpToQuestion: (index: number) => void;
  onJumpToNextSection: () => void;
  onPrevSection?: () => void;
  onOpenOverview: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

export const QuestionCard: React.FC<QuestionCardProps> = React.memo(
  ({
    question,
    questionIndex,
    totalQuestions,
    selectedOption,
    isReview,
    answeredCount,
    reviewCount,
    onSelectOption,
    onToggleReview,

    onJumpToNextSection,
    onPrevSection,
    onOpenOverview,
    onPrev,
    onNext,
    onSubmit
  }) => {
    return (
      <div className="w-full flex flex-col gap-4 py-3">
        {/* Sub-Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Answered: <b className="text-white font-bold">{answeredCount}</b>/{totalQuestions}
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Marked: <b className="text-white font-bold">{reviewCount}</b>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Section Jump Controls */}
            {onPrevSection && (
              <button
                type="button"
                onClick={onPrevSection}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
                title="Jump to previous section"
              >
                « Prev Section
              </button>
            )}
            <button
              type="button"
              onClick={onJumpToNextSection}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              title="Jump to next section"
            >
              Next Section »
            </button>
            <button
              type="button"
              onClick={onOpenOverview}
              className="text-xs font-bold text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/80 px-3 py-1 rounded-lg border border-indigo-500/30 transition-all flex items-center gap-1"
            >
              <span>📊</span> Grid Overview
            </button>
          </div>
        </div>

        {/* Question Container Card */}
        <div className="glass-panel p-4 sm:p-7 rounded-2xl border border-slate-700/80 shadow-2xl relative text-left">
          {/* Header Row: Index & Active Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] sm:text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
                Question {questionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold text-emerald-300 bg-emerald-950/60 px-3 sm:px-3.5 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Current Section: {question.subject || 'General'}
              </span>
            </div>

            <button
              onClick={onToggleReview}
              className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-3 py-1 sm:py-1.5 rounded-full border transition-all ${
                isReview
                  ? 'border-amber-500 text-amber-300 bg-amber-950/40 shadow-glow-amber'
                  : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 bg-slate-900/60'
              }`}
            >
              <span>{isReview ? '★ Marked' : '☆ Mark for Review'}</span>
            </button>
          </div>

          {/* Animated Question Body */}
          <div key={questionIndex} className="animate-page-enter">
            {/* Question Text */}
            <div className="text-base sm:text-xl md:text-2xl font-bold mb-5 sm:mb-8 text-white leading-relaxed">
              <MathText text={question.q} />
            </div>

            {/* Option Cards */}
            <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const letter = OPTION_LETTERS[idx] || (idx + 1).toString();

                return (
                  <div
                    key={idx}
                    onClick={() => onSelectOption(idx)}
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-350 ease-soothing active:scale-[0.99] ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/50 shadow-glow-indigo'
                        : 'border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all duration-350 ease-soothing ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md scale-105'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className={`text-sm sm:text-base font-medium transition-colors duration-300 ${isSelected ? 'text-white font-semibold' : 'text-slate-200'}`}>
                      <MathText text={opt} inline />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* Navigation Buttons Footer */}
        <div className="flex justify-between items-center border-t border-slate-800 pt-6 mt-4">
          {questionIndex > 0 ? (
            <button
              onClick={onPrev}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-sm transition-all border border-slate-700"
            >
              ← Previous
            </button>
          ) : (
            <div></div>
          )}

          {questionIndex === totalQuestions - 1 ? (
            <button
              onClick={onSubmit}
              className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-extrabold text-sm transition-all shadow-glow-emerald border border-emerald-400/30"
            >
              Submit Test 🏁
            </button>
          ) : (
            <button
              onClick={onNext}
              className="px-7 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl font-extrabold text-sm transition-all shadow-glow-indigo border border-indigo-400/30"
            >
              Next Question →
            </button>
          )}
        </div>
      </div>
    );
  }
);

QuestionCard.displayName = 'QuestionCard';
