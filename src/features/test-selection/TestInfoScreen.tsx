import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { testData } from '../../data/testData';
import { questionBank } from '../../data/questionBank';
import { UniversityKey } from '../../types/test';
import { UserProfile } from '../../types/auth';
import { UseTestSessionReturn } from '../../hooks/useTestSession';
import { isTestUnlocked } from '../../constants/config';
import { PremiumModal } from '../../components/modals/PremiumModal';

interface TestInfoScreenProps {
  testSession: UseTestSessionReturn;
  userData?: UserProfile | null;
}

export const TestInfoScreen: React.FC<TestInfoScreenProps> = React.memo(({ testSession, userData }) => {
  const { uniKey, typeId } = useParams<{ uniKey: string; typeId: string }>();
  const navigate = useNavigate();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  const key = uniKey as UniversityKey;
  const uniData = testData[key];

  if (!uniData || !typeId) {
    return <Navigate to="/select-university" replace />;
  }

  const selectedOpt = uniData.options.find((o) => o.id === typeId);
  const typeName = selectedOpt ? selectedOpt.name : typeId;
  const infoData = uniData.info || (uniData.infoMap ? uniData.infoMap[typeId] : null);

  if (!infoData) {
    return <Navigate to={`/select-type/${uniKey}`} replace />;
  }

  const isUnlocked = isTestUnlocked(typeId, userData?.isPremium);

  const handleStartTest = () => {
    if (!isUnlocked) {
      setIsPremiumModalOpen(true);
      return;
    }

    const questions = questionBank[typeId] || [];
    if (questions.length === 0) {
      alert('No questions found for this test category.');
      return;
    }

    const durationMinutes = parseInt(infoData.time.split(' ')[0], 10) || 120;
    testSession.initSession(questions, key, typeId, typeName, durationMinutes);
    navigate('/test-runner?q=1');
  };

  return (
    <div id="screen-info" className="w-full max-w-xl flex flex-col items-center">
      {/* Top Breadcrumb Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(`/select-type/${uniKey}`)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60"
        >
          <span>←</span> Back to Stream Selection
        </button>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Step 3 of 3 • Exam Overview
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
          🏛️ {key} Official Pattern
        </div>
        <h1 id="info-title" className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mb-2">
          {typeName}
        </h1>
        {isUnlocked ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span>✓</span> FREE ACCESS TEST
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <span>🔒</span> PREMIUM PASS REQUIRED
          </span>
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        <div className="glass-card p-4 rounded-2xl border border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg shrink-0 border border-indigo-500/30">
            ⏱️
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Exam Duration</p>
            <p id="info-time" className="text-base font-extrabold text-white">
              {infoData.time}
            </p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0 border border-emerald-500/30">
            🎯
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Marks</p>
            <p id="info-marks" className="text-base font-extrabold text-white">
              {infoData.marks}
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown Panel */}
      <div className="w-full glass-panel rounded-2xl p-6 shadow-xl border border-slate-700/60 mb-8 text-left">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span>📚</span> Subject & Question Breakdown
        </h3>
        <ul id="info-breakdown" className="space-y-2.5">
          {infoData.breakdown.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>

        {/* Instructions */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Exam Instructions</h4>
          <div className="space-y-1.5 text-xs text-slate-400">
            <p className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Once started, the timer cannot be paused.
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> You can mark questions for review and return later.
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Test will auto-submit when the countdown expires.
            </p>
          </div>
        </div>
      </div>

      {isUnlocked ? (
        <button
          onClick={handleStartTest}
          className="w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-lg py-4 px-6 rounded-2xl shadow-glow-emerald transition-all transform hover:-translate-y-0.5 border border-emerald-400/30 flex items-center justify-center gap-3"
        >
          <span>⚡</span> START TEST NOW
        </button>
      ) : (
        <button
          onClick={() => setIsPremiumModalOpen(true)}
          className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-lg py-4 px-6 rounded-2xl shadow-glow-amber transition-all transform hover:-translate-y-0.5 border border-amber-400/40 flex items-center justify-center gap-3"
        >
          <span>👑</span> UNLOCK WITH PREMIUM PASS
        </button>
      )}

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
});

TestInfoScreen.displayName = 'TestInfoScreen';

