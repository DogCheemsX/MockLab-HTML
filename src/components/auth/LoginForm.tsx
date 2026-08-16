import React, { useState, useRef, useEffect } from 'react';

interface LoginFormProps {
  onLogin: (email: string, pass: string) => Promise<boolean>;
  onSwitchToSignUp: () => void;
  onForgotPassword: (currentEmail?: string) => void;
  loading: boolean;
  externalError?: string | null;
  onClearError?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = React.memo(
  ({ onLogin, onSwitchToSignUp, onForgotPassword, loading, externalError, onClearError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: boolean; password?: boolean }>({});

    const passwordInputRef = useRef<HTMLInputElement>(null);

    const activeError = externalError || localError;

    // Focus password field on authentication error for quick re-entry
    useEffect(() => {
      if (externalError) {
        setPassword('');
        setFieldErrors({ email: false, password: true });
        passwordInputRef.current?.focus();
      }
    }, [externalError]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLocalError(null);
      setFieldErrors({});
      if (onClearError) onClearError();

      const newFieldErrors: { email?: boolean; password?: boolean } = {};
      if (!email.trim()) newFieldErrors.email = true;
      if (!password) newFieldErrors.password = true;

      if (newFieldErrors.email || newFieldErrors.password) {
        setFieldErrors(newFieldErrors);
        setLocalError('Please enter both your email address and password.');
        if (newFieldErrors.password && !newFieldErrors.email) {
          passwordInputRef.current?.focus();
        }
        return;
      }

      const success = await onLogin(email.trim(), password);
      if (!success) {
        setPassword('');
        setFieldErrors({ email: true, password: true });
        passwordInputRef.current?.focus();
      }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (activeError) setLocalError(null);
      if (onClearError) onClearError();
      if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: false }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (activeError) setLocalError(null);
      if (onClearError) onClearError();
      if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: false }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Clean High-Contrast Error Feedback Banner */}
        {activeError && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2.5 animate-page-enter shadow-sm">
            <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{activeError}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={handleEmailChange}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all text-sm font-medium ${
                fieldErrors.email || (activeError && !fieldErrors.password)
                  ? 'border-red-500/60 ring-1 ring-red-500/40 focus:border-red-500'
                  : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              }`}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <button
              type="button"
              onClick={() => onForgotPassword(email)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              ref={passwordInputRef}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full bg-slate-900/90 border rounded-xl pl-4 pr-11 py-3 text-white placeholder-slate-500 focus:outline-none transition-all text-sm font-medium ${
                fieldErrors.password || activeError
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
  }
);

LoginForm.displayName = 'LoginForm';
