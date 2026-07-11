import { useTimer } from "../hooks/useTimer";
import { useIFStats } from "../hooks/useIFStats";
import { useState, useEffect } from "react";
import IgniteLogo from "../components/IgniteLogo";
import { messages } from "../data/messages";


type Lang = "ja" | "en" | "es" | "pt" | "id" | "fr"; // 🔥 拡張

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
    igniteComplete: "🔥 IGNITE COMPLETE",
    igniteSub: "Well done.\nTime to rebuild.",
    readyToIgnite: "🔥 READY TO IGNITE",
    readySub: "Recovery complete.\nStart when you're ready.",
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
    igniteComplete: "🔥 IGNITE COMPLETE",
    igniteSub: "Well done.\nTime to rebuild.",
    readyToIgnite: "🔥 READY TO IGNITE",
    readySub: "Recovery complete.\nStart when you're ready.",
    thisFast: "This Fast",
    startFast: "START FAST",
    endFast: "END FAST",
    startAgain: "START AGAIN",
    reset: "RESET",
    history: "History",
    noHistory: "No records yet",
    loadMore: "Load More",
  },
  es: {
    timerTitle: "SESION IF",
    streak: "Racha",
    days: "días",
    average: "Promedio",
    fastMode: "MODO AYUNO",
    remaining: "Restante",
    elapsed: "Transcurrido",
    started: "Inicio",
    ends: "Fin",
    igniteComplete: "🔥 IGNITE COMPLETE",
    igniteSub: "Well done.\nTime to rebuild.",
    readyToIgnite: "🔥 READY TO IGNITE",
    readySub: "Recovery complete.\nStart when you're ready.",
    thisFast: "Este ayuno",
    startFast: "INICIAR",
    endFast: "FINALIZAR",
    startAgain: "REINICIAR",
    reset: "RESET",
    history: "Historial",
    noHistory: "Sin registros",
    loadMore: "Ver más",
  },
  pt: {
    timerTitle: "SESSÃO IF",
    streak: "Sequência",
    days: "dias",
    average: "Média",
    fastMode: "MODO JEJUM",
    remaining: "Restante",
    elapsed: "Decorrido",
    started: "Início",
    ends: "Fim",
    igniteComplete: "🔥 IGNITE COMPLETE",
    igniteSub: "Well done.\nTime to rebuild.",
    readyToIgnite: "🔥 READY TO IGNITE",
    readySub: "Recovery complete.\nStart when you're ready.",
    thisFast: "Este jejum",
    startFast: "INICIAR",
    endFast: "ENCERRAR",
    startAgain: "REINICIAR",
    reset: "RESET",
    history: "Histórico",
    noHistory: "Sem registros",
    loadMore: "Ver mais",
  },
  id: {
    timerTitle: "SESI IF",
    streak: "Streak",
    days: "hari",
    average: "Rata-rata",
    fastMode: "MODE PUASA",
    remaining: "Sisa",
    elapsed: "Berjalan",
    started: "Mulai",
    ends: "Selesai",
    igniteComplete: "🔥 IGNITE COMPLETE",
    igniteSub: "Well done.\nTime to rebuild.",
    readyToIgnite: "🔥 READY TO IGNITE",
    readySub: "Recovery complete.\nStart when you're ready.",
    thisFast: "Puasa ini",
    startFast: "MULAI",
    endFast: "SELESAI",
    startAgain: "ULANGI",
    reset: "RESET",
    history: "Riwayat",
    noHistory: "Belum ada",
    loadMore: "Lihat lagi",
  },
  fr: {
    timerTitle: "SESSION IF",
    streak: "Série",
    days: "jours",
    average: "Moyenne",
    fastMode: "MODE JEÛNE",
    remaining: "Restant",
    elapsed: "Écoulé",
    started: "Début",
    ends: "Fin",
    igniteComplete: "🔥 IGNITE COMPLETE",
    igniteSub: "Well done.\nTime to rebuild.",
    readyToIgnite: "🔥 READY TO IGNITE",
    readySub: "Recovery complete.\nStart when you're ready.",
    thisFast: "Ce jeûne",
    startFast: "COMMENCER",
    endFast: "TERMINER",
    startAgain: "RECOMMENCER",
    reset: "RESET",
    history: "Historique",
    noHistory: "Aucun enregistrement",
    loadMore: "Voir plus",
  },
};

