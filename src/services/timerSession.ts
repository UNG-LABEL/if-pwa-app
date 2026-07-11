export type TimerMode = "fast" | "feed";

export interface TimerSession {
  mode: TimerMode;
}

const STORAGE_KEY = "ignite-session";

export const timerSession = {
  load(): TimerSession | null {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return null;

    try {
      return JSON.parse(saved) as TimerSession;
    } catch {
      return null;
    }
  },

  save(session: TimerSession) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session)
    );
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};