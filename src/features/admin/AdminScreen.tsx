import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUserPremiumStatus } from '../../services/userService';
import { getAllTestResults, TestResultRecord } from '../../services/testResultService';
import { getAllReviews, ReviewRecord } from '../../services/reviewService';
import { AdminUserRecord } from '../../types/auth';
import { UserListItem } from '../../components/admin/UserListItem';
import { getUserInitials } from '../../utils/formatters';

export const AdminScreen: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'students' | 'leaderboard' | 'reviews'>('students');

  // Students Database State
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [userSearchTerm, setUserSearchTerm] = useState<string>('');

  // MockLab Ranked Leaderboard State
  const [testResults, setTestResults] = useState<TestResultRecord[]>([]);
  const [loadingResults, setLoadingResults] = useState<boolean>(false);
  const [resultSearchTerm, setResultSearchTerm] = useState<string>('');
  const [selectedTestFilter, setSelectedTestFilter] = useState<string>('ALL');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

  // Private Student Reviews State
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
  const [reviewSearchTerm, setReviewSearchTerm] = useState<string>('');
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | 'ALL'>('ALL');

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUserError(null);
    try {
      const records = await getAllUsers();
      setUsers(records);
    } catch (err: any) {
      setUserError(err.message || 'Error loading users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchTestResults = async () => {
    setLoadingResults(true);
    try {
      const records = await getAllTestResults();
      setTestResults(records);
    } catch (err: any) {
      console.error('Error fetching test results:', err);
    } finally {
      setLoadingResults(false);
    }
  };

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const records = await getAllReviews();
      setReviews(records);
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTestResults();
    fetchReviews();
  }, []);

  const handleToggleStatus = async (uid: string, currentStatus: boolean) => {
    try {
      await updateUserPremiumStatus(uid, !currentStatus);
      await fetchUsers();
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  // Filter Users
  const filteredUsers = useMemo(() => {
    if (!userSearchTerm.trim()) return users;
    const term = userSearchTerm.toLowerCase();
    return users.filter(
      (u) =>
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term)) ||
        (u.whatsapp && u.whatsapp.includes(term))
    );
  }, [users, userSearchTerm]);

  // Unique Test Types for Filter Dropdown
  const uniqueTestCategories = useMemo(() => {
    const set = new Set<string>();
    testResults.forEach((r) => {
      if (r.testTitle) set.add(r.testTitle);
    });
    return Array.from(set);
  }, [testResults]);

  // Filter & Sort Leaderboard Results
  const rankedResults = useMemo(() => {
    let list = [...testResults];

    // Filter by test title if category selected
    if (selectedTestFilter !== 'ALL') {
      list = list.filter((r) => r.testTitle === selectedTestFilter);
    }

    // Filter by search query (name, phone, test title)
    if (resultSearchTerm.trim()) {
      const term = resultSearchTerm.toLowerCase();
      list = list.filter((r) => {
        const matchingUser = users.find(
          (u) =>
            (u.uid && r.userId && r.userId !== 'guest-user' && u.uid === r.userId) ||
            (u.email && r.userEmail && r.userEmail.trim() !== '' && u.email.toLowerCase() === r.userEmail.toLowerCase())
        );
        const resolvedName = matchingUser?.name || r.userName || '';
        const resolvedPhone = matchingUser?.whatsapp || r.userPhone || '';
        return (
          resolvedName.toLowerCase().includes(term) ||
          resolvedPhone.includes(term) ||
          (r.testTitle && r.testTitle.toLowerCase().includes(term))
        );
      });
    }

    // Helper to compute exact score percentage float
    const getExactPct = (r: TestResultRecord) => {
      if (r.totalQuestions > 0) {
        return (r.score / r.totalQuestions) * 100;
      }
      return r.percentage || 0;
    };

    // Sort by exact percentage rate descending, tiebreak by score & time taken
    list.sort((a, b) => {
      const pctA = getExactPct(a);
      const pctB = getExactPct(b);

      if (Math.abs(pctB - pctA) > 0.01) {
        return pctB - pctA;
      }
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      const timeA = a.timeTakenSeconds || 999999;
      const timeB = b.timeTakenSeconds || 999999;
      return timeA - timeB;
    });

    return list;
  }, [testResults, selectedTestFilter, resultSearchTerm, users]);

  // Filter Reviews
  const filteredReviews = useMemo(() => {
    let list = [...reviews];
    if (selectedStarFilter !== 'ALL') {
      list = list.filter((r) => r.rating === selectedStarFilter);
    }
    if (reviewSearchTerm.trim()) {
      const term = reviewSearchTerm.toLowerCase();
      list = list.filter(
        (r) =>
          (r.userName && r.userName.toLowerCase().includes(term)) ||
          (r.userEmail && r.userEmail.toLowerCase().includes(term)) ||
          (r.userPhone && r.userPhone.includes(term)) ||
          (r.comment && r.comment.toLowerCase().includes(term))
      );
    }
    return list;
  }, [reviews, selectedStarFilter, reviewSearchTerm]);

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return '5.0';
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const premiumCount = useMemo(() => users.filter((u) => u.isPremium).length, [users]);
  const freeCount = users.length - premiumCount;

  return (
    <div id="screen-admin" className="w-full max-w-5xl flex flex-col items-center py-2">
      {/* Top Breadcrumb Navigation */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-6 mt-2 sm:mt-0">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-700/60 truncate"
        >
          <span>←</span> <span className="truncate">Back to Portal</span>
        </button>
        <span className="text-xs font-extrabold text-rose-400 bg-rose-500/10 px-3.5 py-1.5 rounded-full border border-rose-500/20 text-center truncate">
          🛡️ Admin Console (Restricted Access)
        </span>
      </div>

      {/* Header Banner */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-2">
          Admin Management Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Manage registered accounts, grant PRO access, view leaderboard, and read private student reviews.
        </p>
      </div>

      {/* View Switcher Navigation Buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-lg mb-8 p-1.5 bg-slate-950/90 rounded-2xl border border-slate-800 shadow-lg">
        <button
          type="button"
          onClick={() => setActiveView('students')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
            activeView === 'students'
              ? 'bg-indigo-600 text-white shadow-glow-indigo'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>👥</span> Student Accounts
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveView('leaderboard');
            fetchTestResults();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
            activeView === 'leaderboard'
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-glow-amber'
              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
          }`}
        >
          <span>🏆</span> Ranked
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveView('reviews');
            fetchReviews();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
            activeView === 'reviews'
              ? 'bg-purple-600 text-white shadow-glow-purple'
              : 'bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30'
          }`}
        >
          <span>⭐</span> Reviews ({reviews.length})
        </button>
      </div>

      {/* Student Accounts View */}
      {activeView === 'students' && (
        <>
          {/* KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
            <div className="glass-card p-4 rounded-2xl border border-slate-700/60 text-left">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Registered</p>
              <p className="text-2xl font-black text-white mt-1">{users.length}</p>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-amber-500/30 bg-amber-950/10 text-left">
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">PRO Members</p>
              <p className="text-2xl font-black text-amber-300 mt-1">{premiumCount}</p>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-slate-700/60 text-left">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Free Accounts</p>
              <p className="text-2xl font-black text-slate-300 mt-1">{freeCount}</p>
            </div>
          </div>

          {/* User Table Glass Container */}
          <div className="w-full glass-panel rounded-3xl p-6 shadow-glass border border-slate-700/80">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white self-start sm:self-auto">All Registered Students</h2>
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search name, email or phone..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
              {loadingUsers ? (
                <div className="text-center py-12 text-slate-400 font-medium">Loading student database...</div>
              ) : userError ? (
                <div className="text-center py-12 text-rose-400 font-medium">Error: {userError}</div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-medium">No students match your query.</div>
              ) : (
                filteredUsers.map((u) => (
                  <UserListItem key={u.uid} user={u} onToggleStatus={handleToggleStatus} />
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Ranked MockLab Leaderboard View */}
      {activeView === 'leaderboard' && (
        <div className="w-full glass-panel rounded-3xl p-6 shadow-glass border border-amber-500/40 bg-slate-900/90 text-left">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-widest mb-1">
                🏆 OFFICIAL ADMIN LEADERBOARD
              </div>
              <h2 className="text-xl font-black font-display text-white">
                MockLab Ranked Leaderboard
              </h2>
              <p className="text-xs text-slate-400">
                Student test scores, contact details, and rankings grouped by test categories.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Category Dropdown */}
              <select
                value={selectedTestFilter}
                onChange={(e) => setSelectedTestFilter(e.target.value)}
                className="w-full sm:w-auto bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              >
                <option value="ALL">All Test Categories ({testResults.length})</option>
                {uniqueTestCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search name, phone, or test..."
                value={resultSearchTerm}
                onChange={(e) => setResultSearchTerm(e.target.value)}
                className="w-full sm:w-56 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {loadingResults ? (
              <div className="text-center py-12 text-slate-400 font-medium">Loading MockLab Ranked database...</div>
            ) : rankedResults.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-medium">
                No completed test attempts recorded yet. Scores will automatically appear here as students complete tests!
              </div>
            ) : (
              rankedResults.map((result, idx) => {
                const rank = idx + 1;
                const isTop1 = rank === 1;
                const isTop2 = rank === 2;
                const isTop3 = rank === 3;
                const recId = result.id || `res-${idx}`;
                const isExpanded = expandedRecordId === recId;

                // Lookup matching user in database to resolve name/phone/photo fallback
                const matchingUser = users.find(
                  (u) =>
                    (u.uid && result.userId && result.userId !== 'guest-user' && u.uid === result.userId) ||
                    (u.email && result.userEmail && result.userEmail.trim() !== '' && u.email.toLowerCase() === result.userEmail.toLowerCase())
                );

                const aliUser = users.find(
                  (u) =>
                    (u.name && u.name.toLowerCase().includes('ali')) ||
                    (u.whatsapp && u.whatsapp.includes('03465939277'))
                );

                const displayName =
                  matchingUser?.name ||
                  (result.userName && result.userName !== 'Student' && result.userName !== 'Anonymous Student' && result.userName !== 'Guest Student'
                    ? result.userName
                    : aliUser?.name || 'Ali Ahsan');

                const displayPhone =
                  matchingUser?.whatsapp ||
                  (result.userPhone && result.userPhone !== 'No Phone'
                    ? result.userPhone
                    : aliUser?.whatsapp || '03465939277');

                const displayPhoto = matchingUser?.photoURL || result.userPhotoURL || aliUser?.photoURL || '';

                // Format phone URL for direct WhatsApp message
                const cleanPhone = displayPhone.replace(/\D/g, '');
                const formattedPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : cleanPhone;
                const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(`Hi ${displayName}! Great job scoring ${result.score}/${result.totalQuestions} on MockLab ${result.testTitle}!`)}`;

                return (
                  <div
                    key={recId}
                    className={`p-4 rounded-2xl border transition-all flex flex-col gap-3 ${
                      isTop1
                        ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border-amber-400/80 shadow-glow-amber'
                        : isTop2
                        ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30 border-slate-400/80 shadow-md'
                        : isTop3
                        ? 'bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900 border-amber-600/60 shadow-sm'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                      {/* Rank Badge, PFP & Student Details */}
                      <div className="flex items-center gap-3 text-left min-w-0 flex-1">
                        {/* Rank Position */}
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 border ${
                            isTop1
                              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-glow-amber text-sm'
                              : isTop2
                              ? 'bg-slate-300 text-slate-950 border-white text-xs font-black'
                              : isTop3
                              ? 'bg-amber-700 text-white border-amber-500 text-xs font-black'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          {isTop1 ? '🥇 #1' : isTop2 ? '🥈 #2' : isTop3 ? '🥉 #3' : `#${rank}`}
                        </div>

                        {/* Student PFP Avatar */}
                        {displayPhoto ? (
                          <img
                            src={displayPhoto}
                            alt={displayName}
                            className="w-10 h-10 rounded-2xl object-cover border border-emerald-400/50 shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black flex items-center justify-center text-xs shrink-0 border border-indigo-400/40 shadow-sm">
                            {getUserInitials(displayName)}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-extrabold text-white text-base truncate">
                              {displayName}
                            </h3>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 truncate">
                              {result.testTitle}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mt-1 flex-wrap text-xs">
                            {/* Phone Number with WhatsApp Link */}
                            {displayPhone !== 'No Phone' ? (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
                                title="Message student on WhatsApp"
                              >
                                <span>💬</span> {displayPhone}
                              </a>
                            ) : (
                              <span className="text-slate-400 font-mono">💬 No Phone</span>
                            )}

                            <span className="text-slate-500">•</span>
                            <span className="text-slate-400 font-medium">{result.dateString}</span>
                          </div>
                        </div>
                      </div>

                      {/* Score Metric & Expand Button */}
                      <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto">
                        <div className="text-right">
                          <div className="text-xl font-black font-display text-emerald-400">
                            {result.score} <span className="text-xs text-slate-500 font-semibold">/ {result.totalQuestions}</span>
                          </div>
                          <div className="text-[11px] font-extrabold text-amber-300 tracking-wider">
                            {result.percentage}% SCORE RATE
                          </div>
                          {result.timeTakenFormatted && result.timeTakenFormatted !== 'N/A' && (
                            <div className="text-[11px] font-bold text-slate-300 mt-0.5 flex items-center justify-end gap-1">
                              <span className="text-indigo-400 font-extrabold">⏱️ Time Taken:</span>
                              <span className="font-mono text-indigo-200 font-extrabold">{result.timeTakenFormatted}</span>
                            </div>
                          )}
                        </div>

                        {/* Expand / Collapse Button */}
                        <button
                          type="button"
                          onClick={() => setExpandedRecordId(isExpanded ? null : recId)}
                          className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition-all shrink-0"
                          title="Toggle subject marks breakdown"
                        >
                          <span>📊</span>
                          <span>{isExpanded ? 'Hide ▲' : 'Breakdown ▼'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Expandable Subject Breakdown Accordion */}
                    {isExpanded && (
                      <div className="w-full mt-2 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 animate-page-enter">
                        {result.subjectBreakdown && result.subjectBreakdown.length > 0 ? (
                          result.subjectBreakdown.map((subj, sIdx) => (
                            <div key={sIdx} className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-200 truncate">{subj.title}</span>
                              <span className="font-extrabold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/30">
                                {subj.correct}/{subj.total} ({subj.pct}%)
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full text-xs text-slate-400 italic py-2 text-center bg-slate-900/60 rounded-xl border border-slate-800">
                            Detailed section marks breakdown is recorded for papers completed going forward.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Private Student Reviews View */}
      {activeView === 'reviews' && (
        <div className="w-full glass-panel rounded-3xl p-6 shadow-glass border border-purple-500/40 bg-slate-900/90 text-left">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase tracking-widest mb-1">
                🔒 CONFIDENTIAL STUDENT FEEDBACK
              </div>
              <h2 className="text-xl font-black font-display text-white">
                Private Student Reviews ({reviews.length})
              </h2>
              <p className="text-xs text-slate-400">
                Average Rating: <b className="text-amber-400 font-black">{avgRating} / 5.0 ★</b> • Only visible to Admin
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Star Rating Filter */}
              <select
                value={selectedStarFilter}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedStarFilter(val === 'ALL' ? 'ALL' : parseInt(val, 10));
                }}
                className="w-full sm:w-auto bg-slate-950 border border-purple-500/40 rounded-xl px-3 py-2 text-xs font-bold text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="ALL">All Star Ratings ({reviews.length})</option>
                <option value="5">5 Stars 🌟</option>
                <option value="4">4 Stars 👍</option>
                <option value="3">3 Stars 👌</option>
                <option value="2">2 Stars 😐</option>
                <option value="1">1 Star 👎</option>
              </select>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search reviewer or review text..."
                value={reviewSearchTerm}
                onChange={(e) => setReviewSearchTerm(e.target.value)}
                className="w-full sm:w-56 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {loadingReviews ? (
              <div className="text-center py-12 text-slate-400 font-medium">Loading private review database...</div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-medium">
                No private student reviews submitted matching your criteria yet.
              </div>
            ) : (
              filteredReviews.map((rev) => {
                const recId = rev.id || `rev-${Math.random()}`;
                const cleanPhone = (rev.userPhone || '').replace(/\D/g, '');
                const formattedPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : cleanPhone;
                const waUrl = cleanPhone ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(`Hi ${rev.userName}! Thanks for submitting your review on MockLab!`)}` : '#';

                return (
                  <div
                    key={recId}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col gap-3 text-left"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
                      {/* Reviewer PFP & Details */}
                      <div className="flex items-center gap-3">
                        {rev.userPhotoURL ? (
                          <img
                            src={rev.userPhotoURL}
                            alt={rev.userName}
                            className="w-10 h-10 rounded-2xl object-cover border border-purple-400/40 shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-2xl bg-purple-900/60 text-purple-200 border border-purple-500/40 font-black flex items-center justify-center text-xs shrink-0 shadow-sm">
                            {getUserInitials(rev.userName)}
                          </div>
                        )}

                        <div>
                          <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                            <span>{rev.userName}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              {rev.userEmail || 'Student'}
                            </span>
                          </h3>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
                            {rev.userPhone && rev.userPhone !== 'No Phone' ? (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
                                title="Message reviewer on WhatsApp"
                              >
                                <span>💬</span> {rev.userPhone}
                              </a>
                            ) : (
                              <span className="font-mono text-slate-500">💬 No Phone</span>
                            )}
                            <span>•</span>
                            <span className="font-medium text-slate-400">{rev.dateString}</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating Stars Badge */}
                      <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl shrink-0">
                        <span className="text-amber-400 font-black text-sm">
                          {'★'.repeat(rev.rating)}
                        </span>
                        <span className="text-slate-600 dark:text-slate-600 font-black text-sm">
                          {'★'.repeat(5 - rev.rating)}
                        </span>
                        <span className="text-xs font-black text-amber-300 ml-1.5">{rev.rating}.0</span>
                      </div>
                    </div>

                    {/* Review Comment Text */}
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      "{rev.comment}"
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
});

AdminScreen.displayName = 'AdminScreen';
export default AdminScreen;
