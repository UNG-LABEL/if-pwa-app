import { useEffect, useState } from "react";

export type FastMode = "fast" | "feed";

const STORAGE_KEY = "if-fast-session";

export const useFastSession = () => {
  const [mode, setMode] = useState<FastMode>("fast");

  // 起動時復元
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "fast" || saved === "feed") {
      setMode(saved);
    }
  }, []);

  // 自動保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const startFast = () => {
    setMode("fast");
  };

  const startFeed = () => {
    setMode("feed");
  };

  const toggle = () => {
    setMode((prev) => (prev === "fast" ? "feed" : "fast"));
  };

  const reset = () => {
    setMode("fast");
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    mode,

    startFast,

    startFeed,

    toggle,

    reset,
  };
};
