import type { FastHistory } from "./fast";

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


export interface IFStats {
  totalFastingMs: number;
  streakDays: number;
  lastCompletedDate: string | null;
  history: FastHistory[];
}
