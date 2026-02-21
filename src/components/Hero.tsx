type HeroProps = {
  t: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  onOpenModal: () => void;
};

function Hero({ t, onOpenModal }: HeroProps) {
  return (
    <section className="hero">
      <div className="container">
        <h1>{t.headline}</h1>
        <p>{t.subheadline}</p>
        <button
          className="button-primary"
          onClick={onOpenModal}
        >
          {t.cta}
        </button>
      </div>
    </section>
  );
}


export default Hero;
