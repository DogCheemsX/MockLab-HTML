import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { UseTestSessionReturn } from '../../hooks/useTestSession';
import { useTimer } from '../../hooks/useTimer';
import { TestHeader } from '../../components/test/TestHeader';
import { QuestionCard } from '../../components/test/QuestionCard';
import { OverviewGridModal } from '../../components/test/OverviewGridModal';
import { ExitConfirmModal } from '../../components/modals/ExitConfirmModal';
import { getOfficialSectionTitle } from '../../utils/sectionUtils';

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

  const typeId = storedSession?.typeId;

  // Circular Next Section Handler: Wraps automatically from final section to first section (index 0)
  const handleNextSection = React.useCallback(() => {
    if (activeQuestions.length === 0) return;
    const currentSubjectTitle = getOfficialSectionTitle(typeId, activeQuestions[currentQIndex]?.subject);
    
    let targetIndex = -1;
    for (let i = currentQIndex + 1; i < activeQuestions.length; i++) {
      const itemSubjectTitle = getOfficialSectionTitle(typeId, activeQuestions[i].subject);
      if (itemSubjectTitle !== currentSubjectTitle) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex !== -1) {
      jumpToQuestion(targetIndex);
      setSearchParams({ q: (targetIndex + 1).toString() });
    } else {
      // Circular wrap around to index 0 (Question 1)
      jumpToQuestion(0);
      setSearchParams({ q: '1' });
    }
  }, [currentQIndex, activeQuestions, typeId, jumpToQuestion, setSearchParams]);

  // Circular Prev Section Handler: Wraps automatically from first section to start of final section
  const handlePrevSection = React.useCallback(() => {
    if (activeQuestions.length === 0) return;
    const currentSubjectTitle = getOfficialSectionTitle(typeId, activeQuestions[currentQIndex]?.subject);
    
    let targetIndex = -1;
    for (let i = currentQIndex - 1; i >= 0; i--) {
      const itemSubjectTitle = getOfficialSectionTitle(typeId, activeQuestions[i].subject);
      if (itemSubjectTitle !== currentSubjectTitle) {
        const prevSubjectTitle = itemSubjectTitle;
        let startOfPrevBlock = i;
        while (
          startOfPrevBlock > 0 &&
          getOfficialSectionTitle(typeId, activeQuestions[startOfPrevBlock - 1].subject) === prevSubjectTitle
        ) {
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
      // Circular wrap around to start of final section block
      const lastQIndex = activeQuestions.length - 1;
      const lastSubjectTitle = getOfficialSectionTitle(typeId, activeQuestions[lastQIndex]?.subject);
      let startOfLastBlock = lastQIndex;
      while (
        startOfLastBlock > 0 &&
        getOfficialSectionTitle(typeId, activeQuestions[startOfLastBlock - 1].subject) === lastSubjectTitle
      ) {
        startOfLastBlock--;
      }
      jumpToQuestion(startOfLastBlock);
      setSearchParams({ q: (startOfLastBlock + 1).toString() });
    }
  }, [currentQIndex, activeQuestions, typeId, jumpToQuestion, setSearchParams]);

  const [focusedOptionIndex, setFocusedOptionIndex] = React.useState<number>(0);

  // Sync focused option ring when question or answer changes
  useEffect(() => {
    const currentAns = userAnswers[currentQIndex];
    setFocusedOptionIndex(currentAns !== undefined ? currentAns : 0);
  }, [currentQIndex, userAnswers]);

  // Keyboard Shortcuts:
  // - Left (←) / Right (→): Navigate Previous / Next Question
  // - Up (↑) / Down (↓): Move focus highlight through MCQs Options (A, B, C, D)
  // - Enter: Select focused option (turns green, stays on same question)
  // - Number Keys (1-5): Select option directly (turns green, stays on same question)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOverviewOpen || isExitModalOpen) return;
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const numOptions = activeQuestions[currentQIndex]?.options?.length || 4;
        setFocusedOptionIndex((prev) => (prev + 1) % numOptions);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const numOptions = activeQuestions[currentQIndex]?.options?.length || 4;
        setFocusedOptionIndex((prev) => (prev - 1 + numOptions) % numOptions);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const optIndex = parseInt(e.key, 10) - 1;
        const numOptions = activeQuestions[currentQIndex]?.options?.length || 4;
        if (optIndex >= 0 && optIndex < numOptions) {
          setFocusedOptionIndex(optIndex);
          saveAnswer(optIndex);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const numOptions = activeQuestions[currentQIndex]?.options?.length || 4;
        const targetOpt = focusedOptionIndex >= 0 && focusedOptionIndex < numOptions ? focusedOptionIndex : 0;
        saveAnswer(targetOpt);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev, activeQuestions, currentQIndex, focusedOptionIndex, saveAnswer, isOverviewOpen, isExitModalOpen]);

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
          focusedOption={focusedOptionIndex}
          isReview={isReview}
          answeredCount={answeredCount}
          reviewCount={reviewCount}
          typeId={typeId}
          onSelectOption={(idx) => {
            setFocusedOptionIndex(idx);
            saveAnswer(idx);
          }}
          onToggleReview={toggleReview}
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
