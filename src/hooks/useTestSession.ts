import { useState, useCallback, useEffect } from 'react';
import { Question, UserAnswers, ReviewStatus, UniversityKey } from '../types/test';

export const SESSION_STORAGE_KEY = 'mocklab_active_session';

export interface StoredSession {
  uniKey: UniversityKey;
  typeId: string;
  typeName: string;
  startTime: number;
  durationSeconds: number;
  activeQuestions: Question[];
  userAnswers: UserAnswers;
  reviewStatus: ReviewStatus;
  currentQIndex: number;
  score?: number;
  completed?: boolean;
}

export interface UseTestSessionReturn {
  activeQuestions: Question[];
  currentQIndex: number;
  userAnswers: UserAnswers;
  reviewStatus: ReviewStatus;
  score: number;
  storedSession: StoredSession | null;
  initSession: (
    questions: Question[],
    uniKey: UniversityKey,
    typeId: string,
    typeName: string,
    durationMinutes: number
  ) => StoredSession;
  saveAnswer: (optionIndex: number) => void;
  toggleReview: () => void;
  jumpToQuestion: (index: number) => void;
  jumpToNextSection: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateFinalScore: () => number;
  clearSession: () => void;
  restoreSession: () => StoredSession | null;
}

export function useTestSession(): UseTestSessionReturn {
  const [storedSession, setStoredSession] = useState<StoredSession | null>(() => {
    try {
      const item = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  });

  const [activeQuestions, setActiveQuestions] = useState<Question[]>(
    () => storedSession?.activeQuestions || []
  );
  const [currentQIndex, setCurrentQIndex] = useState<number>(
    () => storedSession?.currentQIndex || 0
  );
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(
    () => storedSession?.userAnswers || {}
  );
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>(
    () => storedSession?.reviewStatus || {}
  );
  const [score, setScore] = useState<number>(
    () => storedSession?.score || 0
  );

  // Sync to sessionStorage on changes if an active session exists
  useEffect(() => {
    if (storedSession && activeQuestions.length > 0) {
      const updated: StoredSession = {
        ...storedSession,
        activeQuestions,
        currentQIndex,
        userAnswers,
        reviewStatus,
        score
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
    }
  }, [activeQuestions, currentQIndex, userAnswers, reviewStatus, score, storedSession]);

  const initSession = useCallback(
    (
      questions: Question[],
      uniKey: UniversityKey,
      typeId: string,
      typeName: string,
      durationMinutes: number
    ): StoredSession => {
      const newSession: StoredSession = {
        uniKey,
        typeId,
        typeName,
        startTime: Date.now(),
        durationSeconds: durationMinutes * 60,
        activeQuestions: questions,
        userAnswers: {},
        reviewStatus: {},
        currentQIndex: 0,
        score: 0,
        completed: false
      };

      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
      setStoredSession(newSession);
      setActiveQuestions(questions);
      setCurrentQIndex(0);
      setUserAnswers({});
      setReviewStatus({});
      setScore(0);
      return newSession;
    },
    []
  );

  const restoreSession = useCallback((): StoredSession | null => {
    try {
      const item = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (item) {
        const parsed: StoredSession = JSON.parse(item);
        setStoredSession(parsed);
        setActiveQuestions(parsed.activeQuestions || []);
        setCurrentQIndex(parsed.currentQIndex || 0);
        setUserAnswers(parsed.userAnswers || {});
        setReviewStatus(parsed.reviewStatus || {});
        setScore(parsed.score || 0);
        return parsed;
      }
    } catch (e) {
      console.error('Failed to restore test session:', e);
    }
    return null;
  }, []);

  const saveAnswer = useCallback(
    (optionIndex: number) => {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQIndex]: optionIndex
      }));
      setReviewStatus((prev) => {
        if (prev[currentQIndex]) {
          const next = { ...prev };
          delete next[currentQIndex];
          return next;
        }
        return prev;
      });
    },
    [currentQIndex]
  );

  const toggleReview = useCallback(() => {
    setReviewStatus((prev) => ({
      ...prev,
      [currentQIndex]: !prev[currentQIndex]
    }));
  }, [currentQIndex]);

  const jumpToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < activeQuestions.length) {
        setCurrentQIndex(index);
      }
    },
    [activeQuestions.length]
  );

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

    if (storedSession) {
      const completedSession: StoredSession = {
        ...storedSession,
        activeQuestions,
        userAnswers,
        score: finalScore,
        completed: true
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(completedSession));
      setStoredSession(completedSession);
    }

    return finalScore;
  }, [activeQuestions, userAnswers, storedSession]);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setStoredSession(null);
    setActiveQuestions([]);
    setCurrentQIndex(0);
    setUserAnswers({});
    setReviewStatus({});
    setScore(0);
  }, []);

  return {
    activeQuestions,
    currentQIndex,
    userAnswers,
    reviewStatus,
    score,
    storedSession,
    initSession,
    saveAnswer,
    toggleReview,
    jumpToQuestion,
    jumpToNextSection,
    nextQuestion,
    prevQuestion,
    calculateFinalScore,
    clearSession,
    restoreSession
  };
}
