import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUserPremiumStatus } from '../../services/userService';
import { AdminUserRecord } from '../../types/auth';
import { UserListItem } from '../../components/admin/UserListItem';

export const AdminScreen: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div id="screen-admin" className="w-full max-w-4xl flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-black text-red-400 tracking-tight">Admin Dashboard</h1>
        <div className="w-10"></div>
      </div>
      <div className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-white">All Registered Students</h2>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-gray-400">Loading students...</p>
          ) : error ? (
            <p className="text-red-400">Error: {error}</p>
          ) : users.length === 0 ? (
            <p className="text-gray-400">No students found.</p>
          ) : (
            users.map((u) => (
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
