import { useEffect, useRef, useState } from "react";

export default function FounderNavMotion() {
  const [playing, setPlaying] = useState(false);
  const manuallyPaused = useRef(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let plays = 0;
    const sync = () => {
      if (preference.matches || document.hidden || !visible || plays >= 3 || manuallyPaused.current) media.pause();
      else void media.play().catch(() => {});
    };
    const ended = () => { plays += 1; if (plays < 3) { media.currentTime = 0; sync(); } };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(media);
    media.addEventListener("ended", ended);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); media.removeEventListener("ended", ended); preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <div className="ce-nav-founder"><img src="/images/services/juda-guide.webp" alt="Juda pointing toward Explore Services" width="240" height="360" /><video ref={video} src="/videos/juda-menu-point.mp4" muted playsInline preload="none" poster="/images/services/juda-guide.webp" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} /><button type="button" className="ce-nav-founder-control" aria-label={playing ? "Pause Juda animation" : "Play Juda animation"} onClick={() => { manuallyPaused.current = playing; if (playing) video.current?.pause(); else { if (video.current?.ended) video.current.currentTime = 0; void video.current?.play().catch(() => {}); } }} /></div>;
}
