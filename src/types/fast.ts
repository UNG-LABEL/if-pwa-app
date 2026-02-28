export type FastHistory = {
  id: number;
  date: string; 
  startTime: number;
  endTime: number;
  duration: number;
  targetHours: number;     // 例: 16
  maxFastHours: number;    // 例: 24

  autoStopped: boolean;
  autoReset: boolean;

  achieved: boolean;       // targetHours達成したか
};