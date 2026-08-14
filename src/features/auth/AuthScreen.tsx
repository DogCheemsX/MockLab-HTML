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
      alert('Error: ' + error.message);
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
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="screen-auth" className="w-full max-w-md flex flex-col items-center relative z-10">
      <Header />

      <div className="w-full bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-[0_0_40px_rgba(79,70,229,0.15)]">
        <h1 className="text-3xl font-black mb-8 tracking-tight text-white text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>

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
