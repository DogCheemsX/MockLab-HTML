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
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-all font-medium"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-all font-medium"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg py-4 rounded-xl mt-4 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging In...
          </>
        ) : (
          'Log In 🚀'
        )}
      </button>
      <p className="text-center text-sm text-gray-400 mt-6 font-medium">
        New student?{' '}
        <span
          onClick={onSwitchToSignUp}
          className="text-indigo-400 font-bold cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
});

LoginForm.displayName = 'LoginForm';