const getTodayPairIndex = (length: number) => {
  const today = new Date().toISOString().split("T")[0];
  const savedDate = localStorage.getItem("igniteDate");
  let index = Number(localStorage.getItem("igniteIndex") || 0);

  if (savedDate !== today) {
    index = (index + 1) % length;
    localStorage.setItem("igniteDate", today);
    localStorage.setItem("igniteIndex", String(index));
  }

  return index;
};

export const IFTimer = ({ lang }: { lang: Lang }) => {
  const [ignitePairIndex, setIgnitePairIndex] = useState<number | null>(null);
  const [igniteType, setIgniteType] = useState<"start" | "end" | null>(null);

  const messageSet = messages[lang] || messages["en"]|| []; // 🔥 核
  const MAX_FAST_HOURS = 24;

  const { start, stop, reset, elapsed, status, startTime } = useTimer();
  const { streak, history, averageDuration, completeFast } = useIFStats();

  const [autoStopTriggered, setAutoStopTriggered] = useState(false);
  const [igniteMoment, setIgniteMoment] = useState(false);
  const [ignitePhase, setIgnitePhase] = useState(0);
 type Mode = "fast" | "feed";


 const [mode, setMode] =
  useState<Mode>("fast");

  const TIMER_PRESETS = {
  fast: 16,
  feed: 8,
};

const TARGET =
  TIMER_PRESETS[mode] *
  60 *
  60 *
  1000;

const remaining = Math.max(
  TARGET - elapsed,
  0
);

  const progress = Math.min(
  (elapsed / TARGET) * 100,
  100
);
  const RADIUS = 130;
  const STROKE = 12;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

useEffect(() => {
  if (status !== "running") return;
  if (autoStopTriggered) return;

  const maxDuration = MAX_FAST_HOURS * 60 * 60 * 1000;

  if (elapsed >= maxDuration) {
    setAutoStopTriggered(true);

    const result = stop();
    if (!result) return;

    const { startTime, endTime, duration } = result;

    const achieved =
  duration >= TIMER_PRESETS[mode] * 60 * 60 * 1000;

    completeFast({
      id: startTime,
      date: new Date(startTime).toISOString().split("T")[0],
      startTime,
      endTime,
      duration,
      targetHours: TIMER_PRESETS[mode],
      maxFastHours: MAX_FAST_HOURS,
      achieved,
      autoStopped: true,
      autoReset: false,
      mode,
    });
  }
}, [elapsed, status, autoStopTriggered]);




  const [visibleCount, setVisibleCount] = useState(20);
  const [showHistory, setShowHistory] = useState(false);

const formatTime = (ms: number) => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);

  return lang === "ja"
    ? `${h}時間${m}分`
    : `${h}h ${m}m`;
};


  const handleStart = () => {
    setAutoStopTriggered(false);

    const index = getTodayPairIndex(messageSet.length || 1);
    setIgnitePairIndex(index);
    setIgniteType("start");
    

    setIgniteMoment(true);
    setIgnitePhase(1);

    setTimeout(() => setIgnitePhase(2), 2000);

    setTimeout(() => {
      setIgniteMoment(false);
      setIgnitePhase(0);
      start();
    }, 4000);
  };

  const handleEnd = () => {
    const result = stop();

    setIgniteType("end");

    if (!result) return;

    const { startTime, endTime, duration } = result;

    const achieved =
  duration >= TIMER_PRESETS[mode] * 60 * 60 * 1000;

    completeFast({
      id: startTime,
      date: new Date(startTime).toISOString().split("T")[0],
      startTime,
      endTime,
      duration,
      targetHours: TIMER_PRESETS[mode],
      maxFastHours: MAX_FAST_HOURS,
      achieved,
      autoStopped: false,
      autoReset: false,
      mode, 
    });
  };

