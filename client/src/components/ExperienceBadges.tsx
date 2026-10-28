import { useEffect, useRef } from "react";
import { BarChart3, TrendingUp, Compass, Layers3, Award } from "lucide-react";
import "./experience-badges.css";

const experience = [
  { value: "$5M+", label: "Ad spend managed", detail: "Across growth brands", Icon: BarChart3 },
  { value: "Multi-million", label: "Revenue driven", detail: "Through paid media", Icon: TrendingUp },
  { value: "12+ years", label: "Paid media &", detail: "growth strategy", Icon: Compass },
  { value: "Proven results", label: "Travel · Fitness", detail: "Luxury · Education", Icon: Layers3 },
  { value: "Top Specialist", label: "Recognized by Contra", detail: "2025", Icon: Award },
];

function FinishedIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    {index === 0 && <><path d="M9 8v31h31" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><rect x="15" y="25" width="5" height="9" rx="1.5" fill="currentColor"/><rect x="24" y="17" width="5" height="17" rx="1.5" fill="currentColor"/><rect x="33" y="10" width="5" height="24" rx="1.5" fill="currentColor"/></>}
    {index === 1 && <><path d="M7 35 20 23l8 7 13-17v25H7Z" fill="currentColor" opacity=".18"/><path d="m7 30 13-12 8 7L41 9m-11 0h11v11" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></>}
    {index === 2 && <><circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="3"/><path d="m32 16-5 12-11 4 5-12Z" fill="currentColor"/><circle cx="24" cy="24" r="2" fill="white"/></>}
    {index === 3 && <><path d="m6 18 18-9 18 9-18 9Z" fill="currentColor"/><path d="m7 26 17 9 17-9M7 34l17 9 17-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></>}
    {index === 4 && <><path d="m15 28-3 14 12-6 12 6-3-14" fill="currentColor" opacity=".75"/><circle cx="24" cy="19" r="13" fill="currentColor"/><path d="m24 11 2.3 4.8 5.3.8-3.8 3.7.9 5.3-4.7-2.5-4.7 2.5.9-5.3-3.8-3.7 5.3-.8Z" fill="#fff3cb"/></>}
  </svg>;
}

export default function ExperienceBadges({ animateOnScroll = false }: { animateOnScroll?: boolean }) {
  const proofRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!animateOnScroll || !proofRef.current) return;
    const element = proofRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let start = 0;
    const paint = () => {
      frame = 0;
      const progress = reduced.matches ? 0 : Math.max(0, Math.min(1, (window.scrollY - start) / 260));
      element.style.setProperty('--seal-progress', String(progress));
      // One soft light pulse at the midpoint; reversible with scroll, no repeated flashing.
      const glow = Math.sin(Math.PI * progress) ** 2;
      element.style.setProperty('--seal-glow', String(glow));
    };
    const measure = () => {
      start = Math.max(0, element.getBoundingClientRect().top + window.scrollY - window.innerHeight * .82);
      paint();
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new ResizeObserver(measure);
    // Observe the hero as well: loaded fonts and media can move the badge strip.
    observer.observe(element);
    if (element.parentElement?.parentElement) observer.observe(element.parentElement.parentElement);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    reduced.addEventListener('change', paint);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      reduced.removeEventListener('change', paint);
    };
  }, [animateOnScroll]);
  return <div ref={proofRef} className={`experience-proof${animateOnScroll ? ' experience-scroll-morph' : ''}`} aria-label="Experience and recognition">
    <ul className="experience-badges">{experience.map(({value,label,detail,Icon}, index) => <li key={value}>
      <div className={`experience-icon experience-icon-${index}`} aria-hidden="true">
        <div className="experience-seal"><Icon size={29} strokeWidth={1.3} /><span className="experience-cross experience-cross-a"/><span className="experience-cross experience-cross-b"/></div>
        {animateOnScroll && <><div className="experience-finished"><FinishedIcon index={index}/></div><div className="experience-morph-light" /></>}
      </div>
      <strong>{value}</strong><span>{label}</span><small>{detail}</small>
    </li>)}</ul>
    <div className="experience-platforms"><p className="experience-platform-heading">Hands-on platform experience</p><p>Google Ads <i>·</i> YouTube Ads <i>·</i> Meta Ads <i>·</i> Google Analytics</p><p>LinkedIn Ads <i>·</i> Shopify <i>·</i> WordPress <i>·</i> Vibe coding</p></div>
  </div>;
}
