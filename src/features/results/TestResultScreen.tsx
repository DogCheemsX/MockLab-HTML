import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UseTestSessionReturn } from '../../hooks/useTestSession';
import { getScoreMessage } from '../../utils/formatters';

interface TestResultScreenProps {
  testSession: UseTestSessionReturn;
}

export const TestResultScreen: React.FC<TestResultScreenProps> = React.memo(({ testSession }) => {
  const navigate = useNavigate();
  const { score, storedSession, clearSession } = testSession;

  const finalScore = score || storedSession?.score || 0;
  const totalQuestions = storedSession?.activeQuestions?.length || 0;
  const testName = storedSession?.typeName || 'Entry Test';

  if (!storedSession && totalQuestions === 0) {
    return <Navigate to="/select-university" replace />;
  }

  const percentage = totalQuestions > 0 ? Math.round((finalScore / totalQuestions) * 100) : 0;
  const msg = getScoreMessage(finalScore, totalQuestions);

  const handleReturnHome = () => {
    clearSession();
    navigate('/select-university');
  };

  const handleGoDashboard = () => {
    clearSession();
    navigate('/');
  };

  return (
    <div id="screen-result" className="w-full max-w-xl flex flex-col items-center py-4">
      {/* Header Banner */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
        🎉 Test Evaluation Completed
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-2 text-center">
        Exam Performance Report
      </h1>
      <p className="text-xs text-slate-400 mb-8 text-center">{testName}</p>

      {/* Main Score Glass Card */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-glass border border-slate-700/80 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Circular Percentage Badge */}
        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-800"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-400 transition-all duration-1000 ease-out"
              strokeDasharray={`${percentage}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black font-display text-white">{percentage}%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score Rate</span>
          </div>
        </div>

        {/* Metrics breakdown grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Correct Answers</p>
            <p id="final-score" className="text-xl font-extrabold text-emerald-400">
              {finalScore} <span className="text-slate-500 text-xs font-normal">/ {totalQuestions}</span>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Evaluated</p>
            <p className="text-xl font-extrabold text-white">{totalQuestions} MCQs</p>
          </div>
        </div>

        {/* Score message feedback */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
          <p id="score-msg" className="text-sm font-semibold text-indigo-300">
            {msg}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={handleReturnHome}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-glow-indigo transition-all flex items-center justify-center gap-2 border border-indigo-400/30"
        >
          <span>🎯</span> Take Another Test
        </button>
        <button
          onClick={handleGoDashboard}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm py-3.5 px-6 rounded-2xl transition-colors border border-slate-700"
        >
          ← Return to Dashboard
        </button>
      </div>
    </div>
  );
});

TestResultScreen.displayName = 'TestResultScreen';

