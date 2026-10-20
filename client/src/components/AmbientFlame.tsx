import { useEffect, useRef, useState } from "react";
import "./ambient-flame.css";

export default function AmbientFlame() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (preference.matches) video.current?.pause();
      else void video.current?.play().catch(() => setPlaying(false));
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  return <div className="ambient-flame">
    <video ref={video} muted playsInline loop preload="metadata" poster="/videos/assessment-flame-poster.webp" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src="/videos/assessment-flame.mp4" type="video/mp4" />
    </video>
    <button type="button" aria-label={playing ? "Pause background animation" : "Play background animation"} onClick={() => { if (playing) video.current?.pause(); else void video.current?.play().catch(() => setPlaying(false)); }}>{playing ? "Pause motion" : "Play motion"}</button>
  </div>;
}
