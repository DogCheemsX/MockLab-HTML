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

          {/* No Sign-Up Required: UniPath Matcher Feature Card */}
          <div className="w-full max-w-md mt-4">
            <button
              onClick={() => navigate('/unipath')}
              className="w-full relative overflow-hidden rounded-2xl p-5 sm:p-6 text-left flex items-center justify-between group border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-950/80 via-emerald-900/50 to-teal-950/80 shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400/40 flex items-center justify-center font-bold text-2xl sm:text-3xl shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  🎯
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      NO SIGN-UP REQUIRED
                    </span>
                  </div>
                  <h3 className="font-black text-white text-base sm:text-lg group-hover:text-emerald-300 transition-colors leading-tight">
                    Check Eligible Universities for You
                  </h3>
                </div>
              </div>

              <div className="relative z-10 hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg group-hover:bg-emerald-400 group-hover:scale-105 transition-all shrink-0 ml-3">
                <span>Check Now</span>
                <span className="text-base font-bold transition-transform group-hover:translate-x-1">→</span>
              </div>
              <div className="relative z-10 sm:hidden w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-base shadow-lg group-hover:bg-emerald-400 shrink-0 ml-2">
                →
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Glass Auth Form Box */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 shadow-glass border border-slate-700/60 relative overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};
