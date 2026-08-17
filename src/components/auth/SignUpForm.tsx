import React, { useState } from 'react';

interface SignUpFormProps {
  onSignUp: (name: string, email: string, whatsapp: string, pass: string) => Promise<boolean>;
  onSwitchToLogin: () => void;
  loading: boolean;
  externalError?: string | null;
  onClearError?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = React.memo(
  ({ onSignUp, onSwitchToLogin, loading, externalError, onClearError }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{
      name?: boolean;
      email?: boolean;
      whatsapp?: boolean;
      password?: boolean;
    }>({});

    const activeError = externalError || localError;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLocalError(null);
      setFieldErrors({});
      if (onClearError) onClearError();

      const newErrors: { name?: boolean; email?: boolean; whatsapp?: boolean; password?: boolean } = {};
      if (!name.trim()) newErrors.name = true;
      if (!email.trim()) newErrors.email = true;
      if (!whatsapp.trim()) newErrors.whatsapp = true;
      if (!password) newErrors.password = true;

      if (Object.keys(newErrors).length > 0) {
        setFieldErrors(newErrors);
        setLocalError('Please fill in all required registration fields.');
        return;
      }

      if (password.length < 6) {
        setFieldErrors({ password: true });
        setLocalError('Password must be at least 6 characters long.');
        return;
      }

      await onSignUp(name.trim(), email.trim(), whatsapp.trim(), password);
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, fieldKey: keyof typeof fieldErrors) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setter(e.target.value);
      if (activeError) setLocalError(null);
      if (onClearError) onClearError();
      if (fieldErrors[fieldKey]) setFieldErrors((prev) => ({ ...prev, [fieldKey]: false }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Inline Error Feedback Banner */}
        {activeError && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2.5 animate-page-enter shadow-sm">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{activeError}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            placeholder="Muhammad Ali"
            value={name}
            onChange={handleInputChange(setName, 'name')}
            className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none transition-all text-sm font-medium ${
              fieldErrors.name
                ? 'border-red-500/60 ring-1 ring-red-500/40 focus:border-red-500'
                : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            placeholder="student@gmail.com"
            value={email}
            onChange={handleInputChange(setEmail, 'email')}
            className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none transition-all text-sm font-medium ${
              fieldErrors.email || (activeError && activeError.includes('email'))
                ? 'border-red-500/60 ring-1 ring-red-500/40 focus:border-red-500'
                : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">WhatsApp Number</label>
          <input
            type="text"
            placeholder="0300 1234567"
            value={whatsapp}
            onChange={handleInputChange(setWhatsapp, 'whatsapp')}
            className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none transition-all text-sm font-medium ${
              fieldErrors.whatsapp
                ? 'border-red-500/60 ring-1 ring-red-500/40 focus:border-red-500'
                : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 6 characters"
              value={password}
              onChange={handleInputChange(setPassword, 'password')}
              className={`w-full bg-slate-900/90 border rounded-xl pl-4 pr-11 py-2.5 text-white placeholder-slate-500 focus:outline-none transition-all text-sm font-medium ${
                fieldErrors.password
                  ? 'border-red-500/60 ring-1 ring-red-500/40 focus:border-red-500'
                  : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              }`}
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
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold text-base py-3.5 rounded-xl mt-3 transition-all duration-350 ease-soothing shadow-glow-indigo disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-indigo-400/30 active:scale-[0.98]"
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
  }
);

SignUpForm.displayName = 'SignUpForm';
