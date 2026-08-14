import React, { useState } from 'react';
import { Question } from '../../types/test';

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

    return (
      <div className="bg-gray-800 p-6 md:p-8 rounded-b-xl min-h-[50vh] border-x-2 border-b-2 border-gray-700 shadow-lg">
        {/* Top Control Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center bg-gray-900 border-b-2 border-gray-700 pb-4 mb-6 rounded-lg p-4 shadow-inner gap-4">
          <div className="flex space-x-8">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Answered</p>
              <p className="text-lg font-bold text-green-400">
                {answeredCount} <span className="text-gray-500 text-sm">/ {totalQuestions}</span>
              </p>
            </div>
            <div className="text-center cursor-pointer hover:opacity-80" onClick={onOpenOverview}>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Review</p>
              <p className="text-lg font-bold text-yellow-400">{reviewCount}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={onOpenOverview}
              className="bg-indigo-600/20 text-indigo-400 border border-indigo-500 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm text-sm"
            >
              Grid Overview
            </button>
            <form onSubmit={handleJumpSubmit} className="flex items-center">
              <input
                type="number"
                min="1"
                max={totalQuestions}
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                className="w-14 px-2 py-2 rounded-l-lg bg-gray-800 border border-gray-600 text-white font-bold focus:outline-none focus:border-indigo-500 text-center"
                placeholder="#"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-r-lg font-bold text-white transition-colors shadow-sm text-sm border border-indigo-600"
              >
                Jump
              </button>
            </form>
            <button
              onClick={onJumpToNextSection}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg font-bold text-gray-200 transition-colors shadow-sm border border-gray-600 text-sm"
            >
              Next Section &raquo;
            </button>
          </div>
        </div>

        {/* Question Header & Review Toggle */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest">
            Question {questionIndex + 1} of {totalQuestions}
          </div>
          <button
            onClick={onToggleReview}
            className={`flex items-center space-x-1 text-sm font-bold px-4 py-2 rounded-full border-2 transition-colors ${
              isReview
                ? 'border-yellow-500 text-yellow-400 bg-yellow-900/20 shadow-[0_0_10px_rgba(234,179,8,0.3)]'
                : 'border-gray-600 text-gray-400 hover:text-white hover:border-gray-400'
            }`}
          >
            <span>{isReview ? '★ Marked for Review' : '☆ Mark for Review'}</span>
          </button>
        </div>

        {/* Question Text */}
        <h3 className="text-xl md:text-2xl font-semibold mb-8 text-white leading-relaxed whitespace-pre-line">
          {question.q}
        </h3>

        {/* Radio Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const activeStyle = isSelected
              ? 'border-indigo-500 bg-indigo-900/30'
              : 'border-gray-700 bg-gray-800 hover:bg-gray-700';

            return (
              <label
                key={idx}
                className={`flex items-center space-x-4 p-4 rounded-xl border-2 ${activeStyle} cursor-pointer transition-all`}
              >
                <input
                  type="radio"
                  name="option"
                  value={idx}
                  checked={isSelected}
                  onChange={() => onSelectOption(idx)}
                  className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 bg-gray-900 border-gray-600"
                />
                <span className="text-gray-200 font-medium text-lg">{opt}</span>
              </label>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between items-center border-t border-gray-700 pt-6">
          {questionIndex > 0 ? (
            <button
              onClick={onPrev}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition-colors"
            >
              &larr; Prev
            </button>
          ) : (
            <div />
          )}

          {questionIndex === totalQuestions - 1 ? (
            <button
              onClick={onSubmit}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition-colors shadow-lg"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={onNext}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-500 transition-colors shadow-lg"
            >
              Next &rarr;
            </button>
          )}
        </div>
      </div>
    );
  }
);

QuestionCard.displayName = 'QuestionCard';
