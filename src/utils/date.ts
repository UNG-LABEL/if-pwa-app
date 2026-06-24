export const getTodayString = (): string => {
  return new Date().toISOString().split("T")[0];
};
