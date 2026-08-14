import { useState, useCallback } from 'react';
import { Question, UserAnswers, ReviewStatus } from '../types/test';

export interface UseTestSessionReturn {
  activeQuestions: Question[];
  currentQIndex: number;
  userAnswers: UserAnswers;
  reviewStatus: ReviewStatus;
  score: number;
  initSession: (questions: Question[]) => void;
  saveAnswer: (optionIndex: number) => void;
  toggleReview: () => void;
  jumpToQuestion: (index: number) => void;
  jumpToNextSection: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateFinalScore: () => number;
}

export function useTestSession(): UseTestSessionReturn {
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>({});
  const [score, setScore] = useState<number>(0);

  const initSession = useCallback((questions: Question[]) => {
    setActiveQuestions(questions);
    setCurrentQIndex(0);
    setUserAnswers({});
    setReviewStatus({});
    setScore(0);
  }, []);

  const saveAnswer = useCallback((optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQIndex]: optionIndex
    }));
    // Remove review tag if present when user answers
    setReviewStatus((prev) => {
      if (prev[currentQIndex]) {
        const next = { ...prev };
        delete next[currentQIndex];
        return next;
      }
      return prev;
    });
  }, [currentQIndex]);

  const toggleReview = useCallback(() => {
    setReviewStatus((prev) => ({
      ...prev,
      [currentQIndex]: !prev[currentQIndex]
    }));
  }, [currentQIndex]);

  const jumpToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < activeQuestions.length) {
      setCurrentQIndex(index);
    }
  }, [activeQuestions.length]);

  const jumpToNextSection = useCallback(() => {
    let nextBoundary = Math.floor(currentQIndex / 20) * 20 + 20;
    if (nextBoundary >= activeQuestions.length) {
      nextBoundary = activeQuestions.length - 1;
    }
    setCurrentQIndex(nextBoundary);
  }, [currentQIndex, activeQuestions.length]);

  const nextQuestion = useCallback(() => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  }, [currentQIndex, activeQuestions.length]);

  const prevQuestion = useCallback(() => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  }, [currentQIndex]);

  const calculateFinalScore = useCallback(() => {
    let finalScore = 0;
    activeQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.ans) {
        finalScore++;
      }
    });
    setScore(finalScore);
    return finalScore;
  }, [activeQuestions, userAnswers]);

  return {
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
  };
}
