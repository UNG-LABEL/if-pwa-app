import { useEffect, useState } from "react";

export type TimerStatus = "idle" | "running" | "completed";

export const useTimer = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const [status, setStatus] = useState<TimerStatus>("idle");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (status === "running" && startTime !== null) {
      interval = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, startTime]);

  const start = () => {
    setStartTime(Date.now());
    setElapsed(0);
    setStatus("running");
  };

  const stop = () => {
  if (!startTime) return;

  const endTime = Date.now();
  const duration = endTime - startTime;

  setElapsed(duration);
  setStatus("completed");

  return {
    startTime,
    endTime,
    duration,
  };
 };


  const reset = () => {
    setStartTime(null);
    setElapsed(0);
    setStatus("idle");
  };

  return {
    start,
    stop,
    reset,
    elapsed,
    status,
  };
};
