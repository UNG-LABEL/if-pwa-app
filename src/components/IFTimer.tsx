import { useTimer } from "../hooks/useTimer";
import { useIFStats } from "../hooks/useIFStats";
import { useState } from "react";

export const IFTimer = () => {
  const { start, stop, reset, elapsed, status, startTime } = useTimer();
  const { streak, history, averageDuration, completeFast } = useIFStats();

  const TARGET = 16 * 60 * 60 * 1000; // 16時間
  const remaining = Math.max(TARGET - elapsed, 0);

  const [lastDuration, setLastDuration] = useState<number | null>(null);

  const [visibleCount, setVisibleCount] = useState(20);

  const formatTime = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return `${h}時間${m}分`;
  };

  const handleEnd = () => {
    const result = stop();
    if (!result) return;

    setLastDuration(result.duration);
    completeFast(result);
  };

  return (
    <div>
      <h3>連続日数: {streak}日</h3>

      {/* 平均表示 */}
      {averageDuration > 0 && (
        <h4>
          平均断食時間: {formatTime(averageDuration)}
        </h4>
      )}

      {/* FAST中UI */}
      {status === "running" && (
        <>
          <h2>FAST MODE</h2>

          <p>残り {formatTime(remaining)}</p>
          <p>経過 {formatTime(elapsed)}</p>

          {startTime && (
            <>
              <p>
                Started:{" "}
                {new Date(startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                Ends:{" "}
                {new Date(startTime + TARGET).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </>
          )}

          {elapsed >= TARGET && (
            <h3 style={{ color: "green" }}>
              🎉 16時間達成！
            </h3>
          )}
        </>
      )}

      {/* 今回の結果 */}
      {lastDuration !== null && (
        <h4>
          今回の断食時間: {formatTime(lastDuration)}
        </h4>
      )}

      {/* ボタン制御 */}
{status === "idle" && (
  <button onClick={start}>START FAST</button>
)}

{status === "running" && (
  <button onClick={handleEnd}>END FAST</button>
)}

{status === "completed" && (
  <>
    <button onClick={start}>START AGAIN</button>
    <button onClick={reset}>RESET</button>
  </>
)}

      <hr style={{ margin: "20px 0" }} />

      <h4>履歴</h4>

      {history.length === 0 && <p>まだ記録がありません</p>}

      {history
  .slice()
  .reverse()
  .slice(0, visibleCount)
  .map((entry) => (
    <div
      key={entry.id}
      style={{
        background: "#111",
        color: "#fff",
        padding: "14px 16px",
        borderRadius: "12px",
        marginBottom: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      {/* 1行目 */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          {entry.date}{" "}
          {new Date(entry.startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" → "}
          {new Date(entry.endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* 2行目 */}
      <div
        style={{
          marginTop: "6px",
          fontWeight: "bold",
          color:
            entry.duration >= TARGET
              ? "#ff6b00"
              : "#ccc",
        }}
      >
        {entry.duration >= TARGET && "🔥 "}
        {formatTime(entry.duration)}
      </div>
    </div>
))}

{visibleCount < history.length && (
  <button
    onClick={() => setVisibleCount((prev) => prev + 20)}
  >
    もっと見る
  </button>
)}

    </div>
  );
};