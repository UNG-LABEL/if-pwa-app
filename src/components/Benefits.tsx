type BenefitsProps = {
  t: {
    headline: string;
    items: string[];
  };
};

function Benefits({ t }: BenefitsProps) {
  return (
    <section className="section-light">
      <div className="container">
        <h2>{t.headline}</h2>

        <ul className="benefits-list">
          {t.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}


export default Benefits;
