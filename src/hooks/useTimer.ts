import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  startTimer: (durationInSeconds: number, startTimeTimestamp?: number) => void;
  stopTimer: () => void;
}

export function useTimer(onTimeUp?: () => void): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const startTimer = useCallback((durationInSeconds: number, startTimeTimestamp?: number) => {
    const now = startTimeTimestamp || Date.now();
    const elapsed = Math.floor((Date.now() - now) / 1000);
    const remaining = Math.max(0, durationInSeconds - elapsed);

    setStartTime(now);
    setTotalDuration(durationInSeconds);
    setTimeLeft(remaining);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning || !startTime || totalDuration <= 0) return;

    const updateClock = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = totalDuration - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setIsRunning(false);
        if (onTimeUpRef.current) {
          onTimeUpRef.current();
        }
      } else {
        setTimeLeft(remaining);
      }
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, startTime, totalDuration]);

  return { timeLeft, isRunning, startTimer, stopTimer };
}
