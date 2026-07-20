import { useState } from "react";

type ReflectionCardProps = {
  visible: boolean;
};

const [reflection, setReflection] = useState("");

export default function ReflectionCard({
  visible,
}: ReflectionCardProps) {
  if (!visible) return null;

  return (
    <div className="reflection-card">
      <h2>🔥 Reflection</h2>

      <p>
        7日間、お疲れさまでした。
      </p>

      <p>
        この7日で、
        あなた自身にどんな変化がありましたか。
      </p>

      <textarea
  value={reflection}
  onChange={(e) => setReflection(e.target.value)}
  placeholder="ここにあなたのReflectionを書いてください"
  rows={5}
  className="reflection-textarea"
/>
<button
  className="reflection-save-button"
  disabled={!reflection.trim()}
>
  Complete Reflection
</button>

    </div>
  );
}