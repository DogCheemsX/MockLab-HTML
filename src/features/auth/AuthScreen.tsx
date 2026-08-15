import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { createUserProfile } from '../../services/userService';
import { Header } from '../../components/common/Header';
import { LoginForm } from '../../components/auth/LoginForm';
import { SignUpForm } from '../../components/auth/SignUpForm';
import { AuthMode } from '../../types/auth';

export const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      alert('Login Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (name: string, email: string, whatsapp: string, pass: string) => {
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      await createUserProfile(userCred.user.uid, { name, email, whatsapp });
    } catch (error: any) {
      alert('Registration Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="screen-auth" className="w-full max-w-md flex flex-col items-center relative z-10 my-auto py-6">
      <Header />

      <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-glass border border-slate-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Tab switcher */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 mb-8">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mode === 'login'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mode === 'signup'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {mode === 'login' ? 'Welcome Back Student' : 'Join MockLab Portal'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Enter your credentials to access test series'
              : 'Sign up to start practicing NTS NAT & University MCQs'}
          </p>
        </div>

        {mode === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignUp={() => setMode('signup')}
            loading={loading}
          />
        ) : (
          <SignUpForm
            onSignUp={handleSignUp}
            onSwitchToLogin={() => setMode('login')}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

