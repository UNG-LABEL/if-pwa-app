import { useTimer } from "../hooks/useTimer";
import { useIFStats } from "../hooks/useIFStats";
import { useState, useEffect } from "react";
import IgniteLogo from "../components/IgniteLogo";

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
    timerTitle: "IF IGNITE SESSION",
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
  const [igniteMoment, setIgniteMoment] = useState(false);
  const progress = Math.min(
    (elapsed / (MAX_FAST_HOURS * 60 * 60 * 1000)) * 100,
    100
  );
  
  
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
    setAutoStopTriggered(false);
  
    // 🔥 IGNITE演出開始
    setIgniteMoment(true);
  
    setTimeout(() => {
      setIgniteMoment(false);
      start(); // ← 3秒後に実際のタイマー開始
    }, 3000);
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

      {igniteMoment && (
  <div className="ignite-video-overlay">

    <video
      autoPlay
      muted
      playsInline
      preload="auto"
      className="ignite-video"
    >
      <source src="/video/test_overlay_2.webm" type="video/webm" />
      <source src="/video/test_overlay_1.mp4" type="video/mp4" />
    </video>

    <div className="ignite-text">
      IGNITE WITHIN
    </div>

  </div>
)}

      <div style={{ marginBottom: "10px" }}>
      
     </div>
      <div className="session-title">
        {TEXT[lang].timerTitle}
        <IgniteLogo variant="icon" size="small" />
      </div>

      <div className="timer-wrapper">
        <svg className="progress-ring" width="260" height="260"
             viewBox="-10 -10 260 260">
          <defs>
            <linearGradient id="igniteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00bfff" />
              <stop offset="100%" stopColor="#5ce1ff" />
            </linearGradient>
          </defs>

          <circle
            stroke="#1a2a44"
            strokeWidth="0"
            fill="transparent"
            r="100"
            cx="120"
            cy="120"
          />

          <circle
            stroke="url(#igniteGradient)"
            strokeWidth="12"
            fill="transparent"
            r="100"
            cx="120"
            cy="120"
            strokeDasharray={2 * Math.PI * 100}
            strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
            className={`progress-ring-progress 
              ${status === "running" ? "running" : ""}
              ${status === "completed" ? "completed" : ""}
            `}
          />
        </svg>

        <div className={`timer-display
               ${status === "running" ? "running" : ""}
               ${status === "completed" ? "completed" : ""}
             `}
           >
          {formatTime(elapsed)}
       </div>
     </div>

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

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-label">
                {TEXT[lang].remaining}
              </span>
              <span className="stat-value">
                {formatTime(remaining)}
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-label">
                {TEXT[lang].elapsed}
              </span>
              <span className="stat-value">
                {formatTime(elapsed)}
              </span>
            </div>


            {startTime && (
              <>
                <div className="stat-item">
                  <span className="stat-label">
                    {TEXT[lang].started}
                  </span>
                  <span className="stat-value">
                    {new Date(startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
            
                <div className="stat-item">
                  <span className="stat-label">
                    {TEXT[lang].ends}
                  </span>
                  <span className="stat-value">
                    {new Date(startTime + TARGET).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </>
            )}
          </div>

          {elapsed >= TARGET && (
            <h3 style={{ color: "green" }}>
              {TEXT[lang].achieved}
            </h3>
          )}
        </>
      )}


      {/* ボタン制御 */}
{status === "idle" && (
  <button onClick={handleStart}>START FAST</button>
)}

{status === "running" && (
  <button onClick={handleEnd}>END FAST</button>
)}

{status === "completed" && (
  <div className="button-group">
    <button onClick={handleStart}>
      {TEXT[lang].startAgain}
    </button>
    <button onClick={reset}>
      {TEXT[lang].reset}
    </button>
  </div>
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