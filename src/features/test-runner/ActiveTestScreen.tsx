import React, { useState } from 'react';
import { Question, UserAnswers, ReviewStatus } from '../../types/test';
import { TestHeader } from '../../components/test/TestHeader';
import { QuestionCard } from '../../components/test/QuestionCard';
import { OverviewGridModal } from '../../components/test/OverviewGridModal';

interface ActiveTestScreenProps {
  questions: Question[];
  currentQIndex: number;
  userAnswers: UserAnswers;
  reviewStatus: ReviewStatus;
  timeLeft: number;
  onSaveAnswer: (idx: number) => void;
  onToggleReview: () => void;
  onJumpToQuestion: (idx: number) => void;
  onJumpToNextSection: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmitTest: () => void;
}

export const ActiveTestScreen: React.FC<ActiveTestScreenProps> = React.memo(
  ({
    questions,
    currentQIndex,
    userAnswers,
    reviewStatus,
    timeLeft,
    onSaveAnswer,
    onToggleReview,
    onJumpToQuestion,
    onJumpToNextSection,
    onPrev,
    onNext,
    onSubmitTest
  }) => {
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);

    if (questions.length === 0) {
      return (
        <div className="text-center text-gray-400 p-8">
          No questions available for this test.
        </div>
      );
    }

    const currentQuestion = questions[currentQIndex];
    const answeredCount = Object.keys(userAnswers).length;
    const reviewCount = Object.values(reviewStatus).filter(Boolean).length;
    const isReview = !!reviewStatus[currentQIndex];

    const handleSubmitClick = () => {
      const unanswered = questions.length - Object.keys(userAnswers).length;
      if (unanswered > 0) {
        if (!window.confirm(`You still have ${unanswered} unanswered questions. Are you sure you want to submit?`)) {
          return;
        }
      }
      onSubmitTest();
    };

    return (
      <div id="screen-test" className="w-full max-w-3xl flex flex-col">
        <TestHeader timeLeft={timeLeft} />

        <QuestionCard
          question={currentQuestion}
          questionIndex={currentQIndex}
          totalQuestions={questions.length}
          selectedOption={userAnswers[currentQIndex]}
          isReview={isReview}
          answeredCount={answeredCount}
          reviewCount={reviewCount}
          onSelectOption={onSaveAnswer}
          onToggleReview={onToggleReview}
          onJumpToQuestion={onJumpToQuestion}
          onJumpToNextSection={onJumpToNextSection}
          onOpenOverview={() => setIsOverviewOpen(true)}
          onPrev={onPrev}
          onNext={onNext}
          onSubmit={handleSubmitClick}
        />

        <OverviewGridModal
          totalQuestions={questions.length}
          currentQIndex={currentQIndex}
          userAnswers={userAnswers}
          reviewStatus={reviewStatus}
          isOpen={isOverviewOpen}
          onSelectQuestion={onJumpToQuestion}
          onClose={() => setIsOverviewOpen(false)}
        />
      </div>
    );
  }
);

ActiveTestScreen.displayName = 'ActiveTestScreen';
