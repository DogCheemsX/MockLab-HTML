import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { useAuth } from './hooks/useAuth';
import { useTestSession } from './hooks/useTestSession';
import { ADMIN_EMAIL, SUPPORT_WHATSAPP_URL } from './constants/config';

import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { BackToTopButton } from './components/common/BackToTopButton';
import { ThemeToggle } from './components/common/ThemeToggle';
import { SettingsModal } from './components/settings/SettingsModal';

import { ScrollToTop } from './components/common/ScrollToTop';

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

import { ReviewModal } from './components/modals/ReviewModal';

// Lazy-loaded Admin Screen
const AdminScreen = lazy(() => import('./features/admin/AdminScreen'));

export const App: React.FC = () => {
  const { user, userData, loading: authLoading } = useAuth();
  const testSession = useTestSession();
  const location = useLocation();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

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
            <ScrollToTop />
            <div className="w-full min-h-screen flex flex-col items-center justify-between p-3 sm:p-6 lg:p-8 bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-white transition-colors duration-300">

              <ThemeToggle onOpenSettings={undefined} />
              <main className="w-full max-w-6xl lg:max-w-7xl flex flex-col items-center justify-center flex-1 pt-12 sm:pt-6 pb-4 sm:pb-6">


                <div key={`guest-${location.pathname}`} className="w-full flex flex-col items-center animate-page-enter">
                  <Routes location={location}>
                    <Route path="/unipath" element={<UniPathMatcherScreen />} />
                    <Route path="*" element={<AuthScreen />} />
                  </Routes>
                </div>
              </main>

              <footer className="w-full text-center py-5 text-xs text-slate-500 dark:text-slate-400 font-medium border-t border-slate-200/80 dark:border-slate-800/60 mt-8 flex flex-col items-center justify-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={SUPPORT_WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/30 dark:border-emerald-500/40 dark:text-emerald-300 font-bold text-xs sm:text-sm shadow-sm dark:shadow-lg backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
                  >

                    <img src="whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
                    <span>Have any doubts? Message us on WhatsApp!</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsReviewOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 dark:bg-purple-600/20 dark:hover:bg-purple-600/30 dark:border-purple-500/40 dark:text-purple-300 font-bold text-xs sm:text-sm shadow-sm dark:shadow-lg backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>⭐ Leave a Review</span>
                  </button>
                </div>
                <p>© {new Date().getFullYear()} MockLab Entry Test Prep • Designed for Pakistani University Aspirants</p>
              </footer>

              <BackToTopButton />
              <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onLogout={handleLogout}
              />
              <ReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                user={user}
                userData={userData}
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
          <ScrollToTop />
          <div className="w-full min-h-screen flex flex-col items-center justify-between p-3 sm:p-6 lg:p-8 bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-white transition-colors duration-300">

              <ThemeToggle user={user} userData={userData} onOpenSettings={() => setIsSettingsOpen(true)} />
            <main className="w-full max-w-6xl lg:max-w-7xl flex flex-col items-center justify-center flex-1 pt-12 sm:pt-6 pb-4 sm:pb-6">


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
                    element={<SelectUniversityScreen userData={userData} />}
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

            <footer className="w-full text-center py-5 text-xs text-slate-500 dark:text-slate-400 font-medium border-t border-slate-200/80 dark:border-slate-800/60 mt-8 flex flex-col items-center justify-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={SUPPORT_WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/30 dark:border-emerald-500/40 dark:text-emerald-300 font-bold text-xs sm:text-sm shadow-sm dark:shadow-lg backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
                >

                  <img src="whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
                  <span>Have any doubts? Message us on WhatsApp!</span>
                </a>
                <a
                  href="https://www.reddit.com/user/MockLabPK/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 dark:bg-orange-600/20 dark:hover:bg-orange-600/30 dark:border-orange-500/40 dark:text-orange-300 font-bold text-xs sm:text-sm shadow-sm dark:shadow-lg backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5 fill-current text-orange-600 dark:text-orange-400 shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.196-.491.936 0 1.696.76 1.696 1.696 0 .693-.416 1.29-1.018 1.554.02.19.03.383.03.578 0 2.973-3.479 5.388-7.77 5.388-4.29 0-7.77-2.415-7.77-5.388 0-.19.01-.383.03-.578A1.696 1.696 0 0 1 3.456 12.2a1.696 1.696 0 0 1 1.696-1.696c.465 0 .888.182 1.196.491 1.194-.856 2.85-1.418 4.674-1.488l.968-4.542 3.32.702c.08-.43.46-.723.90-.723zM9.544 14.862c-.687 0-1.248.56-1.248 1.248 0 .688.561 1.248 1.248 1.248.688 0 1.249-.56 1.249-1.248 0-.688-.561-1.248-1.249-1.248zm4.912 0c-.687 0-1.249.56-1.249 1.248 0 .688.562 1.248 1.249 1.248.688 0 1.249-.56 1.249-1.248 0-.688-.561-1.248-1.249-1.248zm-4.73 3.65c.677.677 2.128.72 2.274.72.146 0 1.597-.043 2.274-.72.096-.096.096-.252 0-.348a.247.247 0 0 0-.348 0c-.496.496-1.652.548-1.926.548-.274 0-1.43-.052-1.926-.548a.247.247 0 0 0-.348 0c-.096.096-.096.252 0 .348z" />
                  </svg>
                  <span>Follow u/MockLabPK on Reddit</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 dark:bg-purple-600/20 dark:hover:bg-purple-600/30 dark:border-purple-500/40 dark:text-purple-300 font-bold text-xs sm:text-sm shadow-sm dark:shadow-lg backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>⭐ Leave a Review</span>
                </button>
              </div>
              <p>© {new Date().getFullYear()} MockLab Entry Test Prep • Designed for Pakistani University Aspirants</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-center leading-relaxed mt-4">
                MockLab is an independent educational prep platform and is not affiliated with, endorsed by, or connected to NTS, PIEAS, COMSATS, or any other university or testing body. All registered trademarks and test patterns belong to their respective institutions.
              </p>
            </footer>


            <BackToTopButton />
            <SettingsModal
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              onLogout={handleLogout}
            />
            <ReviewModal
              isOpen={isReviewOpen}
              onClose={() => setIsReviewOpen(false)}
              user={user}
              userData={userData}
            />
          </div>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
};
