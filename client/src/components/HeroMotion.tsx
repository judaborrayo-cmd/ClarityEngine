import { useEffect, useRef, useState } from "react";

/** Illustrative artwork only. The poster remains visible when motion is unavailable. */
export default function HeroMotion() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
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
      if (!allowed || document.hidden || failed) video.pause();
      else void video.play().catch(() => setPlaying(false));
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [allowed, failed]);

  return (
    <div className="home-hero-visual">
      <div className="home-hero-media" data-playing={playing}>
        <img src="/videos/clarity-hero-poster.jpg" width="1280" height="720"
          fetchPriority="high" alt="Illustrative green and violet marketing growth visualization" />
        {allowed && !failed && (
          <video ref={videoRef} src="/videos/clarity-engine-hero-new.mp4" muted autoPlay loop playsInline
            preload="metadata" poster="/videos/clarity-hero-poster.jpg" aria-hidden="true"
            onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
            onWaiting={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />
        )}

      </div>
    </div>
  );
}
