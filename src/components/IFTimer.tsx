import { useTimer } from "../hooks/useTimer";
import { useIFStats } from "../hooks/useIFStats";
import { useState } from "react";

export const IFTimer = () => {
  const { start, stop, reset } = useTimer();
  const { streak, history, averageDuration, completeFast } = useIFStats();


  {averageDuration > 0 && (
  <h4>
    平均断食時間: {Math.floor(averageDuration / 3600000)}時間
    {Math.floor((averageDuration % 3600000) / 60000)}分
  </h4>
)}


  const [lastDuration, setLastDuration] = useState<number | null>(null);


  const handleEnd = () => {
  const result = stop();

  if (!result) return;

  setLastDuration(result.duration);  // ← 今回の時間を保存
  completeFast(result);
};

  return (
    <div>
      <h3>連続日数: {streak}日</h3>

{lastDuration !== null && (
  <h4>
    今回の断食時間: {Math.floor(lastDuration / 3600000)}時間
    {Math.floor((lastDuration % 3600000) / 60000)}分
  </h4>
)}

      <button onClick={start}>START FAST</button>
      <button onClick={handleEnd}>END FAST</button>
      <button onClick={reset}>RESET</button>
      <hr style={{ margin: "20px 0" }} />

    <h4>履歴</h4>

    {history.length === 0 && <p>まだ記録がありません</p>}

    {history
      .slice()
      .reverse()
      .map((entry) => (
        <div key={entry.date} style={{ marginBottom: "8px" }}>
          {entry.date} — {Math.floor(entry.duration / 3600000)}時間
          {Math.floor((entry.duration % 3600000) / 60000)}分
        </div>
      ))}
  </div>
);


};
