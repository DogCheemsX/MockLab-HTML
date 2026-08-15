import React, { useState } from 'react';
import { Question } from '../../types/test';
import { MathText } from '../common/MathText';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedOption: number | undefined;
  isReview: boolean;
  answeredCount: number;
  reviewCount: number;
  onSelectOption: (optionIndex: number) => void;
  onToggleReview: () => void;
  onJumpToQuestion: (index: number) => void;
  onJumpToNextSection: () => void;
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
    onJumpToQuestion,
    onJumpToNextSection,
    onOpenOverview,
    onPrev,
    onNext,
    onSubmit
  }) => {
    const [jumpInput, setJumpInput] = useState('');

    const handleJumpSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const qNum = parseInt(jumpInput, 10);
      if (!isNaN(qNum) && qNum >= 1 && qNum <= totalQuestions) {
        onJumpToQuestion(qNum - 1);
        setJumpInput('');
      }
    };

    const percentComplete = Math.round(((questionIndex + 1) / totalQuestions) * 100);

    return (
      <div className="glass-panel p-6 sm:p-8 rounded-b-2xl border-x border-b border-slate-700/80 shadow-glass min-h-[55vh] flex flex-col justify-between">
        <div>
          {/* Top Control Bar & Stats */}
          <div className="flex flex-col lg:flex-row justify-between items-center bg-slate-900/90 border border-slate-800 p-4 rounded-xl mb-6 shadow-inner gap-4">
            <div className="flex items-center space-x-6">
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Answered</p>
                <p className="text-base font-extrabold text-emerald-400">
                  {answeredCount} <span className="text-slate-500 text-xs font-normal">/ {totalQuestions}</span>
                </p>
              </div>
              <div className="h-6 w-px bg-slate-800"></div>
              <div className="text-left cursor-pointer hover:opacity-80 transition-opacity" onClick={onOpenOverview}>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Review</p>
                <p className="text-base font-extrabold text-amber-400">{reviewCount}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2 w-full lg:w-auto">
              <button
                onClick={onOpenOverview}
                className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 px-3.5 py-1.5 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5"
              >
                <span>📊</span> Grid Overview
              </button>

              <form onSubmit={handleJumpSubmit} className="flex items-center">
                <input
                  type="number"
                  min="1"
                  max={totalQuestions}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  className="w-12 px-2 py-1.5 rounded-l-lg bg-slate-950 border border-slate-700 text-white font-bold focus:outline-none focus:border-indigo-500 text-center text-xs"
                  placeholder="#"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-r-lg font-bold text-white transition-colors text-xs border border-indigo-600"
                >
                  Jump
                </button>
              </form>

              <button
                onClick={onJumpToNextSection}
                className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg font-bold text-slate-300 transition-colors border border-slate-700 text-xs"
              >
                Next Sec »
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>

          {/* Question Header & Review Toggle */}
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
                Question {questionIndex + 1} of {totalQuestions}
              </span>
            </div>

            <button
              onClick={onToggleReview}
              className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                isReview
                  ? 'border-amber-500 text-amber-300 bg-amber-950/40 shadow-glow-amber'
                  : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 bg-slate-900/60'
              }`}
            >
              <span>{isReview ? '★ Marked' : '☆ Mark for Review'}</span>
            </button>
          </div>

          {/* Question Text */}
          <div className="text-lg sm:text-xl md:text-2xl font-bold mb-8 text-white leading-relaxed">
            <MathText text={question.q} />
          </div>

          {/* Option Cards */}
          <div className="space-y-3 mb-8">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const letter = OPTION_LETTERS[idx] || (idx + 1).toString();

              return (
                <div
                  key={idx}
                  onClick={() => onSelectOption(idx)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 shadow-glow-indigo'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {letter}
                  </div>
                  <span className={`text-base font-medium transition-colors ${isSelected ? 'text-white font-semibold' : 'text-slate-200'}`}>
                    <MathText text={opt} inline />
                  </span>
                </div>
              );
            })}
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

