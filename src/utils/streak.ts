import type { FastHistory } from "../types/fast";

export const calculateStreakFromHistory = (
  history: FastHistory[]
): number => {
  if (history.length === 0) return 0;

  // ① 日付だけの配列を作る（重複排除）
  const uniqueDates = Array.from(
    new Set(history.map((entry) => entry.date))
  ).sort((a, b) => (a > b ? -1 : 1)); // 新しい順

  let streak = 0;
  let currentDate = new Date();

  for (let i = 0; i < uniqueDates.length; i++) {
    const targetDate = currentDate.toISOString().split("T")[0];

    if (uniqueDates[i] === targetDate) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};