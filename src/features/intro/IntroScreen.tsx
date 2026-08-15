import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UserProfile } from '../../types/auth';
import { ADMIN_EMAIL } from '../../constants/config';

interface IntroScreenProps {
  user: User | null;
  userData: UserProfile | null;
  onLogout: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = React.memo(({ user, userData, onLogout }) => {
  const navigate = useNavigate();
  const isAdmin = user?.email === ADMIN_EMAIL;

  const displayName = userData
    ? `${userData.name}${userData.isPremium ? ' (Premium 👑)' : ' (Free Account)'}`
    : 'Student';

  return (
    <div id="screen-intro" className="w-full max-w-lg flex flex-col items-center text-center">
      <img src="MockLab.png" alt="MockLab Logo" className="w-48 h-auto mb-6 drop-shadow-md mx-auto" />
      <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-indigo-400">MockLab</h1>
      <p className="text-lg text-gray-300 mb-6 font-medium px-4">
        The ultimate entry test portal for all universities in Pakistan. Master your preparation for NTS NAT, PIEAS, Air University, and Bahria.
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-full px-6 py-2 mb-8 flex items-center gap-3 mx-auto w-max">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <span className="text-sm font-bold text-gray-300">
          Logged in as <span className="text-white">{displayName}</span>
        </span>
        <button onClick={onLogout} className="text-xs text-red-400 hover:text-red-300 ml-2 underline">
          Logout
        </button>
      </div>

      {isAdmin && (
        <button
          onClick={() => navigate('/admin')}
          className="w-full bg-red-700 hover:bg-red-600 text-white transition-all font-extrabold text-xl py-3 px-8 rounded-xl shadow-lg mb-4"
        >
          👑 Secret Admin Dashboard
        </button>
      )}

      <button
        onClick={() => navigate('/select-university')}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all font-extrabold text-xl py-4 px-8 rounded-xl shadow-lg hover:-translate-y-1"
      >
        🚀 Enter Portal
      </button>
    </div>
  );
});

IntroScreen.displayName = 'IntroScreen';
