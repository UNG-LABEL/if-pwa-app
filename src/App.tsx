import { useState, useEffect } from "react";
import languages from "./data/languages.json";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import Modal from "./components/Modal";
import Trust from "./components/Trust";

import { IFTimer } from "./components/IFTimer";

type LangKey = keyof typeof languages;

function App() {
  const [lang, setLang] = useState<LangKey>(() => {
  const saved = localStorage.getItem("lang");
  return (saved as LangKey) || "ja";
});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = languages[lang];
useEffect(() => {
  localStorage.setItem("lang", lang);
}, [lang]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* 言語切替 */}
      <div className="lang-switch">
  <button onClick={() => setLang("ja")} disabled={lang === "ja"}>
    JP
  </button>
  <button
    onClick={() => setLang("en")}
    disabled={lang === "en"}
  >
    EN
  </button>
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
<IFTimer />


    </div>
  );
}



export default App;
