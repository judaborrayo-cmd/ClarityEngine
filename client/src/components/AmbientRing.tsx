import { useEffect, useRef, useState } from "react";
import "./ambient-ring.css";

export default function AmbientRing() {
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || document.hidden || preference.matches || manuallyPaused.current) video.current?.pause();
      else void video.current?.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0.1 });
    if (video.current) observer.observe(video.current);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <div className="ambient-ring">
    <video ref={video} muted playsInline loop preload="none" poster="/videos/clarity-ring-poster.webp" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src="/videos/clarity-ring.mp4" type="video/mp4" />
    </video>
    <button type="button" aria-label={playing ? "Pause ring animation" : "Play ring animation"} onClick={() => {
      if (playing) { manuallyPaused.current = true; video.current?.pause(); }
      else { manuallyPaused.current = false; void video.current?.play().catch(() => setPlaying(false)); }
    }}><span className="sr-only">{playing ? "Pause animation" : "Play animation"}</span></button>
  </div>;
}
