import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  onSwitchToSignUp: () => void;
  loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = React.memo(({ onLogin, onSwitchToSignUp, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password!');
      return;
    }
    await onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-base py-3.5 rounded-xl mt-2 transition-all shadow-glow-indigo disabled:opacity-50 flex items-center justify-center gap-2 border border-indigo-400/30"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging In...
          </>
        ) : (
          'Log In 🚀'
        )}
      </button>

      <p className="text-center text-xs text-slate-400 mt-6 font-medium">
        New student?{' '}
        <span
          onClick={onSwitchToSignUp}
          className="text-indigo-400 font-bold cursor-pointer hover:text-indigo-300 transition-colors"
        >
          Create an account
        </span>
      </p>
    </form>
  );
});

LoginForm.displayName = 'LoginForm';

