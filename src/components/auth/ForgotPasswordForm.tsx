import React, { useState } from 'react';

interface ForgotPasswordFormProps {
  initialEmail?: string;
  onSendReset: (email: string) => Promise<boolean>;
  onBackToLogin: () => void;
  loading: boolean;
  externalError?: string | null;
  onClearError?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = React.memo(
  ({ initialEmail = '', onSendReset, onBackToLogin, loading, externalError, onClearError }) => {
    const [email, setEmail] = useState(initialEmail);
    const [localError, setLocalError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [fieldHasError, setFieldHasError] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLocalError(null);
      setSuccessMessage(null);
      setFieldHasError(false);

      if (!email.trim()) {
        setLocalError('Please enter your email address.');
        setFieldHasError(true);
        return;
      }

      // Simple email format check
      if (!/\S+@\S+\.\S+/.test(email)) {
        setLocalError('Please enter a valid email address.');
        setFieldHasError(true);
        return;
      }

      const success = await onSendReset(email.trim());
      if (success) {
        setSuccessMessage('Please check your Inbox (and Spam / Junk folder if it doesn\'t appear within 1–2 minutes).');
        setFieldHasError(false);
      } else {
        setFieldHasError(true);
      }
    };

    const activeError = externalError || localError;

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (activeError) {
        setLocalError(null);
        if (onClearError) onClearError();
      }
      if (fieldHasError) {
        setFieldHasError(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Success Feedback Banner */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-medium flex items-start gap-3 animate-page-enter shadow-lg text-left">
            <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-white text-xs sm:text-sm">Password Reset Email Sent! ✉️</span>
              <span className="leading-relaxed text-emerald-200">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Error Feedback Banner */}
        {activeError && !successMessage && (
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
                fieldHasError || activeError
                  ? 'border-red-500/60 ring-1 ring-red-500/40 focus:border-red-500'
                  : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              }`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 border border-indigo-400/30"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Reset Link...
            </>
          ) : (
            'Send Reset Link 📧'
          )}
        </button>

        <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
          Please check your Spam or Junk folder if the email doesn't appear in your inbox within 1–2 minutes.
        </p>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-3 rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-1.5 mt-2"
        >
          ← Back to Login
        </button>
      </form>
    );
  }
);

ForgotPasswordForm.displayName = 'ForgotPasswordForm';
