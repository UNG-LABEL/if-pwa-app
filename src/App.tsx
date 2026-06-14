import { useState, useEffect } from "react";
import languages from "./data/languages.json";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import Modal from "./components/Modal";
import Trust from "./components/Trust";

import { IFTimer } from "./components/IFTimer";

import "./App.css";

type LangKey = keyof typeof languages;

function App() {
  // ① 言語state（既存OK）
  const [lang, setLang] = useState<LangKey>(() => {
    const saved = localStorage.getItem("lang");
    return (saved as LangKey) || "ja";
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = languages[lang] || languages["en"];

  // ② 保存（既存OK）
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <>
      <div style={{ fontFamily: "sans-serif" }}>
        
        {/* ③ 言語切替（6言語化） */}
        <div className="lang-switch">
          {["ja", "en", "es", "pt", "id", "fr"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l as LangKey)}
              disabled={lang === l}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <Hero
          t={t.hero}
          onOpenModal={() => setIsModalOpen(true)}
        />

        <Problem t={t.problem} />

        <Benefits t={t.benefits} />

        <Trust t={t.trust} />

        <CTA t={t.cta} onOpen={() => setIsModalOpen(true)} />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          t={t.modal}
        />

        <hr style={{ margin: "40px 0" }} />

        {/* ④ langを渡す（ここ超重要） */}
        <IFTimer lang={lang} />

      </div>
    </>
  );
}

export default App;