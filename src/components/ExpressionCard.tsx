type Props = {
  language: string;
  text: string;
  meaning: string;
};

export default function ExpressionCard({ language, text, meaning }: Props) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px"
    }}>
      <div style={{ fontSize: "12px", color: "#666" }}>
        {language}
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        {text}
      </div>
      <div style={{ marginTop: "8px", color: "#333" }}>
        {meaning}
      </div>
    </div>
  );
}