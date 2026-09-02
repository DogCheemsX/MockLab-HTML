import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { testData } from '../../data/testData';
import { UniversityKey, TestInstance } from '../../types/test';
import { UserProfile } from '../../types/auth';
import { UseTestSessionReturn } from '../../hooks/useTestSession';
import { getTestInstances, getQuestionsForTestInstance, generateOnDemandSimulation } from '../../services/testGenerator';
import { PremiumModal } from '../../components/modals/PremiumModal';

interface TestInfoScreenProps {
  testSession: UseTestSessionReturn;
  user?: User | null;
  userData?: UserProfile | null;
}

const LOGO_MAP: Record<string, string> = {
  COMSATS: '/logos/comsats.jpg',
  NTS: '/logos/nts.png',
  PIEAS: '/logos/pieas.png',
  AIR: '/logos/air.png',
  BAHRIA: '/logos/bahria.png',
  CUST: '/logos/cust.jpg'
};

export const TestInfoScreen: React.FC<TestInfoScreenProps> = React.memo(({ testSession, user, userData }) => {
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
  const logoUrl = LOGO_MAP[key] || '/logos/comsats.jpg';

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

  const handleStartFreshSimulation = () => {
    if (!isUserPremium) {
      setIsPremiumModalOpen(true);
      return;
    }

    const questions = generateOnDemandSimulation(typeId);
    if (questions.length === 0) {
      alert('No questions found for this test category.');
      return;
    }

    const durationMinutes = parseInt(infoData.time.split(' ')[0], 10) || 120;
    testSession.initSession(
      questions,
      key,
      typeId,
      `${typeName} (On-Demand Past Paper)`,
      durationMinutes
    );
    navigate('/test-runner?q=1');
  };

  return (
    <div id="screen-info" className="w-full max-w-6xl lg:max-w-7xl flex flex-col items-center">
      {/* Top Breadcrumb Header */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-5 mt-2 sm:mt-0">
        <button
          onClick={() => navigate(`/select-type/${uniKey}`)}
          className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-700/60 truncate"
        >
          <span>←</span> <span className="truncate">Back to Fields/Degrees</span>
        </button>
        <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 text-center truncate">
          Step 3 of 3 • Exam Overview & Papers
        </span>
      </div>

      {/* Universal PC Responsive 2-Column Horizontal Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start text-left">
        {/* Left Column: Exam Details, Metrics & Breakdown */}
        <div className="lg:col-span-5 flex flex-col items-start gap-5">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl p-1 bg-white/95 border border-slate-700/80 shadow-md shrink-0">
                <img src={logoUrl} alt={key} className="w-full h-full object-contain rounded" />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
                {key} Official Exam Pattern
              </div>
            </div>

            <h1 id="info-title" className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mb-2">
              {typeName}
            </h1>
            {isUserPremium ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                UNLIMITED FULL LENGTH PAST PAPERS UNLOCKED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span>🎁</span> 1 FREE TEST READY • UPGRADE FOR UNLIMITED
              </span>
            )}
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 gap-3 w-full">
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

          {/* Subject Breakdown Panel */}
          <div className="w-full glass-panel rounded-2xl p-5 shadow-xl border border-slate-700/60 text-left">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>📚</span> Subject Breakdown & Sequencing
            </h3>
            <div id="info-breakdown" className="space-y-2">
              {infoData.breakdown.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hero Generator Card & Practice Attempt Papers */}
        <div className="lg:col-span-7 flex flex-col items-start gap-5">
          {/* Hero On-Demand Generator Card */}
          <div className="w-full glass-panel rounded-3xl p-5 sm:p-6 border-2 border-amber-400/50 bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-purple-950/30 shadow-glow-amber text-left relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-widest shadow-sm">
                  ON-DEMAND PAST PAPER ENGINE
                </span>
                <h3 className="text-xl font-black font-display text-white">
                  Launch Fresh Past Paper
                </h3>
              </div>

              <button
                onClick={handleStartFreshSimulation}
                className={`px-5 py-3.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide shadow-glow-amber transition-all transform hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-2 border ${
                  isUserPremium
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 border-amber-300/60 font-black'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400/50'
                }`}
              >
                <span>{isUserPremium ? '🚀 LAUNCH FRESH PAST PAPER' : '🔒 UNLOCK UNLIMITED PAPERS'}</span>
              </button>
            </div>
          </div>

          {/* Test Instances List */}
          <div className="w-full text-left space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black font-display text-white">
                Full Length Past Papers
              </h3>
              {!isUserPremium && (
                <button
                  onClick={() => setIsPremiumModalOpen(true)}
                  className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition-all shrink-0"
                >
                  Get Premium Pass
                </button>
              )}
            </div>

            {testInstances.map((instance, idx) => {
              const isLocked = instance.isLocked;
              const isFree = instance.isFree;

              const buttonText = isLocked
                ? '🔒 UNLOCK PRO'
                : isFree
                ? 'START FREE TEST'
                : `LAUNCH ${instance.title.toUpperCase()}`;

              return (
                <div
                  key={instance.id}
                  onClick={() => handleStartInstance(instance, idx)}
                  className={`w-full rounded-2xl p-4 sm:p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 ${
                    isLocked
                      ? 'glass-panel bg-slate-900/60 border border-amber-500/30 hover:border-amber-400/60 hover:bg-slate-900/90 shadow-lg hover:scale-[1.01]'
                      : isFree
                      ? 'glass-panel bg-slate-900/80 border border-emerald-500/40 hover:border-emerald-400/80 hover:bg-slate-900/95 shadow-lg hover:shadow-glow-emerald hover:scale-[1.01]'
                      : 'glass-panel bg-gradient-to-r from-amber-950/20 via-slate-900/90 to-purple-950/20 border-2 border-amber-400/60 shadow-glow-amber hover:border-amber-300 hover:scale-[1.015]'
                  }`}
                >
                  {/* Left Side Details */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 border transition-transform group-hover:scale-105 ${
                        isLocked
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-glow-amber'
                          : isFree
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-glow-emerald'
                          : 'bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-glow-amber'
                      }`}
                    >
                      {isLocked ? '🔒' : '⚡'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-extrabold text-white text-base">
                          {instance.title}
                        </h4>
                        {!isFree && isUserPremium ? (
                          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 uppercase tracking-widest shadow-sm">
                            🔓 UNLOCKED PRO
                          </span>
                        ) : (
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                              isLocked
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            }`}
                          >
                            {instance.badgeText}
                          </span>
                        )}
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
                          : isFree
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/30'
                          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black border border-amber-300/60 shadow-glow-amber'
                      }`}
                    >
                      <span>{buttonText}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        isPremium={isUserPremium}
        user={user}
        userData={userData}
      />
    </div>
  );
});

TestInfoScreen.displayName = 'TestInfoScreen';
