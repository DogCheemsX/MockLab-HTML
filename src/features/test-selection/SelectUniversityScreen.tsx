import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UniversityKey } from '../../types/test';
import { UserProfile } from '../../types/auth';
import { PAYMENT_INFO, getPaymentVerificationWhatsappUrl } from '../../constants/config';
import { QRCodeMagnifier } from '../../components/common/QRCodeMagnifier';

interface SelectUniversityScreenProps {
  user?: User | null;
  userData?: UserProfile | null;
}

export const SelectUniversityScreen: React.FC<SelectUniversityScreenProps> = React.memo(({ user, userData }) => {
  const navigate = useNavigate();
  const isPremium = userData?.isPremium === true;
  const whatsappPaymentUrl = getPaymentVerificationWhatsappUrl(user, userData);

  const UNIVERSITIES: { id: UniversityKey; name: string; desc: string; logo: string }[] = [
    {
      id: 'COMSATS',
      name: 'COMSATS University',
      desc: 'NTS NAT-I Pattern (IE, IM, ICS, IGS, IA, ICOM)',
      logo: '/logos/comsats.jpg'
    },
    {
      id: 'NTS',
      name: 'NTS NAT (National Testing Service)',
      desc: 'Official NTS NAT-I Entrance Examination',
      logo: '/logos/nts.png'
    },
    {
      id: 'PIEAS',
      name: 'PIEAS University',
      desc: 'Engineering, Computing & Basic Sciences Entry Test',
      logo: '/logos/pieas.png'
    },
    {
      id: 'AIR',
      name: 'Air University',
      desc: 'AU Entrance Test (Engineering, Computing, Medicine & Arts)',
      logo: '/logos/air.png'
    },
    {
      id: 'BAHRIA',
      name: 'Bahria University',
      desc: 'BUET (Engineering, Management, CS & Allied Health)',
      logo: '/logos/bahria.png'
    },
    {
      id: 'CUST',
      name: 'CUST University',
      desc: 'Capital University Entry Test (Engineering, Computing, Medicine & Business)',
      logo: '/logos/cust.jpg'
    }
  ];

  const handleSelectUni = (uniKey: UniversityKey) => {
    navigate(`/select-type/${uniKey}`);
  };

  return (
    <div id="screen-uni" className="w-full max-w-6xl lg:max-w-7xl flex flex-col items-center">
      {/* Top Breadcrumb Header */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-5 mt-2 sm:mt-0">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-700/60 truncate"
        >
          <span>←</span> <span className="truncate">Back to Home</span>
        </button>
        <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 text-center truncate">
          Step 1 of 3 • Select Target University
        </span>
      </div>

      {/* Top Header */}

      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 shadow-sm">
          <span>🎁</span> FREE TESTS AVAILABLE FOR ALL UNIVERSITIES
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white mb-1.5">
          Select Target University
        </h1>
        <p className="text-xs sm:text-base text-slate-300 max-w-lg mx-auto">
          Start taking free practice tests immediately.
        </p>
      </div>

      {/* Universal PC Responsive 2-Column Horizontal Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start text-left">
        {/* Left Column: University Selection Grid */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-base sm:text-lg font-black font-display text-white">
              Available Entrance Test Banks
            </h2>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              🎁 FREE TESTS READY
            </span>
          </div>

          <div id="uni-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {UNIVERSITIES.map((u) => (
              <button
                key={u.id}
                onClick={() => handleSelectUni(u.id)}
                className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 text-left flex flex-col justify-between group transition-all relative overflow-hidden border-indigo-500/30 bg-indigo-950/10 hover:border-indigo-500/60 min-h-[120px] sm:min-h-[135px]"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  {/* Real University Logo */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center p-1 sm:p-1.5 shrink-0 bg-white/95 border border-slate-700/80 shadow-md group-hover:scale-105 transition-transform">
                    <img src={u.logo} alt={u.name} className="w-full h-full object-contain rounded" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    FREE TEST READY
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-white text-base group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {u.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{u.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* More Tests Coming Soon Banner */}
          <div className="w-full glass-panel p-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 flex items-center justify-between gap-3 text-left mt-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-base shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-white">More University Tests Coming Soon!</h4>
                <p className="text-[11px] text-slate-400">GIKI, NUST, FAST, LUMS, UET, and MDCAT question banks in active ingestion.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Pass & Payment Container */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {isPremium ? (
            <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl relative overflow-hidden text-center bg-gradient-to-r from-emerald-950/30 via-slate-900/80 to-emerald-950/30">
              <div className="relative z-10 flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
                  PRO PASS ACTIVE
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white mb-2">
                  All Universities & Full Length Past Papers Unlocked
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                  You have active lifetime access to all full length past papers across NTS, PIEAS, Air, Bahria & CUST test banks.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 shadow-glow-amber relative overflow-hidden text-center bg-gradient-to-br from-amber-950/25 via-slate-900/90 to-purple-950/25">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Pulsing Urgency Banner */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black uppercase tracking-wider mb-4 shadow-glow-rose animate-pulse">
                  <span>🔥</span> DISCOUNT ENDING SOON (50% OFF)
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white mb-2">
                  Unlock Unlimited Full Length Past Papers
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-5 leading-relaxed">
                  Get full lifetime access to unlimited past papers across all universities.
                </p>

                {/* Lifetime Access Offer Card Box */}
                <div className="w-full glass-card p-4 rounded-2xl border border-amber-500/40 bg-amber-950/20 mb-6 flex items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block mb-0.5">
                      LIFETIME ACCESS OFFER
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black font-display text-amber-300">
                        {PAYMENT_INFO.amount}
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

                {/* QR Code Container with Magnifier */}
                <div className="mb-6">
                  <QRCodeMagnifier />
                </div>

                {/* Step-by-Step Payment Instructions */}
                <div className="w-full max-w-md space-y-3 bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 text-left mb-6 shadow-inner">
                  <div className="flex items-start">
                    <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
                      1
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                      Send <b className="text-emerald-400 font-bold">{PAYMENT_INFO.amount}</b> to <b className="text-white font-bold">{PAYMENT_INFO.accountNumber}</b> (NayaPay).
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
                      2
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                      Send your payment screenshot to WhatsApp admin.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
                      3
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                      Account activated upon payment confirmation.
                    </p>
                  </div>
                </div>

                {/* WhatsApp Direct Action Button */}
                <a
                  href={whatsappPaymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full max-w-md bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-glow-emerald transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 border border-emerald-400/30 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
                  <span>Confirm Payment on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SelectUniversityScreen.displayName = 'SelectUniversityScreen';
