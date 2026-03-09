import { useEffect } from "react"
import "./IgniteOverlay.css"

type Props = {
  onFinish: () => void
}

export default function IgniteOverlay({ onFinish }: Props) {

  useEffect(() => {

    const timer = setTimeout(() => {
      onFinish()
    }, 3000)

    return () => clearTimeout(timer)

  }, [])

  return (

    <div className="ignite-overlay">

      <video
        className="ignite-overlay-video"
        autoPlay
        muted
        playsInline
        preload="none"
      >
        <source src="/video/test_overlay_2.webm" type="video/webm" />
        <source src="/video/test_overlay_1.mp4" type="video/mp4" />
      </video>

      <div className="ignite-message">
        IGNITE WITHIN
      </div>

    </div>

  )
}