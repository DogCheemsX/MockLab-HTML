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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !whatsapp || !password) {
      alert('Please fill in all fields!');
      return;
    }
    await onSignUp(name, email, whatsapp, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-all font-medium"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-all font-medium"
      />
      <input
        type="text"
        placeholder="03XX (WhatsApp Number)"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        className="w-full bg-gray-900/60 border border-gray-600 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-all font-medium"
      />
      <input
        type="password"
        placeholder="Password (Min 6 characters)"
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
            Creating Account...
          </>
        ) : (
          'Sign Up 🚀'
        )}
      </button>
      <p className="text-center text-sm text-gray-400 mt-6 font-medium">
        Already have an account?{' '}
        <span
          onClick={onSwitchToLogin}
          className="text-indigo-400 font-bold cursor-pointer hover:underline"
        >
          Log In
        </span>
      </p>
    </form>
  );
});

SignUpForm.displayName = 'SignUpForm';
