import React from 'react';
import { TestInfo } from '../../types/test';

interface TestInfoScreenProps {
  title: string;
  info: TestInfo;
  onStartTest: () => void;
  onBack: () => void;
}

export const TestInfoScreen: React.FC<TestInfoScreenProps> = React.memo(
  ({ title, info, onStartTest, onBack }) => {
    return (
      <div id="screen-info" className="w-full max-w-md flex flex-col items-center">
        <button
          onClick={onBack}
          className="self-start mb-6 text-sm font-bold text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h1 id="info-title" className="text-3xl font-extrabold mb-6 tracking-tight text-center text-indigo-400">
          {title}
        </h1>
        <div className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl p-6 shadow-lg mb-8 text-left">
          <div className="mb-4">
            <span className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Duration</span>
            <span id="info-time" className="text-lg font-bold text-gray-100">
              {info.time}
            </span>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Total Marks</span>
            <span id="info-marks" className="text-lg font-bold text-gray-100">
              {info.marks}
            </span>
          </div>
          <div>
            <span className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Subject Breakdown</span>
            <ul id="info-breakdown" className="list-none space-y-1 text-md font-medium text-gray-300">
              {info.breakdown.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={onStartTest}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all font-extrabold text-xl py-4 px-6 rounded-xl shadow-lg"
        >
          START TEST
        </button>
      </div>
    );
  }
);

TestInfoScreen.displayName = 'TestInfoScreen';
