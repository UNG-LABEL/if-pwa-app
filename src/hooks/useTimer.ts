import { useEffect, useState } from "react";

export type TimerStatus = "idle" | "running" | "completed";

const STORAGE_KEY = "if_start_time";

export const useTimer = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const [status, setStatus] = useState<TimerStatus>("idle");

  // 🔥 初期ロード時にlocalStorageから復元
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const savedStart = Number(saved);
      setStartTime(savedStart);
      setStatus("running");
    }
  }, []);

  // 🔥 タイマー更新（純粋な時間計測のみ）
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (status === "running" && startTime !== null) {
      interval = setInterval(() => {
        const now = Date.now();
        const newElapsed = now - startTime;
        setElapsed(newElapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, startTime]);

  const start = () => {
    const now = Date.now();
    setStartTime(now);
    setElapsed(0);
    setStatus("running");
    localStorage.setItem(STORAGE_KEY, now.toString());
  };

  const stop = () => {
    if (!startTime) return;

    const endTime = Date.now();
    const duration = endTime - startTime;

    setElapsed(duration);
    setStatus("completed");
    localStorage.removeItem(STORAGE_KEY);

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
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    start,
    stop,
    reset,
    elapsed,
    status,
    startTime,
  };
};