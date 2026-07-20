import { useState } from "react";
import { useReflection } from "../hooks/useReflection";
import MyPromiseCard from "./MyPromiseCard";


type ReflectionCardProps = {
  visible: boolean;
};



export default function ReflectionCard({
  visible,
}: ReflectionCardProps) {
const [reflection, setReflection] = useState("");
const { save } = useReflection();
const [completed, setCompleted] = useState(false);

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
  onClick={() => {
  save(reflection);
  setCompleted(true);
  }}
  
>
  Complete Reflection
</button>

{completed && (
  <MyPromiseCard visible />
)}

    </div>
  );
}