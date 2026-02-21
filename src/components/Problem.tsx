type ProblemProps = {
  t: {
    headline: string;
    items: string[];
  };
};

function Problem({ t }: ProblemProps) {
  return (
    <section className="section-light">
      <div className="container">
        <h2>{t.headline}</h2>

        <ul className="problem-list">
          {t.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}


export default Problem;
