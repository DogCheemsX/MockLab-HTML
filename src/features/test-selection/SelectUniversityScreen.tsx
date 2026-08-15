import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversityKey } from '../../types/test';

interface UniversityOption {
  key: UniversityKey;
  name: string;
  badge: string;
  tag: string;
  desc: string;
  color: string;
  logo: string;
}

const UNIVERSITIES: UniversityOption[] = [
  {
    key: 'COMSATS',
    name: 'COMSATS Admission Test',
    badge: 'CU',
    tag: 'NTS NAT Pattern',
    desc: 'Pre-Eng, Pre-Med, ICS, General Science & Commerce',
    color: 'from-blue-600 to-indigo-600',
    logo: 'logos/comsats.svg',
  },
  {
    key: 'PIEAS',
    name: 'PIEAS Admission Test',
    badge: 'PI',
    tag: 'Engineering / Physics',
    desc: 'High-rigor STEM paper pattern for Islamabad campus',
    color: 'from-purple-600 to-indigo-600',
    logo: 'logos/pieas.svg',
  },
  {
    key: 'AIR',
    name: 'Air University Test',
    badge: 'AU',
    tag: 'AU-CBT Pattern',
    desc: 'Computing, Engineering & Management streams',
    color: 'from-cyan-600 to-blue-600',
    logo: 'logos/air.svg',
  },
  {
    key: 'BAHRIA',
    name: 'Bahria University Test',
    badge: 'BU',
    tag: 'BUET Exam',
    desc: 'CS, IT, Engineering & Social Sciences pattern',
    color: 'from-emerald-600 to-teal-600',
    logo: 'logos/bahria.svg',
  },
  {
    key: 'NTS',
    name: 'NTS National Aptitude Test',
    badge: 'NTS',
    tag: 'NAT-I Standard',
    desc: 'General NTS NAT prep for all affiliated institutes',
    color: 'from-amber-600 to-orange-600',
    logo: 'logos/nts.svg',
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
              <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-2 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-indigo-500/50 transition-all shrink-0 relative overflow-hidden`}>
                <img
                  src={u.logo}
                  alt={`${u.name} Logo`}
                  className="w-full h-full object-contain filter drop-shadow-md"
                  onError={(e) => {
                    // Fallback to text badge if image fails to render
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-indigo-300 transition-colors">
                    {u.name}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80">
                    {u.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-normal">
                  {u.desc}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all shrink-0 ml-2">
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

SelectUniversityScreen.displayName = 'SelectUniversityScreen';

