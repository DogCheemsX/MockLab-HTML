import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UseTestSessionReturn } from '../../hooks/useTestSession';
import { getScoreMessage } from '../../utils/formatters';
import { getOfficialSectionTitle } from '../../utils/sectionUtils';

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

  const subjectBreakdown = React.useMemo(() => {
    if (!storedSession || !storedSession.activeQuestions) return [];
    const map: Record<string, { correct: number; total: number }> = {};

    storedSession.activeQuestions.forEach((q, idx) => {
      const officialTitle = getOfficialSectionTitle(storedSession.typeId, q.subject);
      if (!map[officialTitle]) {
        map[officialTitle] = { correct: 0, total: 0 };
      }
      map[officialTitle].total += 1;
      if (storedSession.userAnswers && storedSession.userAnswers[idx] === q.ans) {
        map[officialTitle].correct += 1;
      }
    });

    return Object.entries(map).map(([title, stats]) => ({
      title,
      correct: stats.correct,
      total: stats.total,
      pct: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    }));
  }, [storedSession]);

  const handleReturnHome = () => {
    clearSession();
    navigate('/select-university');
  };

  const handleGoDashboard = () => {
    clearSession();
    navigate('/');
  };

  return (
    <div id="screen-result" className="w-full max-w-6xl lg:max-w-7xl flex flex-col items-center py-4">
      {/* Header Banner */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
        🎉 Test Evaluation Completed
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-2 text-center">
        Exam Performance Report
      </h1>
      <p className="text-xs sm:text-sm text-slate-400 mb-8 text-center">{testName}</p>

      {/* Universal PC Responsive 2-Column Horizontal Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Left Column: Main Score Glass Card & Circular Badge */}
        <div className="lg:col-span-6 flex flex-col items-center w-full">
          <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-glass border border-slate-700/80 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Circular Percentage Badge */}
            <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400 transition-all duration-1200 ease-soothing"
                  strokeDasharray={`${percentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black font-display text-white">{percentage}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score Rate</span>
              </div>
            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl">
              <p id="score-msg" className="text-sm font-semibold text-indigo-300">
                {msg}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Score Breakdown Grid & Action Buttons */}
        <div className="lg:col-span-6 flex flex-col items-center gap-6 w-full">
          <div className="w-full glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4 text-left">
            <h3 className="text-base font-black font-display text-white mb-2">
              Official Section Breakdown
            </h3>

            <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 mb-4">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Correct Answers</p>
                <p id="final-score" className="text-2xl font-extrabold text-emerald-400">
                  {finalScore} <span className="text-slate-500 text-xs font-normal">/ {totalQuestions}</span>
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Evaluated</p>
                <p className="text-2xl font-extrabold text-white">{totalQuestions} MCQs</p>
              </div>
            </div>

            {/* Official Subject Breakdown Cards */}
            <div className="space-y-2.5">
              {subjectBreakdown.map((item, idx) => (
                <div key={idx} className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0"></span>
                    <span className="text-xs sm:text-sm font-bold text-white">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                      {item.correct}/{item.total} ({item.pct}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <button
              onClick={handleReturnHome}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-glow-indigo transition-all flex items-center justify-center gap-2 border border-indigo-400/30"
            >
              <span>🎯</span> Take Another Full Length Past Paper
            </button>
            <button
              onClick={handleGoDashboard}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm py-3.5 px-6 rounded-2xl transition-colors border border-slate-700"
            >
              ← Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

TestResultScreen.displayName = 'TestResultScreen';
