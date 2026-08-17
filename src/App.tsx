import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { useAuth } from './hooks/useAuth';
import { useTestSession } from './hooks/useTestSession';
import { ADMIN_EMAIL } from './constants/config';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { BackToTopButton } from './components/common/BackToTopButton';
import { ThemeToggle } from './components/common/ThemeToggle';
import { SettingsModal } from './components/settings/SettingsModal';

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
import { UniPathMatcherScreen } from './features/unipath/UniPathMatcherScreen';

// Lazy-loaded Admin Screen
const AdminScreen = lazy(() => import('./features/admin/AdminScreen'));

export const App: React.FC = () => {
  const { user, userData, loading: authLoading } = useAuth();
  const testSession = useTestSession();
  const location = useLocation();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
      <ThemeProvider>
        <ToastProvider>
          <ErrorBoundary>
            <div className="w-full min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
              <ThemeToggle onOpenSettings={undefined} />
              <main className="w-full max-w-5xl flex flex-col items-center justify-center flex-1 py-4 sm:py-6">
                <div key={`guest-${location.pathname}`} className="w-full flex flex-col items-center animate-page-enter">
                  <Routes location={location}>
                    <Route path="/unipath" element={<UniPathMatcherScreen />} />
                    <Route path="*" element={<AuthScreen />} />
                  </Routes>
                </div>
              </main>

              <footer className="w-full text-center py-5 text-xs text-slate-500 font-medium border-t border-slate-800/60 mt-8 flex flex-col items-center justify-center gap-3">
                <a
                  href="https://wa.me/923465939277?text=Hi%20MockLab!%20I%20have%20a%20question%20about%20the%20entry%20test%20prep."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm shadow-lg backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
                >
                  <img src="whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
                  <span>Have any doubts? Message us on WhatsApp!</span>
                </a>
                <p>© {new Date().getFullYear()} MockLab Entry Test Prep • Designed for Pakistani University Aspirants</p>
              </footer>

              <BackToTopButton />
              <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onLogout={handleLogout}
              />
            </div>
          </ErrorBoundary>
        </ToastProvider>
      </ThemeProvider>
    );
  }

  const isAdmin = user.email === ADMIN_EMAIL;

  return (
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <div className="w-full min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
            <ThemeToggle onOpenSettings={() => setIsSettingsOpen(true)} />
            <main className="w-full max-w-5xl flex flex-col items-center justify-center flex-1 py-4 sm:py-6">
              <div key={`${user.uid}-${location.pathname}`} className="w-full flex flex-col items-center animate-page-enter">
                <Routes location={location}>
                  <Route
                    path="/"
                    element={
                      <IntroScreen
                        user={user}
                        userData={userData}
                        onLogout={handleLogout}
                        onOpenSettings={() => setIsSettingsOpen(true)}
                      />
                    }
                  />
                  <Route
                    path="/unipath"
                    element={<UniPathMatcherScreen />}
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
                    element={<TestInfoScreen testSession={testSession} userData={userData} />}
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
              </div>
            </main>

            <footer className="w-full text-center py-5 text-xs text-slate-500 font-medium border-t border-slate-800/60 mt-8 flex flex-col items-center justify-center gap-3">
              <a
                href="https://wa.me/923465939277?text=Hi%20MockLab!%20I%20have%20a%20question%20about%20the%20entry%20test%20prep."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs sm:text-sm shadow-lg backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
              >
                <img src="whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
                <span>Have any doubts? Message us on WhatsApp!</span>
              </a>
              <p>© {new Date().getFullYear()} MockLab Entry Test Prep • Designed for Pakistani University Aspirants</p>
            </footer>

            <BackToTopButton />
            <SettingsModal
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              onLogout={handleLogout}
            />
          </div>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
};
