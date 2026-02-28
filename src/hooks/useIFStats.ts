import { useEffect, useState } from "react";
import type { FastHistory } from "../types/fast";
import { calculateStreakFromHistory } from "../utils/streak";

const HISTORY_KEY = "if-history";

export const useIFStats = () => {
  const [history, setHistory] = useState<FastHistory[]>([]);
  const [streak, setStreak] = useState<number>(0);

  // 🔄 起動時に履歴復元
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      const parsed: FastHistory[] = JSON.parse(stored);
      setHistory(parsed);
      setStreak(calculateStreakFromHistory(parsed));
    }
  }, []);

  const completeFast = (entry: FastHistory) => {
    const updatedHistory = [...history, entry];

    setHistory(updatedHistory);

    const newStreak = calculateStreakFromHistory(updatedHistory);
    setStreak(newStreak);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const averageDuration =
    history.length === 0
      ? 0
      : history.reduce(
          (sum, entry) => sum + (entry.endTime - entry.startTime),
          0
        ) / history.length;

  return {
    history,
    streak,
    averageDuration,
    completeFast,
  };
};