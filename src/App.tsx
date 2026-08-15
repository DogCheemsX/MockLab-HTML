import React, { useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { useAuth } from './hooks/useAuth';
import { useTestSession } from './hooks/useTestSession';
import { ADMIN_EMAIL } from './constants/config';

// Common Components
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Feature Views
import { AuthScreen } from './features/auth/AuthScreen';
import { IntroScreen } from './features/intro/IntroScreen';
import { SelectUniversityScreen } from './features/test-selection/SelectUniversityScreen';
import { SelectTypeScreen } from './features/test-selection/SelectTypeScreen';
import { TestInfoScreen } from './features/test-selection/TestInfoScreen';
import { ActiveTestScreen } from './features/test-runner/ActiveTestScreen';
import { TestResultScreen } from './features/results/TestResultScreen';

// Lazy-loaded Admin Screen
const AdminScreen = lazy(() => import('./features/admin/AdminScreen'));

export const App: React.FC = () => {
  const { user, userData, loading: authLoading } = useAuth();
  const testSession = useTestSession();

  const handleLogout = useCallback(() => {
    signOut(auth);
    testSession.clearSession();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }, [testSession]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <ErrorBoundary>
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
          <AuthScreen />
        </div>
      </ErrorBoundary>
    );
  }

  const isAdmin = user.email === ADMIN_EMAIL;

  return (
    <ErrorBoundary>
      <div className="w-full min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
        <main className="w-full max-w-5xl flex flex-col items-center justify-center flex-1 py-4 sm:py-6">
          <Routes>
            <Route
              path="/"
              element={<IntroScreen user={user} userData={userData} onLogout={handleLogout} />}
            />
            <Route
              path="/select-university"
              element={<SelectUniversityScreen />}
            />
            <Route
              path="/select-type/:uniKey"
              element={<SelectTypeScreen userData={userData} />}
            />
            <Route
              path="/test-info/:uniKey/:typeId"
              element={<TestInfoScreen testSession={testSession} />}
            />
            <Route
              path="/test-runner"
              element={<ActiveTestScreen testSession={testSession} />}
            />
            <Route
              path="/results"
              element={<TestResultScreen testSession={testSession} />}
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <Suspense fallback={<LoadingSpinner />}>
                    <AdminScreen />
                  </Suspense>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="w-full text-center py-4 text-xs text-slate-500 font-medium border-t border-slate-800/60 mt-8">
          <p>© {new Date().getFullYear()} MockLab Entry Test Prep • Designed for Pakistani University Aspirants</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
};
