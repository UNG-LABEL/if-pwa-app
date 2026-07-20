import { useEffect, useState } from "react";


const STORAGE_KEY = "ignite-my-promise";

export interface MyPromiseState {
  text: string;
  completed: boolean;
}

const DEFAULT_STATE: MyPromiseState = {
  text: "",
  completed: false,
};

export const useMyPromise = () => {
  const [promise, setPromise] =
    useState<MyPromiseState>(DEFAULT_STATE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      setPromise(JSON.parse(saved));
    } catch {
      setPromise(DEFAULT_STATE);
    }
  }, []);

    const save = (text: string) => {
    const state: MyPromiseState = {
      text,
      completed: true,
    };

    setPromise(state);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  };

  const clear = () => {
    setPromise(DEFAULT_STATE);

    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    promise,
    save,
    clear,
  };
};
