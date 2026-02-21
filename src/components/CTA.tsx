type CTAProps = {
  t: {
    headline: string;
    button: string;
  };
  onOpen: () => void;
};

function CTA({ t, onOpen }: CTAProps) {
  return (
    <section className="section-dark">
      <div className="container">
        <h2>{t.headline}</h2>

        <button
          className="button-primary"
          onClick={onOpen}
        >
          {t.button}
        </button>
      </div>
    </section>
  );
}


export default CTA;
