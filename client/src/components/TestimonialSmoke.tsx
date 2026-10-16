import { useEffect, useRef, useState } from "react";

export default function TestimonialSmoke() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [desktop, setDesktop] = useState(false);

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
    if (!desktop || !media || !section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let target = 0;
    const seek = () => {
      frame = 0;
      if (media.seeking || !Number.isFinite(media.duration)) return;
      if (Math.abs(media.currentTime - target) > 1 / 30) media.currentTime = target;
    };
    const update = () => {
      if (reduced.matches || !Number.isFinite(media.duration)) return;
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
      target = progress * Math.max(0, media.duration - 0.05);
      if (!frame) frame = requestAnimationFrame(seek);
    };
    media.addEventListener("loadedmetadata", update);
    media.addEventListener("seeked", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const motionChanged = () => {
      if (reduced.matches) { target = 0; media.currentTime = 0; }
      else update();
    };
    reduced.addEventListener("change", motionChanged);
    update();
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("loadedmetadata", update);
      media.removeEventListener("seeked", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reduced.removeEventListener("change", motionChanged);
    };
  }, [desktop]);

  return <div ref={container} className="testimonial-smoke" aria-hidden="true">
    {desktop && <video ref={video} muted playsInline preload="auto" poster="/videos/testimonials-smoke-desktop.jpg" src="/videos/testimonials-smoke-desktop.mp4" />}
  </div>;
}
