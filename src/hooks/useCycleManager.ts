import { useEffect, useState } from "react";

const STORAGE_KEY = "ignite-cycle";

export interface CycleState {
  day: number;

  reflectionCompleted: boolean;

  promiseCompleted: boolean;

  cycleCompleted: boolean;
}

const DEFAULT_STATE: CycleState = {
  day: 0,

  reflectionCompleted: false,

  promiseCompleted: false,

  cycleCompleted: false,
};
export const useCycleManager = () => {
  const [cycle, setCycle] =
    useState<CycleState>(DEFAULT_STATE);

      useEffect(() => {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      setCycle(JSON.parse(saved));
    } catch {
      setCycle(DEFAULT_STATE);
    }
  }, []);

    const save = (state: CycleState) => {
    setCycle(state);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  };
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
