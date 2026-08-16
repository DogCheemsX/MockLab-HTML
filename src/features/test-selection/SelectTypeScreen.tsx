import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { testData } from '../../data/testData';
import { UniversityKey } from '../../types/test';
import { UserProfile } from '../../types/auth';
import { isTestUnlocked } from '../../constants/config';
import { PremiumModal } from '../../components/modals/PremiumModal';

interface SelectTypeScreenProps {
  userData: UserProfile | null;
}

export const SelectTypeScreen: React.FC<SelectTypeScreenProps> = React.memo(({ userData }) => {
  const { uniKey } = useParams<{ uniKey: string }>();
  const navigate = useNavigate();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  const key = uniKey as UniversityKey;
  const uniData = testData[key];

  if (!uniData) {
    return <Navigate to="/select-university" replace />;
  }

  const isUserPremium = userData?.isPremium === true;

  const handleSelectType = (typeId: string) => {
    if (!isTestUnlocked(typeId, userData?.isPremium)) {
      setIsPremiumModalOpen(true);
      return;
    }
    navigate(`/test-info/${uniKey}/${typeId}`);
  };

  return (
    <div id="screen-type" className="w-full max-w-xl flex flex-col items-center">
      {/* Top Breadcrumb Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/select-university')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60"
        >
          <span>←</span> Select University
        </button>
        <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Step 2 of 3 • {key}
        </span>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-2">
          Select Academic Stream
        </h1>
        <p className="text-sm text-slate-400">
          Choose your subject stream to load the relevant test portion breakdown.
        </p>
      </div>

      {/* Account Access Indicator Banner */}
      {!isUserPremium ? (
        <div className="w-full glass-panel rounded-2xl p-3.5 mb-6 border border-amber-500/30 bg-amber-950/20 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🔒</span>
            <div>
              <p className="text-xs font-bold text-amber-300">Free Member Account</p>
              <p className="text-[11px] text-slate-300">1 Free Sample Test available. Upgrade to unlock all {key} streams.</p>
            </div>
          </div>
          <button
            onClick={() => setIsPremiumModalOpen(true)}
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shrink-0 shadow-sm"
          >
            Get Pass
          </button>
        </div>
      ) : (
        <div className="w-full glass-panel rounded-2xl p-3 mb-6 border border-emerald-500/30 bg-emerald-950/20 flex items-center gap-2.5 text-left">
          <span className="text-lg">👑</span>
          <p className="text-xs font-bold text-emerald-300">PRO Pass Active • All {key} Tests Unlocked</p>
        </div>
      )}

      <div id="type-options" className="w-full space-y-3">
        {uniData.options.map((opt) => {
          const unlocked = isTestUnlocked(opt.id, userData?.isPremium);
          const isLocked = !unlocked;

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectType(opt.id)}
              className={`w-full glass-card glass-card-hover rounded-2xl p-4 sm:p-5 text-left flex items-center justify-between group transition-all relative overflow-hidden ${
                isLocked 
                  ? 'border-amber-500/30 bg-slate-900/60 hover:bg-slate-900/90' 
                  : 'border-indigo-500/30 bg-indigo-950/10 hover:border-indigo-500/60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-105 shrink-0 ${
                  isLocked 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-glow-amber' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald'
                }`}>
                  {isLocked ? '🔒' : '⚡'}
                </div>
                <div className="flex flex-col items-start gap-1.5">
                  <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-indigo-300 transition-colors">
                    {opt.name}
                  </h3>
                  {isLocked ? (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
                      🔒 PREMIUM
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                      FREE TEST
                    </span>
                  )}
                </div>
              </div>

              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ml-2 ${
                isLocked 
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 group-hover:bg-amber-500 group-hover:text-slate-950 font-bold' 
                  : 'bg-indigo-600 border border-indigo-500 text-white font-bold group-hover:scale-105'
              }`}>
                {isLocked ? '🔒' : '→'}
              </div>
            </button>
          );
        })}
      </div>

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
});

SelectTypeScreen.displayName = 'SelectTypeScreen';

