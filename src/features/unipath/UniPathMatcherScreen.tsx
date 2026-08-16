import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicSystem, FieldCategory, StudentCredentials, UniversityEligibility } from '../../types/unipath';
import { calculateEligibility } from './unipathData';
import { trackUniPathSubmission } from '../../services/analytics';
import { PremiumModal } from '../../components/modals/PremiumModal';

interface UniPathMatcherScreenProps {
  onBackToHome?: () => void;
}

// IBCC Grade weightage map out of 100
const GRADE_WEIGHTS: Record<string, number> = {
  'A*': 90,
  'A': 85,
  'B': 75,
  'C': 65,
  'D': 55,
  'E': 45
};

export const UniPathMatcherScreen: React.FC<UniPathMatcherScreenProps> = React.memo(() => {
  const navigate = useNavigate();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  // Form State
  const [system, setSystem] = useState<AcademicSystem>('fsc');
  const [stream, setStream] = useState<string>('ics');
  const [desiredField, setDesiredField] = useState<FieldCategory>('cs');

  // Input mode for O/A Levels: 'grades' or 'percentage'
  const [olevelInputMode, setOlevelInputMode] = useState<'grades' | 'percentage'>('grades');

  // Percentage inputs
  const [sscPercentage, setSscPercentage] = useState<number>(82);
  const [hsscPercentage, setHsscPercentage] = useState<number>(72);

  // O/A Level Grade State
  const [aLevelGrades, setALevelGrades] = useState<{ g1: string; g2: string; g3: string }>({
    g1: 'A',
    g2: 'C',
    g3: 'C'
  });
  const [oLevelGradesCount, setOLevelGradesCount] = useState<{
    numAStar: number;
    numA: number;
    numB: number;
    numC: number;
    numD: number;
    numE: number;
  }>({
    numAStar: 0,
    numA: 4,
    numB: 4,
    numC: 0,
    numD: 0,
    numE: 0
  });

  // Calculate O-Level Obtained Marks (out of 800)
  const oLevelObtainedMarks = useMemo(() => {
    const { numAStar, numA, numB, numC, numD, numE } = oLevelGradesCount;
    return (numAStar * 90) + (numA * 85) + (numB * 75) + (numC * 65) + (numD * 55) + (numE * 45);
  }, [oLevelGradesCount]);

  // Calculate A-Level Obtained Marks (out of 300)
  const aLevelObtainedMarks = useMemo(() => {
    const w1 = GRADE_WEIGHTS[aLevelGrades.g1] || 85;
    const w2 = GRADE_WEIGHTS[aLevelGrades.g2] || 85;
    const w3 = GRADE_WEIGHTS[aLevelGrades.g3] || 75;
    return w1 + w2 + w3;
  }, [aLevelGrades]);

  // O-Level Equivalence % (SSC equivalent out of 800)
  const calculatedOLevelEquivalence = useMemo(() => {
    return parseFloat(((oLevelObtainedMarks / 800) * 100).toFixed(2));
  }, [oLevelObtainedMarks]);

  // Combined O+A Level Total Marks out of 1100
  const combinedObtainedMarks = useMemo(() => {
    return oLevelObtainedMarks + aLevelObtainedMarks;
  }, [oLevelObtainedMarks, aLevelObtainedMarks]);

  // Combined O+A Level Equivalence % (HSSC equivalent out of 1100)
  const calculatedCombinedALevelEquivalence = useMemo(() => {
    return parseFloat(((combinedObtainedMarks / 1100) * 100).toFixed(2));
  }, [combinedObtainedMarks]);

  // Calculation state
  const [results, setResults] = useState<UniversityEligibility[] | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [filterTab, setFilterTab] = useState<'all' | 'eligible' | 'ineligible'>('all');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const toggleCardExpand = (uniKey: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [uniKey]: !prev[uniKey]
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalSsc = sscPercentage;
    let finalHssc = hsscPercentage;

    if (system === 'alevels' && olevelInputMode === 'grades') {
      finalSsc = calculatedOLevelEquivalence;
      finalHssc = calculatedCombinedALevelEquivalence;
    }

    const creds: StudentCredentials = {
      system,
      sscPercentage: Math.min(100, Math.max(0, finalSsc)),
      hsscPercentage: Math.min(100, Math.max(0, finalHssc)),
      stream,
      desiredField
    };

    const calculated = calculateEligibility(creds);
    setResults(calculated);
    setHasSubmitted(true);

    // Keep collapsed by default
    const initialExpanded: Record<string, boolean> = {};
    calculated.forEach((r) => {
      initialExpanded[r.uniKey] = false;
    });
    setExpandedCards(initialExpanded);

    // Silent background tracking
    trackUniPathSubmission(desiredField, system);
  };

  const filteredResults = useMemo(() => {
    if (!results) return [];
    if (filterTab === 'eligible') return results.filter((r) => r.isEligible);
    if (filterTab === 'ineligible') return results.filter((r) => !r.isEligible);
    return results;
  }, [results, filterTab]);

  const eligibleCount = useMemo(() => (results ? results.filter((r) => r.isEligible).length : 0), [results]);
  const ineligibleCount = useMemo(() => (results ? results.filter((r) => !r.isEligible).length : 0), [results]);

  return (
    <div className="w-full max-w-3xl flex flex-col items-center py-2 animate-page-enter">
      {/* Top Header & Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60"
        >
          <span>←</span> Back to Home
        </button>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Instant UniPath Matcher • No Sign-Up
        </span>
      </div>

      {/* Screen Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-extrabold text-indigo-400 uppercase tracking-widest mb-3">
          <span>🎯</span> University & Program Eligibility Finder
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white mb-2">
          UniPath Matcher 2.0
        </h1>
        <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
          Enter your background and marks or letter grades to instantly check which top Pakistani universities you qualify for.
        </p>
      </div>

      {/* Form Panel */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 mb-8">
        <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
          {/* System Switcher */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Academic Education System
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSystem('fsc')}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                  system === 'fsc'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-glow-indigo'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Matric / FSc (Inter)
              </button>
              <button
                type="button"
                onClick={() => setSystem('alevels')}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                  system === 'alevels'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-glow-indigo'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                O-Levels / A-Levels
              </button>
            </div>
          </div>

          {/* Background Selector & Marks Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Background
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="ics">ICS (Maths, Physics, CS)</option>
                <option value="pre_eng">Pre-Engineering</option>
                <option value="pre_med">Pre-Medical</option>
                <option value="icom">I.Com / Commerce</option>
                <option value="arts">Arts / Fine Arts / Humanities</option>
              </select>
            </div>

            {/* O/A Level Grade vs Equivalence Selector */}
            {system === 'alevels' ? (
              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    O/A Level Input Mode
                  </label>
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setOlevelInputMode('grades')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        olevelInputMode === 'grades' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Letter Grades (A*, A, B...)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOlevelInputMode('percentage')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        olevelInputMode === 'percentage' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Direct IBCC %
                    </button>
                  </div>
                </div>

                {olevelInputMode === 'grades' ? (
                  <div className="space-y-4 pt-2">
                    {/* O-Level Grade Counts (out of 800) */}
                    <div>
                      <span className="block text-xs font-bold text-slate-300 mb-2">
                        Step 1: O-Level Grade Counts (8 Subjects Total):
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">A* (90)</label>
                          <input
                            type="number"
                            min="0"
                            max="8"
                            value={oLevelGradesCount.numAStar}
                            onChange={(e) =>
                              setOLevelGradesCount((prev) => ({
                                ...prev,
                                numAStar: parseInt(e.target.value) || 0
                              }))
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">A (85)</label>
                          <input
                            type="number"
                            min="0"
                            max="8"
                            value={oLevelGradesCount.numA}
                            onChange={(e) =>
                              setOLevelGradesCount((prev) => ({
                                ...prev,
                                numA: parseInt(e.target.value) || 0
                              }))
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">B (75)</label>
                          <input
                            type="number"
                            min="0"
                            max="8"
                            value={oLevelGradesCount.numB}
                            onChange={(e) =>
                              setOLevelGradesCount((prev) => ({
                                ...prev,
                                numB: parseInt(e.target.value) || 0
                              }))
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">C (65)</label>
                          <input
                            type="number"
                            min="0"
                            max="8"
                            value={oLevelGradesCount.numC}
                            onChange={(e) =>
                              setOLevelGradesCount((prev) => ({
                                ...prev,
                                numC: parseInt(e.target.value) || 0
                              }))
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">D (55)</label>
                          <input
                            type="number"
                            min="0"
                            max="8"
                            value={oLevelGradesCount.numD}
                            onChange={(e) =>
                              setOLevelGradesCount((prev) => ({
                                ...prev,
                                numD: parseInt(e.target.value) || 0
                              }))
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">E (45)</label>
                          <input
                            type="number"
                            min="0"
                            max="8"
                            value={oLevelGradesCount.numE}
                            onChange={(e) =>
                              setOLevelGradesCount((prev) => ({
                                ...prev,
                                numE: parseInt(e.target.value) || 0
                              }))
                            }
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs text-center"
                          />
                        </div>
                      </div>
                    </div>

                    {/* A-Level 3 Major Subjects Grades */}
                    <div className="pt-2 border-t border-slate-800">
                      <span className="block text-xs font-bold text-slate-300 mb-2">
                        Step 2: A-Level 3 Principal Subject Grades:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['g1', 'g2', 'g3'] as const).map((gKey, gIdx) => (
                          <div key={gKey}>
                            <label className="block text-[10px] text-slate-400 mb-1">Subject #{gIdx + 1}</label>
                            <select
                              value={aLevelGrades[gKey]}
                              onChange={(e) =>
                                setALevelGrades((prev) => ({ ...prev, [gKey]: e.target.value }))
                              }
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:outline-none focus:border-indigo-500"
                            >
                              <option value="A*">A* (90)</option>
                              <option value="A">A (85)</option>
                              <option value="B">B (75)</option>
                              <option value="C">C (65)</option>
                              <option value="D">D (55)</option>
                              <option value="E">E (45)</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Official IBCC Equivalence Breakdown Summary */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="text-slate-400">O-Level Marks: </span>
                        <b className="text-indigo-300">{oLevelObtainedMarks} / 800 ({calculatedOLevelEquivalence}%)</b>
                      </div>
                      <div>
                        <span className="text-slate-400">Total IBCC Score: </span>
                        <b className="text-emerald-400 font-extrabold text-sm">{combinedObtainedMarks} / 1100 ({calculatedCombinedALevelEquivalence}%)</b>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">O-Level Equivalence %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={sscPercentage}
                        onChange={(e) => setSscPercentage(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-xs"
                        placeholder="e.g. 80"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">A-Level Equivalence %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={hsscPercentage}
                        onChange={(e) => setHsscPercentage(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-xs"
                        placeholder="e.g. 77.73"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Matric Marks %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={sscPercentage}
                    onChange={(e) => setSscPercentage(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. 80"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    FSc / Inter %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={hsscPercentage}
                    onChange={(e) => setHsscPercentage(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. 72"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Desired Program Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Target Program / Degree Field
            </label>
            <select
              value={desiredField}
              onChange={(e) => setDesiredField(e.target.value as FieldCategory)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-white font-semibold text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="cs">💻 Computer Science / Software / AI / Cyber Security</option>
              <option value="engineering">⚙️ Engineering (Electrical, Mechanical, Civil)</option>
              <option value="business">📊 Business Administration / Finance / FinTech</option>
              <option value="architecture">🎨 Architecture, Art & Design (B.Arch, Fine Arts, Industrial)</option>
              <option value="medical">⚕️ Bio-Sciences / Biotechnology / Medical</option>
              <option value="social_sciences">⚖️ Social Sciences / Psychology / Media</option>
              <option value="any">🌐 Show All Eligible Universities & Programs (Any Field)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-glow-indigo transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 border border-indigo-400/30"
          >
            <span>🚀</span> Calculate Eligibility & Match Universities
          </button>
        </form>
      </div>

      {/* Results Section */}
      {hasSubmitted && results && (
        <div className="w-full space-y-6 animate-page-enter">
          {/* Summary & Filters Bar */}
          <div className="w-full glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-700/60">
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="text-white">Total Evaluated: <b className="text-indigo-400">{results.length}</b></span>
              <span className="h-4 w-px bg-slate-800"></span>
              <span className="text-emerald-400">Eligible: <b>{eligibleCount}</b></span>
              <span className="h-4 w-px bg-slate-800"></span>
              <span className="text-rose-400">Ineligible: <b>{ineligibleCount}</b></span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  filterTab === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({results.length})
              </button>
              <button
                onClick={() => setFilterTab('eligible')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  filterTab === 'eligible' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Eligible ({eligibleCount})
              </button>
              <button
                onClick={() => setFilterTab('ineligible')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  filterTab === 'ineligible' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Ineligible ({ineligibleCount})
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="w-full space-y-3">
            {filteredResults.map((uni, idx) => {
              const showPromoBanner = idx === 2;
              const isExpanded = !!expandedCards[uni.uniKey];

              return (
                <React.Fragment key={uni.uniKey}>
                  <div
                    className={`w-full glass-card rounded-2xl p-4 sm:p-5 text-left border transition-all duration-300 ${
                      uni.isEligible
                        ? 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50'
                        : 'border-rose-500/20 bg-rose-950/10 opacity-90 hover:border-rose-500/40'
                    }`}
                  >
                    {/* Header Row (Click to toggle expansion) */}
                    <div
                      onClick={() => toggleCardExpand(uni.uniKey)}
                      className="flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md shrink-0 overflow-hidden border border-slate-200">
                          {uni.logo ? (
                            <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="font-black text-slate-900 text-xs">{uni.shortName}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-white text-base sm:text-lg">
                            {uni.name}
                          </h3>
                          <p className="text-xs text-slate-400">
                            Test Required: <b className="text-indigo-300 font-semibold">{uni.requiredTestName}</b>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {uni.isEligible ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                            <span>✓</span> ELIGIBLE
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            <span>✕</span> NOT ELIGIBLE
                          </span>
                        )}

                        <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs transition-transform duration-300">
                          {isExpanded ? '▲' : '▼'}
                        </span>
                      </div>
                    </div>

                    {/* Smooth Expandable Body */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-slate-800/80' : 'max-h-0 opacity-0 mt-0 pt-0'
                      }`}
                    >
                      {/* Status & Guidance Reason */}
                      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 mb-4 text-xs space-y-2">
                        <p className={`font-bold text-sm ${uni.isEligible ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {uni.reason}
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                          <b className="text-white">Application Guidance:</b> {uni.applicationGuide}
                        </p>
                      </div>

                      {/* Recommended Fields */}
                      {uni.recommendedFields.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Programs:</span>
                          {uni.recommendedFields.map((f, fIdx) => (
                            <span key={fIdx} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      {uni.mockLabTestKey ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/select-type/${uni.mockLabTestKey}`);
                          }}
                          className="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-bold text-xs py-2.5 px-4 rounded-xl border border-indigo-500/30 transition-all flex items-center justify-center gap-2 group"
                        >
                          <span>🎯</span> Practice {uni.shortName} Test Pattern on MockLab <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>
                      ) : (
                        <div className="text-[11px] font-semibold text-slate-500 italic text-center">
                          Official pathway guidance provided. Practice pattern coming soon to MockLab.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subtle Conversion Banner */}
                  {showPromoBanner && (
                    <div className="glass-panel p-5 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-slate-900/80 to-indigo-950/20 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 text-left">
                        <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-xl shrink-0">
                          👑
                        </div>
                        <div>
                          <h4 className="font-extrabold text-white text-sm sm:text-base">Want to crack your entry test?</h4>
                          <p className="text-xs text-slate-300">
                            Get full access to MockLab practice tests and FLPs starting at just <b className="text-emerald-400">PKR 500</b>.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsPremiumModalOpen(true)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-glow-amber transition-all transform hover:-translate-y-0.5 shrink-0"
                      >
                        Unlock Premium
                      </button>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
});

UniPathMatcherScreen.displayName = 'UniPathMatcherScreen';
