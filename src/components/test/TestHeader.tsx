import React from 'react';
import { formatTime } from '../../utils/formatters';

interface TestHeaderProps {
  timeLeft: number;
}

export const TestHeader: React.FC<TestHeaderProps> = React.memo(({ timeLeft }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 border-b-2 border-gray-700 p-4 rounded-t-xl shadow-md z-10 relative">
      <h2 className="text-xl font-bold text-gray-100">MockLab Test</h2>
      <div
        className="text-2xl font-mono font-bold text-red-400 bg-red-900/30 py-1 px-3 rounded-lg border border-red-900/50"
        id="timer-display"
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
});

TestHeader.displayName = 'TestHeader';
