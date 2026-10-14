import { useEffect, useRef, useState } from "react";

/** Illustrative artwork only. Respect motion preferences and keep the paused frame visible. */
export default function HeroMotion() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
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
      if (!allowed || document.hidden || failed || userPaused) video.pause();
      else void video.play().catch(() => setPlaying(false));
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [allowed, failed, userPaused]);

  return (
    <div className="home-hero-visual">
      <div className="home-hero-media" data-ready={ready} data-playing={playing}>
        <img src="/videos/clarity-hero-expressive-poster.jpg" width="1280" height="720"
          fetchPriority="high" alt="Illustrative green and violet marketing growth visualization" />
        {allowed && !failed && (
          <video ref={videoRef} src="/videos/clarity-engine-hero-expressive.mp4" muted autoPlay loop playsInline
            preload="metadata" poster="/videos/clarity-hero-expressive-poster.jpg" aria-hidden="true"
            onLoadedData={() => setReady(true)}
            onPlaying={() => { setReady(true); setPlaying(true); }} onPause={() => setPlaying(false)}
            onWaiting={() => setPlaying(false)} onError={() => { setFailed(true); setReady(false); setPlaying(false); }} />
        )}
        {allowed && !failed && (playing || userPaused) && (
          <button type="button" className="home-motion-toggle"
            aria-label={userPaused ? "Resume homepage animation" : "Pause homepage animation"}
            onClick={() => setUserPaused(paused => !paused)}>
            {!userPaused && <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1" /><rect x="9" y="3" width="3" height="10" rx="1" /></svg>}
            <span className={userPaused ? undefined : "sr-only"}>{userPaused ? "Resume" : "Pause"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
