import { useEffect, useState } from "react";

const STORAGE_KEY = "ignite-reflection";

export interface ReflectionState {
  text: string;
  completed: boolean;
}

const DEFAULT_STATE: ReflectionState = {
  text: "",
  completed: false,
};

export const useReflection = () => {
  const [reflection, setReflection] =
    useState<ReflectionState>(DEFAULT_STATE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      setReflection(JSON.parse(saved));
    } catch {
      setReflection(DEFAULT_STATE);
    }
  }, []);

    const save = (text: string) => {
    const state: ReflectionState = {
      text,
      completed: true,
    };

    setReflection(state);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  };

  const clear = () => {
    setReflection(DEFAULT_STATE);

    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    reflection,
    save,
    clear,
  };
};
