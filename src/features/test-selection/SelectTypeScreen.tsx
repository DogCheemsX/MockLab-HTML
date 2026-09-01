import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { testData } from '../../data/testData';
import { UniversityKey } from '../../types/test';
import { UserProfile } from '../../types/auth';
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
          Choose your subject stream to access practice tests.
        </p>
      </div>

      {/* Account Access Indicator Banner */}
      {!isUserPremium ? (
        <div className="w-full glass-panel rounded-2xl p-4 mb-6 border border-amber-500/30 bg-amber-950/20 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎁</span>
            <div>
              <p className="text-xs font-bold text-amber-300">Free Test Access</p>
              <p className="text-[11px] text-slate-300">1 Free Test available per stream. Upgrade to unlock all premium tests.</p>
            </div>
          </div>
          <button
            onClick={() => setIsPremiumModalOpen(true)}
            className="text-xs font-black px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all shrink-0 shadow-sm"
          >
            Get Premium Pass 👑
          </button>
        </div>
      ) : (
        <div className="w-full glass-panel rounded-2xl p-3.5 mb-6 border border-emerald-500/30 bg-emerald-950/20 flex items-center gap-2.5 text-left">
          <span className="text-xl">👑</span>
          <p className="text-xs font-bold text-emerald-300">PREMIUM PASS ACTIVE • All {key} Tests Unlocked</p>
        </div>
      )}

      <div id="type-options" className="w-full space-y-3">
        {uniData.options.map((opt) => {
          return (
            <button
              key={opt.id}
              onClick={() => handleSelectType(opt.id)}
              className="w-full glass-card glass-card-hover rounded-2xl p-4 sm:p-5 text-left flex items-center justify-between group transition-all relative overflow-hidden border-indigo-500/30 bg-indigo-950/10 hover:border-indigo-500/60"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-105 shrink-0 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-glow-indigo">
                  ⚡
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-indigo-300 transition-colors">
                    {opt.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      FREE TEST AVAILABLE
                    </span>
                    {!isUserPremium && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        + PREMIUM TESTS
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ml-2 bg-indigo-600 border border-indigo-500 text-white font-bold group-hover:scale-105">
                →
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
