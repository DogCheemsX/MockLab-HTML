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
}

const UNIVERSITIES: UniversityOption[] = [
  {
    key: 'COMSATS',
    name: 'COMSATS Admission Test',
    badge: 'CU',
    tag: 'NTS NAT Pattern',
    desc: 'Pre-Eng, Pre-Med, ICS, General Science & Commerce',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    key: 'PIEAS',
    name: 'PIEAS Admission Test',
    badge: 'PI',
    tag: 'Engineering / Physics',
    desc: 'High-rigor STEM paper pattern for Islamabad campus',
    color: 'from-purple-600 to-indigo-600',
  },
  {
    key: 'AIR',
    name: 'Air University Test',
    badge: 'AU',
    tag: 'AU-CBT Pattern',
    desc: 'Computing, Engineering & Management streams',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    key: 'BAHRIA',
    name: 'Bahria University Test',
    badge: 'BU',
    tag: 'BUET Exam',
    desc: 'CS, IT, Engineering & Social Sciences pattern',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    key: 'NTS',
    name: 'NTS National Aptitude Test',
    badge: 'NTS',
    tag: 'NAT-I Standard',
    desc: 'General NTS NAT prep for all affiliated institutes',
    color: 'from-amber-600 to-orange-600',
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
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${u.color} flex items-center justify-center font-extrabold font-display text-white text-base shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                {u.badge}
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

