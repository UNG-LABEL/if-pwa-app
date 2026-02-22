import { useEffect, useState } from "react";
import type { IFHistoryEntry } from "../types/timer";
import { calculateStreakFromHistory } from "../utils/streak";

const HISTORY_KEY = "if-history";

export const useIFStats = () => {
  const [history, setHistory] = useState<IFHistoryEntry[]>([]);
  const [streak, setStreak] = useState<number>(0);

  // 🔄 起動時に履歴復元
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      const parsed: IFHistoryEntry[] = JSON.parse(stored);
      setHistory(parsed);
      setStreak(calculateStreakFromHistory(parsed));
    }
  }, []);

  const completeFast = (timerResult?: {
  startTime: number;
  endTime: number;
  duration: number;
}) => {
  if (!timerResult) return;

  const { startTime, endTime, duration } = timerResult;

  const date = new Date(startTime).toISOString().split("T")[0];

  const newEntry: IFHistoryEntry = {
    id: startTime, // 🔥 一意キー追加
    date,
    startTime,
    endTime,
    duration,
    completed: true,
  };

  const updatedHistory = [...history, newEntry];

  setHistory(updatedHistory);

  const newStreak = calculateStreakFromHistory(updatedHistory);
  setStreak(newStreak);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

  const averageDuration =
  history.length === 0
    ? 0
    : history.reduce((sum, entry) => sum + entry.duration, 0) /
      history.length;

  return {
    history,
    streak,
    averageDuration,
    completeFast,
  };
};
