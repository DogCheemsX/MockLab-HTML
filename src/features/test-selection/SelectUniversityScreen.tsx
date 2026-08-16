import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversityKey } from '../../types/test';
import { PAYMENT_INFO } from '../../constants/config';

interface UniversityOption {
  key: UniversityKey;
  name: string;
  badge: string;
  logo?: string;
  tag: string;
  desc: string;
  color: string;
}

const UNIVERSITIES: UniversityOption[] = [
  {
    key: 'NTS',
    name: 'NTS National Aptitude Test',
    badge: 'NTS',
    logo: 'logos/nts.png',
    tag: 'NAT-I Standard',
    desc: 'General NTS NAT prep for all affiliated institutes',
    color: 'from-amber-600 to-orange-600',
  },
  {
    key: 'COMSATS',
    name: 'COMSATS Admission Test',
    badge: 'CU',
    logo: 'logos/comsats.jpg',
    tag: 'NTS NAT Pattern',
    desc: 'Pre-Eng, Pre-Med, ICS, General Science & Commerce',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    key: 'PIEAS',
    name: 'PIEAS Admission Test',
    badge: 'PI',
    logo: 'logos/pieas.png',
    tag: 'Engineering / Physics',
    desc: 'High-rigor STEM paper pattern for Islamabad campus',
    color: 'from-purple-600 to-indigo-600',
  },
  {
    key: 'AIR',
    name: 'Air University Test',
    badge: 'AU',
    logo: 'logos/air.png',
    tag: 'AU-CBT Pattern',
    desc: 'Computing, Engineering & Management streams',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    key: 'BAHRIA',
    name: 'Bahria University Test',
    badge: 'BU',
    logo: 'logos/bahria.png',
    tag: 'BUET Exam',
    desc: 'CS, IT, Engineering & Social Sciences pattern',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    key: 'CUST',
    name: 'CUST Admission Test',
    badge: 'CUST',
    logo: 'logos/cust.jpg',
    tag: 'UG Entry Test',
    desc: 'Computing, Engineering & Business streams',
    color: 'from-fuchsia-600 to-violet-600',
  },
];

export const SelectUniversityScreen: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const handleSelectUniversity = (uniKey: UniversityKey) => {
    navigate(`/select-type/${uniKey}`);
  };

  return (
    <div id="screen-home" className="w-full max-w-xl flex flex-col items-center">
      {/* Top Header & Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60"
        >
          <span>←</span> Back to Dashboard
        </button>
        <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Step 1 of 3
        </span>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-2">
          Select Targeted University
        </h1>
        <p className="text-sm text-slate-400">
          Choose the university or exam authority test pattern you are preparing for.
        </p>
      </div>

      <div className="w-full space-y-3">
        {UNIVERSITIES.map((u) => (
          <button
            key={u.key}
            onClick={() => handleSelectUniversity(u.key)}
            className="w-full glass-card glass-card-hover rounded-2xl p-4 sm:p-5 text-left flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0 border border-slate-200/80 overflow-hidden">
                {u.logo ? (
                  <img src={u.logo} alt={`${u.name} Logo`} className="w-full h-full object-contain" />
                ) : (
                  <div className={`w-full h-full rounded-lg bg-gradient-to-br ${u.color} flex items-center justify-center font-extrabold font-display text-white text-base`}>
                    {u.badge}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-indigo-300 transition-colors">
                  {u.name}
                </h3>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all shrink-0 ml-2">
              →
            </div>
          </button>
        ))}
      </div>

      {/* Join Premium Pass Section */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 mt-8 border border-amber-500/30 shadow-xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <span>👑</span> Premium Pass Unlock
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
            Get Lifetime Unlimited Access
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            Unlock all premium test categories across NTS NAT, ECAT, MDCAT, PIEAS, Air, Bahria & CUST test banks on all devices.
          </p>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="bg-white p-3 rounded-2xl shadow-glow-indigo border-2 border-indigo-400 mb-3 transition-transform hover:scale-105 duration-300">
              <img src="qr.png" alt="NayaPay QR Code" className="w-36 h-36 object-contain rounded-lg" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-indigo-300 uppercase tracking-widest bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-500/40 shadow-sm">
              Scan to Pay Via NayaPay / JazzCash / EasyPaisa
            </span>
          </div>

          {/* Step-by-Step Payment Instructions */}
          <div className="w-full max-w-md space-y-3 bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 text-left mb-6 shadow-inner">
            <div className="flex items-start">
              <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
                1
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                Transfer <b className="text-emerald-400 font-bold">{PAYMENT_INFO.amount}</b> to account <b className="text-white font-bold">{PAYMENT_INFO.accountNumber}</b> ({PAYMENT_INFO.bankName}).
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
                2
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                Send your registered email & receipt screenshot to our WhatsApp admin.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-600 text-white font-black rounded-lg h-6 w-6 flex items-center justify-center text-xs shrink-0 mt-0.5 mr-3">
                3
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                Instant activation within 5 minutes!
              </p>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <a
            href={PAYMENT_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-md bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-glow-emerald transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 border border-emerald-400/30 text-center"
          >
            <span>💬</span> Contact Admin on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
});

SelectUniversityScreen.displayName = 'SelectUniversityScreen';

