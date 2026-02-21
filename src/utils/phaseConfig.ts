import type { IFPhase } from "../types/timer";

export const PHASES: {
  phase: IFPhase;
  minHour: number;
  message: string;
}[] = [
  { phase: "digest", minHour: 0, message: "消化中" },
  { phase: "switch", minHour: 4, message: "切り替わり" },
  { phase: "burn", minHour: 8, message: "脂肪燃焼フェーズ" },
  { phase: "awaken", minHour: 12, message: "目覚めゾーン" },
];
