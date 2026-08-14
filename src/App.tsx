import React, { useState, useCallback, lazy, Suspense } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { useAuth } from './hooks/useAuth';
import { useTimer } from './hooks/useTimer';
import { useTestSession } from './hooks/useTestSession';
import { testData } from './data/testData';
import { questionBank } from './data/questionBank';
import { AppScreen, UniversityKey, TestInfo } from './types/test';

// Common Components
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Feature Components
import { AuthScreen } from './features/auth/AuthScreen';
import { IntroScreen } from './features/intro/IntroScreen';
import { SelectUniversityScreen } from './features/test-selection/SelectUniversityScreen';
import { SelectTypeScreen } from './features/test-selection/SelectTypeScreen';
import { TestInfoScreen } from './features/test-selection/TestInfoScreen';
import { ActiveTestScreen } from './features/test-runner/ActiveTestScreen';
import { TestResultScreen } from './features/results/TestResultScreen';
import { PremiumModal } from './components/modals/PremiumModal';

// Lazy-loaded Admin Screen
const AdminScreen = lazy(() => import('./features/admin/AdminScreen'));

export const App: React.FC = () => {
  const { user, userData, loading: authLoading } = useAuth();

  // Navigation State
  const [screen, setScreen] = useState<AppScreen>('intro');
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState<boolean>(false);

  // Selected Test State
  const [currentUni, setCurrentUni] = useState<UniversityKey | null>(null);
  const [currentTestId, setCurrentTestId] = useState<string | null>(null);
  const [currentTestTitle, setCurrentTestTitle] = useState<string>('');
  const [testTimeMinutes, setTestTimeMinutes] = useState<number>(0);
  const [currentInfo, setCurrentInfo] = useState<TestInfo | null>(null);

  // Active Test Session Hook
  const {
    activeQuestions,
    currentQIndex,
    userAnswers,
    reviewStatus,
    score,
    initSession,
    saveAnswer,
    toggleReview,
    jumpToQuestion,
    jumpToNextSection,
    nextQuestion,
    prevQuestion,
    calculateFinalScore
  } = useTestSession();

  // Time-up handler
  const handleTimeUp = useCallback(() => {
    alert('Time is up! Submitting your test.');
    calculateFinalScore();
    setScreen('result');
  }, [calculateFinalScore]);

  // Countdown Timer Hook
  const { timeLeft, startTimer, stopTimer } = useTimer(handleTimeUp);

  // Logout Handler
  const handleLogout = useCallback(() => {
    signOut(auth);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }, []);

  // University Selection
  const handleSelectUniversity = useCallback((uniKey: UniversityKey) => {
    setCurrentUni(uniKey);
    setScreen('select-type');
    window.scrollTo(0, 0);
  }, []);

  // Type Selection
  const handleSelectType = useCallback(
    (typeId: string, typeName: string) => {
      if (typeId === 'nat-ie' && (!userData || userData.isPremium === false)) {
        setIsPremiumModalOpen(true);
        return;
      }

      if (!currentUni) return;

      setCurrentTestId(typeId);
      setCurrentTestTitle(typeName);

      const uniData = testData[currentUni];
      const infoData = uniData.info || (uniData.infoMap ? uniData.infoMap[typeId] : null);

      if (infoData) {
        setCurrentInfo(infoData);
        const minutes = parseInt(infoData.time.split(' ')[0], 10) || 120;
        setTestTimeMinutes(minutes);
      }

      setScreen('test-info');
      window.scrollTo(0, 0);
    },
    [currentUni, userData]
  );

  // Start Test
  const handleStartTest = useCallback(() => {
    if (!currentTestId) return;

    const questions = questionBank[currentTestId] || [];
    if (questions.length === 0) {
      alert('No questions found for this test category.');
      return;
    }

    initSession(questions);
    startTimer(testTimeMinutes * 60);
    setScreen('active-test');
    window.scrollTo(0, 0);
  }, [currentTestId, initSession, startTimer, testTimeMinutes]);

  // Submit Test
  const handleSubmitTest = useCallback(() => {
    stopTimer();
    calculateFinalScore();
    setScreen('result');
    window.scrollTo(0, 0);
  }, [stopTimer, calculateFinalScore]);

  // View switch logic based on auth loading
  if (authLoading) {
    return <LoadingSpinner />;
  }

  // Not logged in -> Show Auth screen
  if (!user) {
    return (
      <ErrorBoundary>
        <AuthScreen />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="w-full flex flex-col items-center justify-center">
        {screen === 'intro' && (
          <IntroScreen
            user={user}
            userData={userData}
            onLogout={handleLogout}
            onEnterPortal={() => setScreen('select-university')}
            onOpenAdmin={() => setScreen('admin')}
          />
        )}

        {screen === 'admin' && (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminScreen onBack={() => setScreen('intro')} />
          </Suspense>
        )}

        {screen === 'select-university' && (
          <SelectUniversityScreen
            onSelectUniversity={handleSelectUniversity}
            onBack={() => setScreen('intro')}
          />
        )}

        {screen === 'select-type' && currentUni && (
          <SelectTypeScreen
            options={testData[currentUni].options}
            onSelectType={handleSelectType}
            onBack={() => setScreen('select-university')}
          />
        )}

        {screen === 'test-info' && currentInfo && (
          <TestInfoScreen
            title={currentTestTitle}
            info={currentInfo}
            onStartTest={handleStartTest}
            onBack={() => setScreen('select-type')}
          />
        )}

        {screen === 'active-test' && (
          <ActiveTestScreen
            questions={activeQuestions}
            currentQIndex={currentQIndex}
            userAnswers={userAnswers}
            reviewStatus={reviewStatus}
            timeLeft={timeLeft}
            onSaveAnswer={saveAnswer}
            onToggleReview={toggleReview}
            onJumpToQuestion={jumpToQuestion}
            onJumpToNextSection={jumpToNextSection}
            onPrev={prevQuestion}
            onNext={nextQuestion}
            onSubmitTest={handleSubmitTest}
          />
        )}

        {screen === 'result' && (
          <TestResultScreen
            score={score}
            totalQuestions={activeQuestions.length}
            onReturnHome={() => setScreen('select-university')}
          />
        )}

        <PremiumModal
          isOpen={isPremiumModalOpen}
          onClose={() => setIsPremiumModalOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
};
