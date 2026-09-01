import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { testData } from '../../data/testData';
import { UniversityKey, TestInstance } from '../../types/test';
import { UserProfile } from '../../types/auth';
import { UseTestSessionReturn } from '../../hooks/useTestSession';
import { getTestInstances, getQuestionsForTestInstance } from '../../services/testGenerator';
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

  const isUserPremium = userData?.isPremium === true;

  const testInstances = useMemo(() => {
    return getTestInstances(typeId, isUserPremium);
  }, [typeId, isUserPremium]);

  const handleStartInstance = (instance: TestInstance, instanceIndex: number) => {
    if (instance.isLocked) {
      setIsPremiumModalOpen(true);
      return;
    }

    const questions = getQuestionsForTestInstance(typeId, instanceIndex);
    if (questions.length === 0) {
      alert('No questions found for this test category.');
      return;
    }

    const durationMinutes = parseInt(infoData.time.split(' ')[0], 10) || 120;
    testSession.initSession(
      questions,
      key,
      typeId,
      `${typeName} (${instance.title})`,
      durationMinutes
    );
    navigate('/test-runner?q=1');
  };

  return (
    <div id="screen-info" className="w-full max-w-2xl flex flex-col items-center">
      {/* Top Breadcrumb Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(`/select-type/${uniKey}`)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60"
        >
          <span>←</span> Back to Streams
        </button>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Step 3 of 3 • Exam Overview & Tests
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
          🏛️ {key} Pattern
        </div>
        <h1 id="info-title" className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mb-2">
          {typeName}
        </h1>
        {isUserPremium ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span>👑</span> PREMIUM PASS ACTIVE • ALL TESTS UNLOCKED
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <span>🎁</span> 1 FREE TEST AVAILABLE
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
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
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
      <div className="w-full glass-panel rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-700/60 mb-8 text-left">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-2">
          <span>📚</span> Subject Breakdown
        </h3>
        <div id="info-breakdown" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {infoData.breakdown.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Test Instances Grid */}
      <div className="w-full mb-8 text-left">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black font-display text-white">
              Select Practice Test
            </h3>
            <p className="text-xs text-slate-400">
              Choose a test paper to start your practice.
            </p>
          </div>
          {!isUserPremium && (
            <button
              onClick={() => setIsPremiumModalOpen(true)}
              className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition-all shrink-0"
            >
              Get Premium Pass 👑
            </button>
          )}
        </div>

        <div className="space-y-3.5">
          {testInstances.map((instance, idx) => {
            const isLocked = instance.isLocked;

            return (
              <div
                key={instance.id}
                onClick={() => handleStartInstance(instance, idx)}
                className={`w-full rounded-2xl p-4 sm:p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isLocked
                    ? 'glass-panel bg-slate-900/60 border border-amber-500/30 hover:border-amber-400/60 hover:bg-slate-900/90 shadow-lg hover:shadow-glow-amber hover:scale-[1.01]'
                    : 'glass-panel bg-slate-900/80 border border-emerald-500/40 hover:border-emerald-400/80 hover:bg-slate-900/95 shadow-lg hover:shadow-glow-emerald hover:scale-[1.01]'
                }`}
              >
                {/* Left Side Details */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 border transition-transform group-hover:scale-105 ${
                      isLocked
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-glow-amber'
                        : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-glow-emerald'
                    }`}
                  >
                    {isLocked ? '🔒' : '⚡'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-extrabold text-white text-base">
                        {instance.title}
                      </h4>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                          isLocked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {instance.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {instance.description}
                    </p>
                  </div>
                </div>

                {/* Right Side Action */}
                <div className="flex items-center justify-end gap-3 shrink-0">
                  <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                    {instance.questionCount} MCQs
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartInstance(instance, idx);
                    }}
                    className={`text-xs font-extrabold py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center gap-1.5 ${
                      isLocked
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black border border-amber-400/40'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/30'
                    }`}
                  >
                    <span>{isLocked ? '🔒 UNLOCK' : 'START TEST'}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
});

TestInfoScreen.displayName = 'TestInfoScreen';
