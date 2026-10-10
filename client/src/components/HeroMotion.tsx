import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/** Illustrative artwork only. The poster remains visible when motion is unavailable. */
export default function HeroMotion() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setAllowed(!preference.matches && !connection?.saveData);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => {
      if (!allowed || pausedByUser || document.hidden || failed) video.pause();
      else void video.play().catch(() => setPlaying(false));
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [allowed, pausedByUser, failed]);

  return (
    <div className="home-hero-visual">
      <div className="home-hero-media" data-playing={playing}>
        <img src="/videos/clarity-hero-poster.jpg" width="1280" height="720"
          fetchPriority="high" alt="Illustrative green and violet marketing growth visualization" />
        {allowed && !failed && (
          <video ref={videoRef} src="/videos/clarity-hero.mp4" muted autoPlay loop playsInline
            preload="metadata" poster="/videos/clarity-hero-poster.jpg" aria-hidden="true"
            onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
            onWaiting={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />
        )}
        {allowed && !failed && (
          <button type="button" className="home-motion-toggle"
            onClick={() => setPausedByUser((value) => !value)}
            aria-label={pausedByUser ? "Play hero animation" : "Pause hero animation"}
            aria-pressed={pausedByUser}>
            {pausedByUser ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {pausedByUser ? "Play motion" : "Pause motion"}
          </button>
        )}
      </div>
      <p className="home-visual-note">Designed to communicate clarity, insight, and growth</p>
    </div>
  );
}
