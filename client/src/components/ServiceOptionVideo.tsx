import { useEffect, useRef, useState } from "react";
import "./archer-video.css";

export default function ServiceOptionVideo({ name, label, mobileName }: { name: string; label: string; mobileName?: string }) {
  const [smallScreen, setSmallScreen] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  const activeName = smallScreen && mobileName ? mobileName : name;
  useEffect(() => { const query=window.matchMedia("(max-width: 767px)"); const sync=()=>setSmallScreen(query.matches); query.addEventListener("change",sync); return ()=>query.removeEventListener("change",sync); }, []);
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const element = video.current;
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
    return () => { element?.pause(); observer.disconnect(); preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [activeName]);
  return <div className="archer-video services-option-video">
    <video key={activeName} ref={video} muted playsInline loop preload="none" poster={`/videos/${activeName}-poster.webp`} aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src={`/videos/${activeName}.mp4`} type="video/mp4" />
    </video>
    <button type="button" aria-label={playing ? `Pause ${label} animation` : `Play ${label} animation`} onClick={() => {
      if (playing) { manuallyPaused.current = true; video.current?.pause(); }
      else { manuallyPaused.current = false; void video.current?.play().catch(() => setPlaying(false)); }
    }}><span className="sr-only">{playing ? "Pause animation" : "Play animation"}</span></button>
  </div>;
}
