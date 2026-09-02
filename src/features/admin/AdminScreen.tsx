import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUserPremiumStatus } from '../../services/userService';
import { AdminUserRecord } from '../../types/auth';
import { UserListItem } from '../../components/admin/UserListItem';

export const AdminScreen: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const records = await getAllUsers();
      setUsers(records);
    } catch (err: any) {
      setError(err.message || 'Error loading users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (uid: string, currentStatus: boolean) => {
    try {
      await updateUserPremiumStatus(uid, !currentStatus);
      await fetchUsers();
    } catch (err: any) {
      alert('Error updating status: ' + err.message);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term)) ||
        (u.whatsapp && u.whatsapp.includes(term))
    );
  }, [users, searchTerm]);

  const premiumCount = useMemo(() => users.filter((u) => u.isPremium).length, [users]);
  const freeCount = users.length - premiumCount;

  return (
    <div id="screen-admin" className="w-full max-w-4xl flex flex-col items-center py-2">
      {/* Top Header */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-6 mt-2 sm:mt-0">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-700/60 truncate"
        >
          <span>←</span> <span className="truncate">Back to Portal</span>
        </button>
        <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20 text-center truncate">
          Admin Console
        </span>
      </div>


      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-2">
          Student Management Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Manage registered accounts and toggle PRO access for Pakistani university applicants.
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
        <div className="glass-card p-4 rounded-2xl border border-slate-700/60">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Registered</p>
          <p className="text-2xl font-black text-white mt-1">{users.length}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-amber-500/30 bg-amber-950/10">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">PRO Members</p>

          <p className="text-2xl font-black text-amber-300 mt-1">{premiumCount}</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-700/60">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Free Accounts</p>
          <p className="text-2xl font-black text-slate-300 mt-1">{freeCount}</p>
        </div>
      </div>

      {/* Main Table Glass Container */}
      <div className="w-full glass-panel rounded-3xl p-6 shadow-glass border border-slate-700/80">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white self-start sm:self-auto">All Registered Students</h2>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {loading ? (
            <div className="text-center py-12 text-slate-400 font-medium">Loading student database...</div>
          ) : error ? (
            <div className="text-center py-12 text-rose-400 font-medium">Error: {error}</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium">No students match your query.</div>
          ) : (
            filteredUsers.map((u) => (
              <UserListItem key={u.uid} user={u} onToggleStatus={handleToggleStatus} />
            ))
          )}
        </div>
      </div>
    </div>
  );
});

AdminScreen.displayName = 'AdminScreen';
export default AdminScreen;

