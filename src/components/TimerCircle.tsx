interface Props {
  progress: number; // 0 - 1
}

export const TimerCircle = ({ progress }: Props) => {
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg width="300" height="300">
      <circle
        stroke="#333"
        fill="transparent"
        strokeWidth="10"
        r={radius}
        cx="150"
        cy="150"
      />
      <circle
        stroke="#FFD700"
        fill="transparent"
        strokeWidth="10"
        r={radius}
        cx="150"
        cy="150"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
