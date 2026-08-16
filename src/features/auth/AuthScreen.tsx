import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../../services/firebase';
import { createUserProfile } from '../../services/userService';
import { Header } from '../../components/common/Header';
import { LoginForm } from '../../components/auth/LoginForm';
import { SignUpForm } from '../../components/auth/SignUpForm';
import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm';
import { AuthMode } from '../../types/auth';
import { formatAuthError } from '../../utils/authErrors';

export const AuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [typedEmail, setTypedEmail] = useState<string>('');

  const clearAuthError = () => {
    if (authError) setAuthError(null);
  };

  const handleSwitchMode = (newMode: AuthMode) => {
    setAuthError(null);
    setMode(newMode);
  };

  const handleLogin = async (email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return true;
    } catch (error: any) {
      const friendlyMsg = formatAuthError(error);
      setAuthError(friendlyMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    name: string,
    email: string,
    whatsapp: string,
    pass: string
  ): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      await createUserProfile(userCred.user.uid, { name, email, whatsapp });
      return true;
    } catch (error: any) {
      const friendlyMsg = formatAuthError(error);
      setAuthError(friendlyMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetEmail = async (email: string): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error: any) {
      const friendlyMsg = formatAuthError(error);
      setAuthError(friendlyMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = (currentEmail?: string) => {
    if (currentEmail) setTypedEmail(currentEmail);
    handleSwitchMode('forgot');
  };

  return (
    <div id="screen-auth" className="w-full max-w-md flex flex-col items-center relative z-10 my-auto py-6">
      <Header />

      <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-glass border border-slate-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Tab switcher */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 mb-8">
          <button
            onClick={() => handleSwitchMode('login')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-350 ease-soothing ${
              mode === 'login'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => handleSwitchMode('signup')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-350 ease-soothing ${
              mode === 'signup'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        <div key={mode} className="animate-page-enter">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {mode === 'login'
                ? 'Welcome Back Student'
                : mode === 'signup'
                ? 'Join MockLab Portal'
                : 'Reset Your Password'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {mode === 'login'
                ? 'Enter your credentials to access test series'
                : mode === 'signup'
                ? 'Sign up to start practicing NTS NAT & University MCQs'
                : 'Enter your email address to receive an automated password reset link'}
            </p>
          </div>

          {mode === 'login' && (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToSignUp={() => handleSwitchMode('signup')}
              onForgotPassword={handleForgotPasswordClick}
              loading={loading}
              externalError={authError}
              onClearError={clearAuthError}
            />
          )}

          {mode === 'signup' && (
            <SignUpForm
              onSignUp={handleSignUp}
              onSwitchToLogin={() => handleSwitchMode('login')}
              loading={loading}
              externalError={authError}
              onClearError={clearAuthError}
            />
          )}

          {mode === 'forgot' && (
            <ForgotPasswordForm
              initialEmail={typedEmail}
              onSendReset={handleSendResetEmail}
              onBackToLogin={() => handleSwitchMode('login')}
              loading={loading}
              externalError={authError}
              onClearError={clearAuthError}
            />
          )}
        </div>
      </div>

      {/* No Sign-Up Required: UniPath Matcher Feature Card */}
      <div className="w-full mt-5">
        <button
          onClick={() => navigate('/unipath')}
          className="w-full glass-card glass-card-hover rounded-2xl p-4 text-left flex items-center justify-between group border border-emerald-500/30 bg-emerald-950/20 shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-lg shrink-0">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-sm group-hover:text-emerald-300 transition-colors">
                  UniPath Matcher 2.0
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  NO SIGN-UP REQUIRED
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Check university & program eligibility instantly with your marks!
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all shrink-0 ml-2 font-bold text-xs">
            →
          </div>
        </button>
      </div>
    </div>
  );
};
