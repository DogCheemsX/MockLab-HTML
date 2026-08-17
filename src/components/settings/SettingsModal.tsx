import React, { useState, useEffect } from 'react';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { updateUserProfile } from '../../services/userService';
import { PAYMENT_INFO } from '../../constants/config';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onLogout }) => {
  const { user, userData, refreshUserData } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'preferences' | 'security'>('profile');
  const [isClosing, setIsClosing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Profile Form State
  const [name, setName] = useState(userData?.name || '');
  const [whatsapp, setWhatsapp] = useState(userData?.whatsapp || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setWhatsapp(userData.whatsapp || '');
    }
  }, [userData]);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setIsEditing(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleSmoothClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      await updateUserProfile(user.uid, {
        name: name.trim(),
        whatsapp: whatsapp.trim()
      });
      await refreshUserData();
      setIsEditing(false);
      showToast('Personal information updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to update profile. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEditing = () => {
    setName(userData?.name || '');
    setWhatsapp(userData?.whatsapp || '');
    setIsEditing(false);
  };

  const handleSendResetPassword = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      showToast(`Password reset link sent to ${user.email}`, 'success');
    } catch (err) {
      showToast('Failed to send password reset email.', 'error');
    }
  };

  const handleClearCache = () => {
    window.localStorage.clear();
    showToast('Local preferences & cache cleared!', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleSignOut = () => {
    handleSmoothClose();
    setTimeout(() => {
      if (onLogout) {
        onLogout();
      } else {
        signOut(auth);
        window.location.reload();
      }
    }, 220);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto ${
        isClosing ? 'animate-backdrop-exit' : 'animate-backdrop-enter'
      }`}
      onClick={handleSmoothClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className={`w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/80 relative overflow-hidden my-auto text-left ${
          isClosing ? 'animate-modal-exit' : 'animate-modal-enter'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-xl shrink-0">
              ⚙️
            </div>
            <div>
              <h2 id="settings-title" className="text-xl font-extrabold text-white tracking-tight">
                User Settings & Preferences
              </h2>
              <p className="text-xs text-slate-400">Manage your profile, personal details, and security</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSmoothClose}
            aria-label="Close Settings"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm font-bold focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-6 text-xs font-bold gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👤 Personal Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'account'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👑 Pass & Rank
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'preferences'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎨 Display & Theme
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔒 Security
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Credentials</span>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-all"
                >
                  <span>✏️</span> Edit Details
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                placeholder="Your Full Name"
                className={`w-full border rounded-xl px-3.5 py-2.5 font-medium text-xs sm:text-sm transition-all ${
                  isEditing
                    ? 'bg-slate-950 border-indigo-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 cursor-not-allowed'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Registered Email
              </label>
              <input
                type="email"
                value={user?.email || userData?.email || 'Guest User'}
                disabled
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-400 font-medium text-xs sm:text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                WhatsApp Contact Number
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                disabled={!isEditing}
                placeholder="0300 1234567"
                className={`w-full border rounded-xl px-3.5 py-2.5 font-medium text-xs sm:text-sm transition-all ${
                  isEditing
                    ? 'bg-slate-950 border-indigo-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 cursor-not-allowed'
                }`}
              />
            </div>

            {isEditing && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-glow-indigo transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Profile Changes 💾'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEditing}
                  disabled={saving}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all border border-slate-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        )}

        {activeTab === 'account' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Account Membership Tier</span>
                {userData?.isPremium ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold">
                    <span>👑</span> PREMIUM PASS ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                    <span>🌱</span> FREE ACCESS TIER
                  </span>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {userData?.isPremium
                  ? 'You have unlimited lifetime access to all FLP mock tests and question banks across NTS, COMSATS, PIEAS, Air, Bahria & CUST.'
                  : 'Upgrade to MockLab Premium Pass for lifetime access to all full-length paper simulations and answer keys.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Student Account ID:</span>
                <span className="font-mono text-indigo-300 font-bold text-[11px] truncate max-w-[200px]">{user?.uid || 'Guest'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Account Email:</span>
                <span className="text-slate-200 font-semibold">{user?.email || 'N/A'}</span>
              </div>
            </div>

            {!userData?.isPremium && (
              <a
                href={PAYMENT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-glow-emerald transition-all flex items-center justify-center gap-2 border border-emerald-400/30 text-center"
              >
                <img src="whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                <span>Upgrade to Premium Pass (PKR {PAYMENT_INFO.amount})</span>
              </a>
            )}
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">Theme Appearance</h4>
                <p className="text-slate-400 text-xs">Choose between Dark Mode or Light Mode</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold flex items-center gap-2 transition-all"
              >
                <span>{theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">Reset Local Cache & Preferences</h4>
                <p className="text-slate-400 text-xs">Clear saved UniPath inputs & search filters</p>
              </div>
              <button
                type="button"
                onClick={handleClearCache}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold transition-all"
              >
                Clear Storage 🗑️
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div>
                <h4 className="font-bold text-white text-sm">Password Security</h4>
                <p className="text-slate-400 text-xs">Request an automated password reset link via email</p>
              </div>
              <button
                type="button"
                onClick={handleSendResetPassword}
                className="w-full bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold py-2.5 px-4 rounded-xl border border-slate-700 transition-all text-center"
              >
                Send Password Reset Email 📧
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-bold py-3 px-4 rounded-xl border border-rose-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>🚪</span> Sign Out of MockLab Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
