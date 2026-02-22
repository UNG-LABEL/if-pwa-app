export type TimerStatus = "idle" | "running" | "completed";

export type IFPhase =
  | "digest"
  | "switch"
  | "burn"
  | "awaken";

export interface TimerState {
  startTime: number | null;
  elapsed: number;
  status: TimerStatus;
}

export interface IFHistoryEntry {
  id: number;
  date: string;
  startTime: number;
  endTime: number;
  duration: number;
  completed: boolean;
}

export interface IFStats {
  totalFastingMs: number;
  streakDays: number;
  lastCompletedDate: string | null;
  history: IFHistoryEntry[];
}
