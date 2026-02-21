import { IFHistoryEntry } from "../types/timer";

export const calculateStreakFromHistory = (
  history: IFHistoryEntry[]
): number => {
  if (!history || history.length === 0) return 0;

  // 日付順に並べる
  const sorted = [...history].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  let streak = 0;

  // 今日の日付
  let currentDate = new Date().toISOString().split("T")[0];

  for (let i = sorted.length - 1; i >= 0; i--) {
    const entry = sorted[i];

    if (!entry.completed) continue;

    if (entry.date === currentDate) {
      streak++;

      const d = new Date(currentDate);
      d.setDate(d.getDate() - 1);
      currentDate = d.toISOString().split("T")[0];
    } else {
      break;
    }
  }

  return streak;
};
