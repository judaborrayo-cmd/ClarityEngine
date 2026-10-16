import { useEffect, useRef, useState } from "react";

export default function TestimonialSmoke() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const media = video.current;
    const section = container.current?.closest("section");
    if (desktop === null || !media || !section) return;
    const layer = container.current!;
    let primed = false;
    const prime = () => {
      if (primed) return;
      primed = true;
      // Initialize decoding so Safari replaces its initial still frame.
      media.play()?.then(() => { media.pause(); update(); }).catch(() => { primed = false; });
    };
    let frame = 0;
    let target = 0;
    const seek = () => {
      frame = 0;
      if (media.seeking || !Number.isFinite(media.duration)) return;
      if (Math.abs(media.currentTime - target) > 1 / 30) media.currentTime = target;
    };
    const update = () => {
      if (!Number.isFinite(media.duration)) return;
      const bounds = section.getBoundingClientRect();
      if (!desktop) {
        const visibleHeight = window.innerHeight - 102;
        const pinnedTop = Math.max(0, Math.min(102 - bounds.top, bounds.height - visibleHeight));
        layer.style.setProperty("--smoke-pin", `${pinnedTop}px`);
      }
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.9 - bounds.top) / Math.max(bounds.height, window.innerHeight * 0.8)));
      layer.style.setProperty("--smoke-offset", `${-8 + progress * 16}%`);
      target = progress * Math.max(0, media.duration - 0.05);
      if (!frame) frame = requestAnimationFrame(seek);
    };
    media.addEventListener("loadedmetadata", update);
    media.addEventListener("loadeddata", prime);
    window.addEventListener("scroll", prime, { passive: true });
    media.addEventListener("seeked", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("loadedmetadata", update);
      media.removeEventListener("seeked", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("loadeddata", prime);
      window.removeEventListener("scroll", prime);
      media.pause();
    };
  }, [desktop]);

  return <div ref={container} className="testimonial-smoke" aria-hidden="true">
    <div className="testimonial-smoke-frame">
      {desktop !== null && <video key={desktop ? "desktop" : "mobile"} ref={video} muted playsInline preload="auto" src={`/videos/testimonials-smoke-${desktop ? "desktop" : "mobile"}.mp4`} />}
    </div>
  </div>;
}
