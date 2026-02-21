interface Props {
  progress: number; // 0 - 1
}

export const TimerCircle = ({ progress }: Props) => {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg width="250" height="250">
      <circle
        stroke="#333"
        fill="transparent"
        strokeWidth="10"
        r={radius}
        cx="125"
        cy="125"
      />
      <circle
        stroke="#FFD700"
        fill="transparent"
        strokeWidth="10"
        r={radius}
        cx="125"
        cy="125"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
