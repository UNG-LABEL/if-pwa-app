export type FastHistory = {
  id: number;
  date: string;
  startTime: number;
  endTime: number;
  duration: number;

  targetHours: number;
  maxFastHours: number;

  autoStopped: boolean;
  autoReset: boolean;

  achieved: boolean;

  mode?: "fast" | "feed";
}