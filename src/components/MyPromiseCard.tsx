import { useState } from "react";
import { useMyPromise } from "../hooks/useMyPromise";

type MyPromiseCardProps = {
  visible: boolean;
};

export default function MyPromiseCard({
  visible,
}: MyPromiseCardProps) {
  if (!visible) return null;
const [promise, setPromise] = useState("");
const { save } = useMyPromise();
const [completed, setCompleted] = useState(false);


  return (
    <div className="my-promise-card">
      <h2>🌱 My Promise</h2>

      <p>
        次の7日間で、
        あなたが大切にしたいことは何ですか。
      </p>

      <textarea
  value={promise}
  onChange={(e) => setPromise(e.target.value)}
  placeholder="ここに次の7日間のPromiseを書いてください"
  rows={4}
  className="my-promise-textarea"
/>

<button
  className="my-promise-button"
  disabled={completed || !promise.trim()}
  onClick={() => {
    save(promise);
    setCompleted(true);
  }}
>
  {completed
    ? "My Promise Complete"
    : "Complete My Promise"}
</button>

    </div>
  );
}