import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { testData } from '../../data/testData';
import { UniversityKey } from '../../types/test';
import { UserProfile } from '../../types/auth';
import { PremiumModal } from '../../components/modals/PremiumModal';

interface SelectTypeScreenProps {
  user?: User | null;
  userData: UserProfile | null;
}

export const SelectTypeScreen: React.FC<SelectTypeScreenProps> = React.memo(({ user, userData }) => {
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
    <div id="screen-type" className="w-full max-w-6xl lg:max-w-7xl flex flex-col items-center">
      {/* Top Breadcrumb Header */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-5 mt-2 sm:mt-0">
        <button
          onClick={() => navigate('/select-university')}
          className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-700/60 truncate"
        >
          <span>←</span> <span className="truncate">Select University</span>
        </button>
        <span className="text-[11px] sm:text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 text-center truncate">
          Step 2 of 3 • Select Field/Degree ({key})
        </span>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
          <span>🎁</span> FREE TESTS AVAILABLE FOR ALL DEGREES
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-2">
          Select Field/Degree
        </h1>
        <p className="text-sm text-slate-300">
          Choose your target field/degree program to access full length past papers.
        </p>
      </div>

      {/* Universal PC Responsive 2-Column Horizontal Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Left Column: Academic Fields Options Grid */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base sm:text-lg font-black font-display text-white">
              Available Degree Fields
            </h2>
            <span className="text-xs font-semibold text-slate-400">
              {uniData.options.length} Fields
            </span>
          </div>

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
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        FREE TEST READY
                      </span>
                      {!isUserPremium && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          + UNLIMITED FULL LENGTH PAST PAPERS
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

        {/* Right Column: Lifetime Access Offer Pricing Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {!isUserPremium ? (
            <div className="w-full glass-panel rounded-3xl p-6 border-2 border-amber-500/50 bg-gradient-to-br from-amber-950/30 via-slate-900/95 to-purple-950/30 shadow-glow-amber flex flex-col items-start gap-4 text-left relative overflow-hidden">
              {/* Urgency Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black uppercase tracking-wider animate-pulse shadow-glow-rose">
                🔥 50% DISCOUNT ENDING SOON!
              </span>

              {/* Lifetime Access Offer Box */}
              <div className="w-full glass-card p-4 sm:p-5 rounded-2xl border border-amber-500/40 bg-amber-950/20 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block mb-0.5">
                    LIFETIME ACCESS OFFER
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-display text-amber-300">
                      PKR 500
                    </span>
                    <span className="line-through text-slate-400 text-sm font-semibold font-mono">
                      PKR 1000
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 shadow-sm shrink-0 uppercase tracking-wider">
                  ONE-TIME PAYMENT
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white mb-1">
                  Unlock Unlimited Past Papers
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Start practicing right away. Upgrade to Premium Pass before the discount ends to unlock unlimited past papers for all fields.
                </p>
              </div>

              <button
                onClick={() => setIsPremiumModalOpen(true)}
                className="w-full text-xs sm:text-sm font-black py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all shadow-glow-amber text-center border border-amber-300/60"
              >
                Get Premium Pass (PKR 500)
              </button>
            </div>
          ) : (
            <div className="w-full glass-panel rounded-3xl p-6 border border-emerald-500/30 bg-emerald-950/20 flex flex-col items-start gap-3 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider">
                PRO PASS ACTIVE
              </span>
              <h3 className="text-lg font-black text-white">
                All {key} Fields Unlocked
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You have active full access to all past papers and on-demand simulations.
              </p>
            </div>
          )}
        </div>
      </div>

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        user={user}
        userData={userData}
      />
    </div>
  );
});

SelectTypeScreen.displayName = 'SelectTypeScreen';
