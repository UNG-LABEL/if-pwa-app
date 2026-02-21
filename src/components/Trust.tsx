type TrustProps = {
  t: {
    title: string;
    points: string[];
  };
};

function Trust({ t }: TrustProps) {
  return (
    <section className="section-light">
      <div className="container">
        <h2>{t.title}</h2>

        <ul className="trust-list">
          {t.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Trust;
