import React from 'react';
import { AdminUserRecord } from '../../types/auth';

interface UserListItemProps {
  user: AdminUserRecord;
  onToggleStatus: (uid: string, currentStatus: boolean) => Promise<void>;
}

export const UserListItem: React.FC<UserListItemProps> = React.memo(({ user, onToggleStatus }) => {
  const isPrem = user.isPremium;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/90 border border-slate-800 p-4 rounded-xl hover:border-slate-700 transition-all gap-4">
      <div className="text-left">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-bold text-white">{user.name || 'Unknown Student'}</h3>
          {isPrem ? (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PRO
            </span>

          ) : (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              FREE
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 font-medium">{user.email || 'No Email Registered'}</p>
        <p className="text-xs text-indigo-400 font-mono mt-0.5 flex items-center gap-1">
          <span>💬</span> {user.whatsapp || 'No WhatsApp'}
        </p>
      </div>

      <button
        onClick={() => onToggleStatus(user.uid, isPrem)}
        className={`w-full sm:w-auto font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-sm border ${
          isPrem
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-500'
        }`}
      >
        {isPrem ? 'Revoke Premium Status' : 'Activate Premium PRO'}
      </button>
    </div>
  );
});

UserListItem.displayName = 'UserListItem';

