import { useTimer } from "../hooks/useTimer";
import { useIFStats } from "../hooks/useIFStats";
import { useState, useEffect } from "react";


const TARGET_HOURS = 16;      // あなたの目標時間


const TEXT = {
  ja: {
    timerTitle: "IF IGNITE SESSION",
    streak: "連続日数",
    days: "日",
    average: "平均断食時間",
    fastMode: "FAST MODE",
    remaining: "残り",
    elapsed: "経過",
    started: "開始",
    ends: "終了予定",
    achieved: "🎉 16時間達成！",
    thisFast: "今回の断食時間",
    startFast: "START FAST",
    endFast: "END FAST",
    startAgain: "START AGAIN",
    reset: "RESET",
    history: "履歴",
    noHistory: "まだ記録がありません",
    loadMore: "もっと見る",
  },
  en: {
    timerTitle: "Ignite",
    streak: "Streak",
    days: "days",
    average: "Average Fast",
    fastMode: "FAST MODE",
    remaining: "Remaining",
    elapsed: "Elapsed",
    started: "Started",
    ends: "Ends",
    achieved: "🎉 16 Hours Achieved!",
    thisFast: "This Fast",
    startFast: "START FAST",
    endFast: "END FAST",
    startAgain: "START AGAIN",
    reset: "RESET",
    history: "History",
    noHistory: "No records yet",
    loadMore: "Load More",
  },
};

export const IFTimer = ({ lang }: { lang: "ja" | "en" }) => {
  const MAX_FAST_HOURS = 16; // 仮（後でSettingsと連携）// Auto Stop 上限

  const { start, stop, reset, elapsed, status, startTime } =
    useTimer();

  const { streak, history, averageDuration, completeFast } = useIFStats();

  const [autoStopTriggered, setAutoStopTriggered] = useState(false);


  
    useEffect(() => {
  // running中でなければ何もしない
  if (status !== "running") return;

  // すでにAutoStop発動済みなら何もしない（🔥 二重防止）
  if (autoStopTriggered) return;

  const maxDuration = MAX_FAST_HOURS * 60 * 60 * 1000;

  if (elapsed >= maxDuration) {
    // 🔥 ここで即ロック（これが最重要）
    setAutoStopTriggered(true);

    const result = stop();
    if (!result) return;

    const { startTime, endTime, duration } = result;

    const achieved =
      duration >= TARGET_HOURS * 60 * 60 * 1000;

    const entry = {
      id: startTime,
      date: new Date(startTime).toISOString().split("T")[0],
      startTime,
      endTime,
      duration,
      targetHours: TARGET_HOURS,
      maxFastHours: MAX_FAST_HOURS,
      achieved,
      autoStopped: true,   // ← 自動終了
      autoReset: false,
    };

    completeFast(entry);
  }
}, [elapsed, status, autoStopTriggered]);


  const TARGET = 16 * 60 * 60 * 1000; // 16時間
  const remaining = Math.max(TARGET - elapsed, 0);

  const [visibleCount, setVisibleCount] = useState(20);


  const formatTime = (ms: number) => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);

  if (lang === "ja") {
    return `${h}時間${m}分`;
  } else {
    return `${h}h ${m}m`;
  }
};

  const handleStart = () => {
    setAutoStopTriggered(false); // ← AutoStopフラグ初期化
    start();
  };

  const handleEnd = () => {
    const result = stop();
if (!result) return;

const { startTime, endTime, duration } = result;
const achieved =
  duration >= TARGET_HOURS * 60 * 60 * 1000;

const entry = {
  id: startTime,
  date: new Date(startTime).toISOString().split("T")[0],
  startTime,
  endTime,
  duration,
  targetHours: TARGET_HOURS,
  maxFastHours: MAX_FAST_HOURS,
  achieved,
  autoStopped: false, 
  autoReset: false,
};

completeFast(entry);
  };

  return (
    <div>

      <div style={{ marginBottom: "10px" }}>
      
     </div>
      <h2>{TEXT[lang].timerTitle}</h2>


      <h3>
      {TEXT[lang].streak}: {streak}
      {lang === "ja" ? TEXT[lang].days : ` ${TEXT[lang].days}`}
      </h3>

      {/* 平均表示 */}
      {averageDuration > 0 && ( 
        <h4>
      {TEXT[lang].average}: {formatTime(averageDuration)}
      </h4>
      )}

      {/* FAST中UI */}
      {status === "running" && (
        <>
          <h2>{TEXT[lang].fastMode}</h2>

          <p>{TEXT[lang].remaining} {formatTime(remaining)}</p>
          <p>{TEXT[lang].elapsed} {formatTime(elapsed)}</p>

          {startTime && (
           <>
            <p>
              {TEXT[lang].started}:{" "}
              {new Date(startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
             </p>
             <p>
              {TEXT[lang].ends}:{" "}
              {new Date(startTime + TARGET).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            </>
          )}

          {elapsed >= TARGET && (
            <h3 style={{ color: "green" }}>
             {TEXT[lang].achieved}
            </h3>
          )}
        </>
      )}

      {/* 今回の結果 */}
      

      {/* ボタン制御 */}
{status === "idle" && (
  <button onClick={handleStart}>START FAST</button>
)}

{status === "running" && (
  <button onClick={handleEnd}>END FAST</button>
)}

{status === "completed" && (
  <>
    <button onClick={handleStart}>START AGAIN</button>
    <button onClick={reset}>RESET</button>
  </>
      )}

      <hr style={{ margin: "20px 0" }} />

      <h4>{TEXT[lang].history}</h4>

      {history.length === 0 && (
        <p>{TEXT[lang].noHistory}</p>
      )}

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
    {TEXT[lang].loadMore}
  </button>
)}

    </div>
  );
};