import React, { useState } from 'react';

interface SignUpFormProps {
  onSignUp: (name: string, email: string, whatsapp: string, pass: string) => Promise<void>;
  onSwitchToLogin: () => void;
  loading: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = React.memo(({ onSignUp, onSwitchToLogin, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !whatsapp || !password) {
      alert('Please fill in all fields!');
      return;
    }
    await onSignUp(name, email, whatsapp, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Full Name</label>
        <input
          type="text"
          placeholder="Muhammad Ali"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm font-medium"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Email Address</label>
        <input
          type="email"
          placeholder="student@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm font-medium"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">WhatsApp Number</label>
        <input
          type="text"
          placeholder="0300 1234567"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm font-medium"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Min 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-4 pr-11 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm font-medium"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-base py-3.5 rounded-xl mt-3 transition-all shadow-glow-indigo disabled:opacity-50 flex items-center justify-center gap-2 border border-indigo-400/30"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </>
        ) : (
          'Register Account 🚀'
        )}
      </button>

      <p className="text-center text-xs text-slate-400 mt-5 font-medium">
        Already have an account?{' '}
        <span
          onClick={onSwitchToLogin}
          className="text-indigo-400 font-bold cursor-pointer hover:text-indigo-300 transition-colors"
        >
          Sign In
        </span>
      </p>
    </form>
  );
});

SignUpForm.displayName = 'SignUpForm';

