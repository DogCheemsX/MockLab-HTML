import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UserProfile } from '../../types/auth';
import { ADMIN_EMAIL, SUPPORT_WHATSAPP_URL } from '../../constants/config';
import { useTheme } from '../../context/ThemeContext';


interface IntroScreenProps {
  user: User | null;
  userData: UserProfile | null;
  onLogout: () => void;
  onOpenSettings?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = React.memo(({ user, userData, onLogout }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
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
              src={theme === 'light' ? '/MockLab-light.png' : '/MockLab.png'}
              alt="MockLab Logo"
              className="relative w-32 sm:w-52 h-auto drop-shadow-[0_15px_30px_rgba(99,102,241,0.3)] lg:mx-0 mx-auto transition-transform hover:scale-105 duration-300"
            />
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-slate-900 dark:text-white mb-3 leading-tight">
            Master Your <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">University Entry Tests</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 mb-5 max-w-xl font-normal leading-relaxed">
            Timed exam simulations, instant score reports, and full length past papers tailored for <strong className="text-indigo-600 dark:text-indigo-300 font-semibold">NTS NAT, PIEAS, CUST, Air University</strong>, <strong className="text-indigo-600 dark:text-indigo-300 font-semibold">Bahria</strong>, and more!
          </p>

          {/* Account Status Pill */}
          <div className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 dark:shadow-none rounded-2xl px-5 py-3 mb-6 flex flex-wrap items-center justify-between gap-4 w-full max-w-md">
            <div className="flex items-center gap-3 text-left">
              {photo ? (
                <img
                  src={photo}
                  alt={userData?.name || 'Student'}
                  className="w-9 h-9 rounded-xl object-cover border border-indigo-500/40 shadow-sm shrink-0"
                />
              ) : (
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${isPremium ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30' : 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30'}`}>
                  🎓
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Student Account</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {userData?.name || 'Student'}
                  {isPremium ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 font-bold dark:border-amber-500/30">
                      PRO
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-700 dark:text-slate-300 font-medium">
                      Free
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="text-xs font-extrabold text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 transition-all shadow-sm active:scale-95 shrink-0"
            >
              Sign Out
            </button>
          </div>

          {/* Promotional University Logos Carousel Bar */}
          <div className="w-full max-w-md mb-6 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/40 dark:border-slate-800/80 dark:shadow-none">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-blue-700 dark:text-indigo-400">
                Official Patterns
              </span>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 dark:text-amber-300 dark:bg-amber-500/15 dark:border-amber-500/30 px-2.5 py-0.5 rounded-full">
                + and more!
              </span>
            </div>
            <div className="flex items-center justify-between gap-2.5 mt-2.5 overflow-x-auto pb-1 no-scrollbar">
              {PROMO_LOGOS.map((u, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-1.5 bg-white border border-slate-200 dark:border-slate-700/80 shadow-sm shrink-0 flex items-center justify-center transition-transform hover:scale-110"
                  title={u.name}
                >
                  <img src={u.logo} alt={u.name} className="w-full h-full object-contain rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-md space-y-3">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 font-bold text-base py-3.5 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                Admin Control Console
              </button>
            )}

            <button
              onClick={() => navigate('/select-university')}
              className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-lg py-4 px-8 rounded-xl shadow-md dark:shadow-glow-indigo transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-indigo-400/30"
            >
              <span>Enter Portal →</span>
            </button>

            <a
              href={SUPPORT_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/30 dark:text-emerald-300 dark:border-emerald-500/40 font-extrabold text-sm py-3.5 px-5 rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
            >

              <img src="whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
              <span>Have any doubts? Message us on WhatsApp!</span>
            </a>
          </div>
        </div>

        {/* Right Column: Step-Progress Roadmap Timeline */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 dark:shadow-none p-7 sm:p-9 rounded-3xl text-left relative overflow-hidden">
            <h3 className="text-xs sm:text-sm font-extrabold text-blue-700 dark:text-indigo-400 uppercase tracking-widest mb-8">
              How It Works
            </h3>

            <div className="relative flex flex-col gap-8 sm:gap-9">
              {/* Interconnecting vertical guideline */}
              <div className="absolute left-[21.5px] top-5 bottom-5 w-0.5 bg-slate-200 dark:bg-slate-800" />

              {/* Step 1 */}
              <div className="relative flex items-center gap-5 z-10">
                <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/30 shadow-sm flex items-center justify-center font-black text-base sm:text-lg shrink-0">
                  1
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Choose University
                </h4>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center gap-5 z-10">
                <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30 shadow-sm flex items-center justify-center font-black text-base sm:text-lg shrink-0">
                  2
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Pick Test Subject
                </h4>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center gap-5 z-10">
                <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30 shadow-sm flex items-center justify-center font-black text-base sm:text-lg shrink-0">
                  3
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Go!
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

IntroScreen.displayName = 'IntroScreen';
