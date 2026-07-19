import { useEffect, useState } from "react";

const STORAGE_KEY = "ignite-first-cycle";

export interface FirstCycleState {
  startedAt: number | null;
  currentDay: number;
  completed: boolean;
}

const DEFAULT_STATE: FirstCycleState = {
  startedAt: null,
  currentDay: 0,
  completed: false,
};

const DAY_MS = 24 * 60 * 60 * 1000;

const getCurrentDay = (
  startedAt: number | null
): number => {
  if (!startedAt) return 0;

  const start = new Date(startedAt);
  const today = new Date();

  // 時刻を無視して日付だけ比較
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff =
    Math.floor(
      (today.getTime() - start.getTime()) / DAY_MS
    ) + 1;

  return Math.max(1, Math.min(diff, 7));
};


export const useFirstCycle = () => {
  const [cycle, setCycle] =
    useState<FirstCycleState>(DEFAULT_STATE);

  // 初期ロード
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
    
      const parsed = JSON.parse(saved) as FirstCycleState;

     parsed.currentDay = getCurrentDay(
  parsed.startedAt
);

parsed.completed =
  parsed.currentDay >= 7;

setCycle(parsed);

    } catch {
      setCycle(DEFAULT_STATE);
    }
  }, []);

  // 保存
  const save = (state: FirstCycleState) => {

  const currentDay =
    getCurrentDay(state.startedAt);

  const updatedState = {
    ...state,
    currentDay,
    completed: currentDay >= 7,
  };

  setCycle(updatedState);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedState)
  );
};

  // リセット
  const reset = () => {
    setCycle(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
  cycle,
  save,
  reset,
  getCurrentDay: () =>
    getCurrentDay(cycle.startedAt),
};
};