const handleLap = () => {
  const result = stop();

  if (!result) return;

  const {
    startTime,
    endTime,
    duration,
  } = result;

  const achieved =
    mode === "fast" &&
    duration >= TIMER_PRESETS[mode] * 60 * 60 * 1000;

  completeFast({
    id: startTime,
    date: new Date(startTime)
      .toISOString()
      .split("T")[0],
    startTime,
    endTime,
    duration,
    targetHours:  TIMER_PRESETS[mode],
    maxFastHours: MAX_FAST_HOURS,
    achieved,
    autoStopped: false,
    autoReset: false,

    // 後で履歴表示に使う
    mode,
  });

  // FAST⇔FEED切替
  const nextMode =
    mode === "fast"
      ? "feed"
      : "fast";

  setMode(nextMode);

  // 即再スタート
  start();
};

const currentMessage =
  ignitePairIndex !== null && igniteType
    ? messageSet[ignitePairIndex]?.[igniteType]
    : "";


  const handleReset = () => {
    reset();
    setIgnitePairIndex(null);
    setIgniteType(null);
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

    {ignitePhase === 1 && (
      <div className="ignite-text">
        IGNITE WITHIN
      </div>
    )}

    {ignitePhase === 2 && (
      <div className="ignite-message">
        {currentMessage}
      </div>
    )}
  </div>
)}

      <div style={{ marginBottom: "10px" }}>
      
     </div>
      <div className="session-title">
        {TEXT[lang].timerTitle}
        <IgniteLogo variant="icon" size="small" />
      </div>

   {currentMessage && (
     <div className="ignite-daily-message">
       {currentMessage}
     </div>
   )}

      <div className="timer-wrapper">
        <svg className="progress-ring" width="300" height="300"
             viewBox="0 0 300 300">
          <defs>
            <linearGradient id="igniteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00bfff" />
              <stop offset="100%" stopColor="#5ce1ff" />
            </linearGradient>

            <linearGradient id="feedGradient">
              <stop offset="0%"  stopColor="#5ce1ff"  />
              <stop offset="100%" stopColor="#7dffb3"/>
            </linearGradient>

          </defs>

          <circle
            stroke="#1a2a44"
            strokeWidth="0"
            fill="transparent"
            r="120"
            cx="150"
            cy="150"
          />

          <circle
            stroke={
             mode === "feed"
             ? "url(#feedGradient)"
             : "url(#igniteGradient)"
            }
            fill="transparent"
            strokeWidth={STROKE}
            r={RADIUS}
            cx="150"
            cy="150"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            style={{
              transform:"rotate(-90 150 150)"
            }}
            className={`progress-ring-progress
              ${status === "running" ? "running" : ""}
              ${status === "completed" ? "completed" : ""}
              ${mode === "feed" ? "feed" : "fast"}
            `}
          />

        </svg>



        <div
  className={`timer-display
    ${status}
    ${mode === "feed" ? "feed" : "fast"}
  `}
