import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UserProfile } from '../../types/auth';
import { ADMIN_EMAIL } from '../../constants/config';

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

  return (
    <div id="screen-intro" className="w-full max-w-2xl flex flex-col items-center text-center py-4">
      {/* Brand Hero */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none"></div>
        <img
          src="MockLab.png"
          alt="MockLab Logo"
          className="relative w-44 sm:w-56 h-auto drop-shadow-[0_15px_30px_rgba(99,102,241,0.3)] mx-auto transition-transform hover:scale-105 duration-300"
        />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300 mb-4 shadow-sm backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Computer-Based Test Portal 2.0
      </div>

      <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white mb-4">
        Master Your University <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">Entry Tests</span>
      </h1>

      <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-lg font-normal leading-relaxed">
        Timed exam simulations, instant score reports, and category-wise practice tailored for <strong className="text-indigo-300 font-semibold">NTS NAT, PIEAS, CUST, Air University</strong>, and <strong className="text-indigo-300 font-semibold">Bahria</strong>.
      </p>

      {/* Account Status Pill */}
      <div className="glass-panel rounded-2xl px-5 py-3 mb-8 flex flex-wrap items-center justify-between gap-4 w-full max-w-md shadow-lg border border-slate-700/60">
        <div className="flex items-center gap-3 text-left">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${isPremium ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}`}>
            {isPremium ? '👑' : '🎓'}
          </div>
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

      {/* Feature Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8 text-center">
        <div className="glass-card p-4 rounded-xl flex items-center justify-center">
          <div className="text-indigo-400 font-semibold">⏱️ Real-Time Timer</div>
        </div>
        <div className="glass-card p-4 rounded-xl flex items-center justify-center">
          <div className="text-emerald-400 font-semibold">📊 Instant Scoring</div>
        </div>
        <div className="glass-card p-4 rounded-xl flex items-center justify-center">
          <div className="text-amber-400 font-semibold">🎯 Curated MCQs</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md space-y-3">
        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full bg-gradient-to-r from-rose-900/80 to-red-800/80 hover:from-rose-800 hover:to-red-700 text-rose-100 font-bold text-base py-3.5 px-6 rounded-xl border border-rose-500/40 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>👑</span> Admin Control Console
          </button>
        )}

        <button
          onClick={() => navigate('/select-university')}
          className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-lg py-4 px-8 rounded-xl shadow-glow-indigo transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-indigo-400/30"
        >
          <span>🚀</span> Enter Portal
        </button>

        <a
          href="https://wa.me/923465939277?text=Hi%20MockLab!%20I%20have%20a%20question%20about%20the%20entry%20test%20prep."
          target="_blank"
          rel="noreferrer"
          className="w-full bg-gradient-to-r from-emerald-600/20 via-emerald-500/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 text-emerald-300 font-extrabold text-sm py-3.5 px-5 rounded-xl border border-emerald-500/40 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
        >
          <img src="whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
          <span>Have any doubts? Message us on WhatsApp!</span>
        </a>
      </div>
    </div>
  );
});

IntroScreen.displayName = 'IntroScreen';

