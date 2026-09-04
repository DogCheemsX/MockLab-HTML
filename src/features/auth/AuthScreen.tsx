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
    <div id="screen-auth" className="w-full max-w-6xl lg:max-w-7xl flex flex-col items-center relative z-10 my-auto py-6">
      {/* Universal PC Responsive 2-Column Horizontal Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
        {/* Left Column: Brand Header, Logo, Description & UniPath Card */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Header />

          {/* UniPath Matcher Feature Card - Coming Soon */}
          <div className="w-full max-w-md mt-4">
            <button
              onClick={() => navigate('/unipath')}
              className="w-full relative overflow-hidden rounded-2xl p-5 sm:p-6 text-left flex items-center justify-between group border-2 border-amber-300/80 bg-white shadow-sm hover:shadow-md hover:border-amber-400 dark:bg-gradient-to-r dark:from-amber-950/40 dark:via-slate-900/90 dark:to-amber-950/30 dark:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-50 text-amber-700 border-2 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-400/40 flex items-center justify-center font-bold text-2xl sm:text-3xl shrink-0 shadow-sm">
                  🎯
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-500/30 dark:text-amber-300 dark:border-amber-400/40 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      COMING SOON
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg leading-tight">
                    Check Eligible Universities
                  </h3>
                </div>
              </div>

              <div className="relative z-10 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold text-xs border border-amber-400/30 shrink-0 ml-3">
                <span>Coming Soon ⏳</span>
              </div>
              <div className="relative z-10 sm:hidden w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 font-extrabold flex items-center justify-center text-base shrink-0 ml-2 border border-amber-400/30">
                ⏳
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Glass Auth Form Box */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-700/60 dark:shadow-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Tab switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 mb-8">
              <button
                onClick={() => handleSwitchMode('login')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-350 ease-soothing ${
                  mode === 'login'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => handleSwitchMode('signup')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-350 ease-soothing ${
                  mode === 'signup'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Create new account
              </button>
            </div>

            <div key={mode} className="animate-page-enter">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {mode === 'login'
                    ? 'Welcome Back Student'
                    : mode === 'signup'
                    ? 'Join MockLab Portal'
                    : 'Reset Your Password'}
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {mode === 'login'
                    ? 'Enter your credentials to access test series'
                    : mode === 'signup'
                    ? 'Sign up to start practicing University MCQs'
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
        </div>
      </div>
    </div>
  );
};