>
          {formatTime(elapsed)}
       </div>
     </div>

      <h3 style={{ paddingLeft: "12px" }}>
        {TEXT[lang].streak}: {streak}
      {lang === "ja" ? TEXT[lang].days : ` ${TEXT[lang].days}`}
      </h3>

      {/* 平均表示 */}
      {averageDuration > 0 && ( 
        <h4 style={{ paddingLeft: "12px" }}>
          {TEXT[lang].average}: {formatTime(averageDuration)}
        </h4>
      )}

      {/* FAST中UI */}
      {status === "running" && (
        <>
          <h2
            style={{
            paddingLeft: "12px",
            color:
              mode === "fast"
                ? "#8bd3ff"
                : "#8bffb3",
            }}
          >
           {mode === "fast"
             ? "🔥 IGNITE MODE"
             : "🌱 REBUILD MODE"}
          </h2>
<div
  style={{
    fontSize: "0.9rem",
    opacity: 0.7,
    marginTop: "-6px",
    marginBottom: "12px",
    paddingLeft: "22px",
  }}
>
  {mode === "fast"
    ? "Fasting Window"
    : "Recovery Window"}
</div>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-label">
                {mode === "fast"
                ? TEXT[lang].remaining
                : "Next Ignite In"}
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
  <div
    style={{
      textAlign: "center",
      marginTop: "18px",
    }}
  >
    <h3>
      {mode === "fast"
        ? TEXT[lang].igniteComplete
        : TEXT[lang].readyToIgnite}
    </h3>

    <p
      style={{
        opacity: 0.75,
        fontSize: "0.95rem",
        whiteSpace: "pre-line",
        marginTop: "-6px",
      }}
    >
      {mode === "fast"
        ? TEXT[lang].igniteSub
        : TEXT[lang].readySub}
    </p>
  </div>
)}
        </>
      )}



      {/* ボタン制御 */}
{status === "idle" && (
  <div className="button-group">
    <button
      onClick={() => {
        setMode("fast");
        handleStart();
      }}
    >
      START FAST
    </button>

    <button
      onClick={() => {
        setMode("feed");
        handleStart();
      }}
    >
      START FEED
    </button>
  </div>
)}

{status === "running" && (
  <div className="button-group">

    <button onClick={handleLap}>
      LAP
    </button>

    <button onClick={handleEnd}>
      STOP
    </button>

  </div>
)}


{status === "completed" && (
  <div className="button-group">
    <button onClick={handleStart}>
      {TEXT[lang].startAgain}
    </button>
    <button onClick={handleReset}>
      {TEXT[lang].reset}
    </button>
  </div>
)}

      <hr style={{ margin: "20px 0" }} />

      <h4
  onClick={() => setShowHistory(!showHistory)}
  style={{
    cursor: "pointer",
    textAlign: "center",
  }}
>
  {showHistory
    ? `▼ ${TEXT[lang].history}`
    : `▶ ${TEXT[lang].history}`}
</h4>

<div className="brand-mark">
  Ignite Within™
</div>

{showHistory && (
  <>
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
          
            borderLeft:
              entry.mode === "feed"
                ? "4px solid #7dffb3"
                : "4px solid #5ce1ff",
          
            boxShadow:
              entry.mode === "feed"
                ? "0 0 12px rgba(125,255,179,0.15)"
                : "0 0 12px rgba(92,225,255,0.15)",
          }}
        >
          <div
            style={{
              color:
                entry.mode === "fast"
                  ? "#8bd3ff"
                  : "#8bffb3",
              fontWeight:"bold",
              marginBottom:"6px"
            }}
          >

            {entry.mode === "fast"
              ? "🔥 IGNITE MODE"
              : "🌱 REBUILD MODE"}
          </div>


          <div
           style={{
             fontSize: "12px",
             opacity: 0.65,
             fontStyle: "italic",
             marginBottom: "4px",
             paddingLeft: "30px",
           }}
          >
            {entry.mode === "feed"
              ? "Recovery Window"
              : "Fasting Window"}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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

          <div
            style={{
              marginTop: "6px",
              fontWeight: "bold",
              color:
                entry.mode === "feed"
                  ? "#7dffb3"
                  : "#5ce1ff",
                  
            }}
          >
            {entry.mode === "feed"
              ? "FEED "
              : "FAST "}
          
            {formatTime(entry.duration)}
          </div>
        </div>
      ))}

    {visibleCount < history.length && (
      <button
        onClick={() =>
          setVisibleCount((prev) => prev + 20)
        }
      >
        {TEXT[lang].loadMore}
      </button>
    )}
  </>
)}

<div className="copyright">
  © 2026 Ignite Within
  <br />
  All Rights Reserved.
</div>

</div>
  );
};