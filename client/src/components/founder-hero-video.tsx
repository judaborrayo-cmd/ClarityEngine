import { useEffect, useRef, useState } from "react";

interface FounderHeroVideoProps {
  src?: string;
  poster?: string;
  description?: string;
  controlLabel?: string;
  width?: number;
  height?: number;
  variant?: "founder" | "roadmap";
}
export default function FounderHeroVideo({
  src = "/videos/juda-founder-transformation.mp4",
  poster = "/videos/juda-founder-transformation-poster.webp",
  description = "Juda Borrayo’s workspace transforms into a Clarity Engine illustration",
  controlLabel = "founder transformation",
  width = 1764,
  height = 1176,
  variant = "founder",
}: FounderHeroVideoProps = {}) {
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || (variant === "roadmap" && document.hidden) || preference.matches || manuallyPaused.current || element.ended) element.pause();
      else void element.play().catch(() => setFailed(true));
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0.25 });
    observer.observe(element); preference.addEventListener("change", sync);
    if (variant === "roadmap") document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); element.pause(); };
  }, [src, variant]);
  async function toggle() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) { manuallyPaused.current = true; element.pause(); }
    else {
      manuallyPaused.current = false;
      if (element.ended) { element.currentTime = 0; setEnded(false); }
      try { await element.play(); } catch { setFailed(true); }
    }
  }
  const label = `${ended ? "Replay" : playing ? "Pause" : "Play"} ${controlLabel}`;
  const roadmap = variant === "roadmap";
  const mediaClass = roadmap ? "absolute inset-0 h-full w-full object-contain" : undefined;
  return <figure className={roadmap ? "absolute inset-0 m-0" : "founder-photo founder-hero-video"} data-testid={roadmap ? "scale-roadmap-video" : undefined}>
    <div className={roadmap ? "absolute inset-0" : "founder-hero-video-frame"}>
      {failed ? <img src={poster} width={width} height={height} className={mediaClass} alt={roadmap ? description : "Juda Borrayo in his workspace beside a hanging Clarity Engine logo switch"} /> : <video ref={video} muted playsInline loop preload="none" poster={poster} width={width} height={height} className={mediaClass} role="button" tabIndex={0} aria-label={label} onClick={toggle} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); void toggle(); } }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setEnded(true); }} onError={() => setFailed(true)}><source src={src} type="video/mp4" /></video>}
    </div>
    <div className={roadmap ? "absolute right-2 top-2" : "founder-hero-video-meta"}>
      {!roadmap && <figcaption>Juda Borrayo · Founder of Clarity Engine</figcaption>}

    </div>
  </figure>;
}
