import React from 'react';
import { getScoreMessage } from '../../utils/formatters';

interface TestResultScreenProps {
  score: number;
  totalQuestions: number;
  onReturnHome: () => void;
}

export const TestResultScreen: React.FC<TestResultScreenProps> = React.memo(
  ({ score, totalQuestions, onReturnHome }) => {
    const msg = getScoreMessage(score, totalQuestions);

    return (
      <div id="screen-result" className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-center text-green-400">
          Test Completed!
        </h1>
        <div className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl p-8 shadow-lg mb-8 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-wider mb-2">Your Score</p>
          <p id="final-score" className="text-6xl font-extrabold text-white mb-6">
            {score} / {totalQuestions}
          </p>
          <p id="score-msg" className="text-lg font-medium text-gray-300">
            {msg}
          </p>
        </div>
        <button
          onClick={onReturnHome}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all font-extrabold text-xl py-4 px-6 rounded-xl shadow-lg"
        >
          Return Home
        </button>
      </div>
    );
  }
);

TestResultScreen.displayName = 'TestResultScreen';
