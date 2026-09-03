import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UserProfile } from '../../types/auth';
import { ADMIN_EMAIL, SUPPORT_WHATSAPP_URL } from '../../constants/config';


interface IntroScreenProps {
  user: User | null;
  userData: UserProfile | null;
  onLogout: () => void;
  onOpenSettings?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = React.memo(({ user, userData, onLogout, onOpenSettings }) => {
  const navigate = useNavigate();
  const isAdmin = user?.email === ADMIN_EMAIL;
  const isPremium = userData?.isPremium;

  const PROMO_LOGOS = [
    { name: 'COMSATS', logo: '/logos/comsats.jpg' },
    { name: 'NTS', logo: '/logos/nts.png' },
    { name: 'PIEAS', logo: '/logos/pieas.png' },
    { name: 'Air', logo: '/logos/air.png' },
    { name: 'Bahria', logo: '/logos/bahria.png' },
    { name: 'CUST', logo: '/logos/cust.jpg' }
  ];

  const photo = userData?.photoURL || user?.photoURL;

  return (
    <div id="screen-intro" className="w-full max-w-6xl lg:max-w-7xl flex flex-col items-center text-center py-4">
      {/* Universal PC Responsive 2-Column Horizontal Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        {/* Left Column: Brand Hero & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Brand Hero */}
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute -inset-4 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none"></div>
            <img
              src="MockLab.png"
              alt="MockLab Logo"
              className="relative w-32 sm:w-52 h-auto drop-shadow-[0_15px_30px_rgba(99,102,241,0.3)] lg:mx-0 mx-auto transition-transform hover:scale-105 duration-300"
            />
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-3 leading-tight">
            Master Your University <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">Entry Tests</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 mb-5 max-w-xl font-normal leading-relaxed">
            Timed exam simulations, instant score reports, and full length past papers tailored for <strong className="text-indigo-300 font-semibold">NTS NAT, PIEAS, CUST, Air University</strong>, <strong className="text-indigo-300 font-semibold">Bahria</strong>, and more!
          </p>

          {/* Account Status Pill */}
          <div className="glass-panel rounded-2xl px-5 py-3 mb-6 flex flex-wrap items-center justify-between gap-4 w-full max-w-md shadow-lg border border-slate-700/60">
            <div className="flex items-center gap-3 text-left">
              {photo ? (
                <img
                  src={photo}
                  alt={userData?.name || 'Student'}
                  className="w-9 h-9 rounded-xl object-cover border border-indigo-500/40 shadow-sm shrink-0"
                />
              ) : (
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${isPremium ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}`}>
                  🎓
                </div>
              )}
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Student Account</p>
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  {userData?.name || 'Student'}
                  {isPremium ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      PRO
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-medium">
                      Free
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <span>⚙️</span> Settings
                </button>
              )}
              <button
                type="button"
                onClick={onLogout}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Promotional University Logos Carousel Bar */}
          <div className="w-full max-w-md mb-6 glass-card p-3 rounded-2xl border border-slate-800/80 bg-slate-900/40">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                Official Patterns
              </span>
              <span className="text-[11px] font-bold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                + and more!
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 mt-2.5 overflow-x-auto pb-1 no-scrollbar">
              {PROMO_LOGOS.map((u, idx) => (
                <div
                  key={idx}
                  className="w-9 h-9 rounded-xl p-1 bg-white/95 border border-slate-700/80 shadow-md shrink-0 flex items-center justify-center transition-transform hover:scale-110"
                  title={u.name}
                >
                  <img src={u.logo} alt={u.name} className="w-full h-full object-contain rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-md space-y-3">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full bg-gradient-to-r from-rose-900/80 to-red-800/80 hover:from-rose-800 hover:to-red-700 text-rose-100 font-bold text-base py-3.5 px-6 rounded-xl border border-rose-500/40 shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Admin Control Console
              </button>
            )}

            <button
              onClick={() => navigate('/select-university')}
              className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-lg py-4 px-8 rounded-xl shadow-glow-indigo transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-indigo-400/30"
            >
              <span>Enter Portal →</span>
            </button>

            <a
              href={SUPPORT_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-gradient-to-r from-emerald-600/20 via-emerald-500/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 text-emerald-300 font-extrabold text-sm py-3.5 px-5 rounded-xl border border-emerald-500/40 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
            >

              <img src="whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
              <span>Have any doubts? Message us on WhatsApp!</span>
            </a>
          </div>
        </div>

        {/* Right Column: Feature Cards Grid */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 flex flex-col items-start bg-slate-900/40 shadow-lg space-y-2 text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-lg border border-indigo-500/30 mb-1">
              ⏱️
            </div>
            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">Real-Time Timer</span>
            <h3 className="text-lg font-black text-white">Official Exam Countdown</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Simulate actual exam time limits with live section timers and critical time warnings.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 flex flex-col items-start bg-slate-900/40 shadow-lg space-y-2 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-lg border border-emerald-500/30 mb-1">
              📊
            </div>
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">Instant Scoring</span>
            <h3 className="text-lg font-black text-white">Detailed Performance Analytics</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get detailed score reports, percentage breakdowns, and subject-wise accuracy metrics immediately.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 flex flex-col items-start bg-slate-900/40 shadow-lg space-y-2 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg border border-amber-500/30 mb-1">
              📚
            </div>
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Curated MCQs</span>
            <h3 className="text-lg font-black text-white">Full Length Past Papers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Access ingested question pools spanning English, Maths, Physics, Chemistry, Biology, Analytical, and CS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

IntroScreen.displayName = 'IntroScreen';
