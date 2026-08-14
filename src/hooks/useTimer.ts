import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  startTimer: (durationInSeconds: number) => void;
  stopTimer: () => void;
}

export function useTimer(onTimeUp?: () => void): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const startTimer = useCallback((durationInSeconds: number) => {
    setTimeLeft(durationInSeconds);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsRunning(false);
          if (onTimeUpRef.current) {
            onTimeUpRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return { timeLeft, isRunning, startTimer, stopTimer };
}
