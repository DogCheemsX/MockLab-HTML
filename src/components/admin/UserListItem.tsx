import React from 'react';
import { AdminUserRecord } from '../../types/auth';

interface UserListItemProps {
  user: AdminUserRecord;
  onToggleStatus: (uid: string, currentStatus: boolean) => Promise<void>;
}

export const UserListItem: React.FC<UserListItemProps> = React.memo(({ user, onToggleStatus }) => {
  const isPrem = user.isPremium;
  const buttonColor = isPrem
    ? 'bg-green-500 hover:bg-green-400 text-white'
    : 'bg-gray-600 hover:bg-gray-500 text-gray-200';
  const buttonText = isPrem ? 'Premium ON 👑' : 'Premium OFF';

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900 border border-gray-700 p-4 rounded-lg">
      <div className="text-left w-full md:w-auto mb-3 md:mb-0">
        <h3 className="text-lg font-bold text-white">{user.name || 'Unknown'}</h3>
        <p className="text-sm text-gray-400">{user.email || 'No Email'}</p>
        <p className="text-sm text-indigo-300 font-mono">📱 {user.whatsapp || 'No Number'}</p>
      </div>
      <button
        onClick={() => onToggleStatus(user.uid, isPrem)}
        className={`w-full md:w-auto font-bold py-2 px-4 rounded-lg transition-colors shadow ${buttonColor}`}
      >
        {buttonText}
      </button>
    </div>
  );
});

UserListItem.displayName = 'UserListItem';
