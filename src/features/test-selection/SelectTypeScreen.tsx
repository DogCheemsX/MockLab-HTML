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

  const handleSelectType = (typeId: string) => {
    if (typeId === 'nat-ie' && (!userData || userData.isPremium === false)) {
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

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-2">
          Select Academic Stream
        </h1>
        <p className="text-sm text-slate-400">
          Choose your subject stream to load the relevant test portion breakdown.
        </p>
      </div>

      <div id="type-options" className="w-full space-y-3">
        {uniData.options.map((opt) => {
          const isLocked = opt.id === 'nat-ie' && (!userData || userData.isPremium === false);
          return (
            <button
              key={opt.id}
              onClick={() => handleSelectType(opt.id)}
              className={`w-full glass-card glass-card-hover rounded-2xl p-4 sm:p-5 text-left flex items-center justify-between group transition-all ${
                isLocked ? 'border-amber-500/30 bg-amber-950/10' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg ${
                  isLocked 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                    : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                }`}>
                  {isLocked ? '🔒' : '📝'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-indigo-300 transition-colors">
                      {opt.name}
                    </h3>
                    {isLocked && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isLocked ? 'Click to view unlock details & access test' : 'Full exam paper structure and duration'}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all shrink-0 ml-2">
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

