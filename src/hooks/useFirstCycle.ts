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

export const useFirstCycle = () => {
  const [cycle, setCycle] =
    useState<FirstCycleState>(DEFAULT_STATE);

  // 初期ロード
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      setCycle(JSON.parse(saved));
    } catch {
      setCycle(DEFAULT_STATE);
    }
  }, []);

  // 保存
  const save = (state: FirstCycleState) => {
    setCycle(state);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
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
  };
};