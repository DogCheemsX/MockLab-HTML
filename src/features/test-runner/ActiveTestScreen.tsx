import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { UseTestSessionReturn } from '../../hooks/useTestSession';
import { useTimer } from '../../hooks/useTimer';
import { TestHeader } from '../../components/test/TestHeader';
import { QuestionCard } from '../../components/test/QuestionCard';
import { OverviewGridModal } from '../../components/test/OverviewGridModal';
import { ExitConfirmModal } from '../../components/modals/ExitConfirmModal';

interface ActiveTestScreenProps {
  testSession: UseTestSessionReturn;
}

export const ActiveTestScreen: React.FC<ActiveTestScreenProps> = React.memo(({ testSession }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOverviewOpen, setIsOverviewOpen] = React.useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = React.useState(false);

  const {
    activeQuestions,
    currentQIndex,
    userAnswers,
    reviewStatus,
    storedSession,
    saveAnswer,
    toggleReview,
    jumpToQuestion,
    nextQuestion,
    prevQuestion,
    clearSession,
    calculateFinalScore
  } = testSession;

  // Handle countdown time up
  const handleTimeUp = React.useCallback(() => {
    alert('Time is up! Submitting your test.');
    calculateFinalScore();
    navigate('/results');
  }, [calculateFinalScore, navigate]);

  const { timeLeft, startTimer, stopTimer } = useTimer(handleTimeUp);

  // Sync URL query param `?q=N` with `currentQIndex`
  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam && activeQuestions.length > 0) {
      const qNum = parseInt(qParam, 10);
      if (!isNaN(qNum) && qNum >= 1 && qNum <= activeQuestions.length) {
        const targetIndex = qNum - 1;
        if (targetIndex !== currentQIndex) {
          jumpToQuestion(targetIndex);
        }
      }
    }
  }, [searchParams, activeQuestions.length, currentQIndex, jumpToQuestion]);

  // Sync state change back to `?q=N` URL parameter
  const handleJump = React.useCallback(
    (index: number) => {
      jumpToQuestion(index);
      setSearchParams({ q: (index + 1).toString() });
    },
    [jumpToQuestion, setSearchParams]
  );

  const handleNext = React.useCallback(() => {
    if (currentQIndex < activeQuestions.length - 1) {
      const nextIdx = currentQIndex + 1;
      nextQuestion();
      setSearchParams({ q: (nextIdx + 1).toString() });
    }
  }, [currentQIndex, activeQuestions.length, nextQuestion, setSearchParams]);

  const handlePrev = React.useCallback(() => {
    if (currentQIndex > 0) {
      const prevIdx = currentQIndex - 1;
      prevQuestion();
      setSearchParams({ q: (prevIdx + 1).toString() });
    }
  }, [currentQIndex, prevQuestion, setSearchParams]);

  const handleNextSection = React.useCallback(() => {
    if (activeQuestions.length === 0) return;
    const currentSubject = activeQuestions[currentQIndex]?.subject;
    
    let targetIndex = -1;
    for (let i = currentQIndex + 1; i < activeQuestions.length; i++) {
      if (activeQuestions[i].subject !== currentSubject) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex !== -1) {
      jumpToQuestion(targetIndex);
      setSearchParams({ q: (targetIndex + 1).toString() });
    } else {
      alert('You are currently in the final subject section of the test.');
    }
  }, [currentQIndex, activeQuestions, jumpToQuestion, setSearchParams]);

  const handlePrevSection = React.useCallback(() => {
    if (activeQuestions.length === 0 || currentQIndex === 0) return;
    const currentSubject = activeQuestions[currentQIndex]?.subject;
    
    let targetIndex = -1;
    for (let i = currentQIndex - 1; i >= 0; i--) {
      if (activeQuestions[i].subject !== currentSubject) {
        const prevSubject = activeQuestions[i].subject;
        let startOfPrevBlock = i;
        while (startOfPrevBlock > 0 && activeQuestions[startOfPrevBlock - 1].subject === prevSubject) {
          startOfPrevBlock--;
        }
        targetIndex = startOfPrevBlock;
        break;
      }
    }

    if (targetIndex !== -1) {
      jumpToQuestion(targetIndex);
      setSearchParams({ q: (targetIndex + 1).toString() });
    } else {
      alert('You are currently in the first subject section of the test.');
    }
  }, [currentQIndex, activeQuestions, jumpToQuestion, setSearchParams]);

  // Open custom Exit Confirmation Modal
  const handleExitClick = React.useCallback(() => {
    setIsExitModalOpen(true);
  }, []);

  // Confirm Exit Handler
  const handleConfirmExit = React.useCallback(() => {
    setIsExitModalOpen(false);
    stopTimer();
    clearSession();
    navigate('/select-university');
  }, [stopTimer, clearSession, navigate]);

  // Submit Test Handler
  const handleSubmitClick = React.useCallback(() => {
    const unanswered = activeQuestions.length - Object.keys(userAnswers).length;
    if (unanswered > 0) {
      if (!window.confirm(`You still have ${unanswered} unanswered questions. Are you sure you want to submit?`)) {
        return;
      }
    }
    stopTimer();
    calculateFinalScore();
    navigate('/results');
  }, [activeQuestions.length, userAnswers, stopTimer, calculateFinalScore, navigate]);

  // Start / Resume timer on session mount
  useEffect(() => {
    if (storedSession && storedSession.startTime && storedSession.durationSeconds) {
      startTimer(storedSession.durationSeconds, storedSession.startTime);
    }
  }, [storedSession, startTimer]);

  // Guard: If no valid session or test completed, redirect to /select-university
  if (!storedSession || activeQuestions.length === 0) {
    return <Navigate to="/select-university" replace />;
  }

  if (storedSession.completed) {
    return <Navigate to="/results" replace />;
  }

  const currentQuestion = activeQuestions[currentQIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const reviewCount = Object.values(reviewStatus).filter(Boolean).length;
  const isReview = !!reviewStatus[currentQIndex];

  return (
    <div id="screen-test" className="w-full max-w-5xl lg:max-w-6xl flex flex-col py-2">
      <TestHeader
        timeLeft={timeLeft}
        testTitle={storedSession.typeName}
        onExit={handleExitClick}
        onSubmit={handleSubmitClick}
      />

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          questionIndex={currentQIndex}
          totalQuestions={activeQuestions.length}
          selectedOption={userAnswers[currentQIndex]}
          isReview={isReview}
          answeredCount={answeredCount}
          reviewCount={reviewCount}
          onSelectOption={saveAnswer}
          onToggleReview={toggleReview}
          onJumpToQuestion={handleJump}
          onJumpToNextSection={handleNextSection}
          onPrevSection={handlePrevSection}
          onOpenOverview={() => setIsOverviewOpen(true)}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmitClick}
        />
      )}

      <OverviewGridModal
        totalQuestions={activeQuestions.length}
        currentQIndex={currentQIndex}
        userAnswers={userAnswers}
        reviewStatus={reviewStatus}
        isOpen={isOverviewOpen}
        onSelectQuestion={handleJump}
        onClose={() => setIsOverviewOpen(false)}
      />

      <ExitConfirmModal
        isOpen={isExitModalOpen}
        onCancel={() => setIsExitModalOpen(false)}
        onConfirmExit={handleConfirmExit}
      />
    </div>
  );
});

ActiveTestScreen.displayName = 'ActiveTestScreen';
