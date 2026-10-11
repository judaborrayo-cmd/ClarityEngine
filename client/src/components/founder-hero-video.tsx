import { useEffect, useRef, useState } from "react";

export default function FounderHeroVideo() {
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
      if (!visible || preference.matches || manuallyPaused.current || element.ended) element.pause();
      else void element.play().catch(() => setFailed(true));
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0.25 });
    observer.observe(element); preference.addEventListener("change", sync);
    return () => { observer.disconnect(); preference.removeEventListener("change", sync); element.pause(); };
  }, []);
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
  const label = ended ? "Replay founder transformation" : playing ? "Pause founder transformation" : "Play founder transformation";
  return <figure className="founder-photo founder-hero-video">
    <div className="founder-hero-video-frame">
      {failed ? <img src="/videos/juda-founder-transformation-poster.webp" width="1764" height="1176" alt="Juda Borrayo in his workspace beside a hanging Clarity Engine logo switch" /> : <video ref={video} muted playsInline preload="none" poster="/videos/juda-founder-transformation-poster.webp" width="1764" height="1176" aria-label="Juda Borrayo’s workspace transforms into a Clarity Engine illustration" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setEnded(true); }} onError={() => setFailed(true)}><source src="/videos/juda-founder-transformation.mp4" type="video/mp4" /></video>}
    </div>
    <div className="founder-hero-video-meta"><figcaption>Juda Borrayo · Founder of Clarity Engine</figcaption>{!failed && <button type="button" onClick={toggle} aria-label={label}>{ended ? "Replay" : playing ? "Pause" : "Play"}<span aria-hidden="true"> {ended ? "↻" : playing ? "Ⅱ" : "▷"}</span></button>}</div>
  </figure>;
}
