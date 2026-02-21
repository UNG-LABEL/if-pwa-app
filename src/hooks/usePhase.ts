import { PHASES } from "../utils/phaseConfig";

export const usePhase = (elapsedMs: number) => {
  const hours = elapsedMs / (1000 * 60 * 60);

  let current = PHASES[0];

  for (let phase of PHASES) {
    if (hours >= phase.minHour) {
      current = phase;
    }
  }

  return current;
};
