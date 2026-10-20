import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./about-founder.css";
import FounderHeroVideo from "@/components/founder-hero-video";


const offerMedia = [
  { src: "/videos/get-clarity-assessment-ping-pong.mp4", poster: "/videos/get-clarity-assessment-poster.webp", loop: true },
  { src: "/videos/strategy-sprint-hero.mp4", poster: "/videos/strategy-sprint-hero-poster.webp", loop: false },
  { src: "/videos/clarity-engine-hero-new.mp4", poster: "/videos/clarity-hero-poster.jpg", loop: true },
];
export function OfferPreview({ index, title }: { index: number; title: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const media = offerMedia[index];
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || preference.matches || manuallyPaused.current || element.ended) element.pause();
      else void element.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0.25 });
    observer.observe(element); preference.addEventListener("change", sync);
    return () => { observer.disconnect(); preference.removeEventListener("change", sync); element.pause(); };
  }, []);
  async function toggle() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) { manuallyPaused.current = true; element.pause(); }
    else { manuallyPaused.current = false; if (element.ended) element.currentTime = 0; try { await element.play(); } catch { setPlaying(false); } }
  }
  return <div className="founder-offer-preview">
    {failed ? <img src={media.poster} alt={`${title} preview`} loading="lazy" width="1280" height="720" /> : <video ref={video} muted playsInline loop={media.loop} preload="none" poster={media.poster} role="button" tabIndex={0} aria-label={`${playing ? "Pause" : "Play"} ${title} preview`} onClick={toggle} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); void toggle(); } }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setFailed(true)}><source src={media.src} type="video/mp4" /></video>}
  </div>;
}

export default function About() {
  return <main className="founder-page">
    <section className="founder-wrap founder-hero">
      <div><p className="founder-eyebrow">Juda Borrayo</p><p className="founder-relationship">Founder of Clarity Engine</p><p className="founder-title">Senior Growth Marketing Strategist | Paid Media, CRO &amp; Full-Funnel Growth</p><h1>Clearer decisions.<br /><em>More focused growth.</em></h1><p className="founder-lead">I help founders and teams understand where their marketing is getting stuck, decide what deserves attention next, and turn that direction into practical work.</p><div className="founder-actions"><a className="founder-button" href="#ways-to-work">Explore ways to work together <span aria-hidden="true">↓</span></a><Link className="founder-link" to="/case-studies">View case studies →</Link></div><div className="founder-contact"><a href="mailto:Juda.Borrayo@gmail.com">Email Juda</a><a href="https://www.linkedin.com/in/judaborrayo" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
      <div className="founder-visual"><FounderHeroVideo startAt={2.5} /><aside className="founder-perspective"><span className="founder-eyebrow">The bigger picture</span><p>Through Clarity Engine, I connect paid media, messaging, landing pages, and measurement to the bigger picture of how people discover your business, understand your offer, and become customers.</p><div className="founder-journey" aria-label="Customer journey"><span>Discover</span><span aria-hidden="true">→</span><span>Understand</span><span aria-hidden="true">→</span><span>Become a customer</span></div></aside></div>
    </section>
    <section className="founder-wrap founder-section founder-split"><div><p className="founder-eyebrow">Experience & perspective</p><h2>Looking beyond<br /><em>the ad account.</em></h2></div><div className="founder-prose"><p>I provide growth marketing strategy, paid media management, conversion optimization, and analytics consulting for founders and teams.</p><p>I work across Google Ads, YouTube, Meta, funnel strategy, conversion optimization, analytics, attribution, audience strategy, and creative testing, including ongoing campaigns and launches.</p><p>A large part of my work is diagnosing where performance breaks down across the customer journey; sometimes the issue is traffic quality, sometimes it’s the offer, the message, the landing page, or what happens after someone enquires.</p><p>Understanding those connections helps us choose a useful next step instead of adding activity without a clear reason.</p></div></section>
    <section className="founder-tint"><div className="founder-wrap founder-section"><p className="founder-eyebrow">Approach</p><h2>Find the opportunity.<br /><em>Make the next move practical.</em></h2><ol className="founder-steps">{[
      ["Understand what’s happening", "Look at your goals, marketing, customer experience, and available evidence."],
      ["Decide what to do next", "Separate distractions from opportunities and choose what deserves attention now."],
      ["Put the plan into practice", "Work across landing pages, CRO, analytics, CRM and email, and testing, using AI-assisted tools where useful."],
      ["Learn from what changes", "Use measurement and experimentation to decide what to improve next."],
    ].map(([title,body],i) => <li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>
    <section className="founder-wrap founder-section founder-motivation"><div><p className="founder-eyebrow">Motivation</p><h2>Helping people<br /><em>understand—and act.</em></h2></div><div className="founder-prose"><p>I enjoy the conversations where a complicated problem becomes easier to understand and someone can see what to do next.</p><p>That’s the thinking behind Clarity Engine: practical guidance, useful resources, and collaborative work that helps people make more informed decisions.</p></div></section>
    <section className="founder-wrap founder-evidence"><div><p className="founder-eyebrow">Selected work</p><h2>See the work <em>in context.</em></h2><p>Explore selected case studies to see the challenges, decisions, and work behind different engagements.</p></div><Link to="/case-studies" className="founder-button">View case studies →</Link></section>
    <section id="ways-to-work" className="founder-wrap founder-section"><p className="founder-eyebrow">Ways to work together</p><h2>Choose the support that fits <em>where you are.</em></h2><div className="founder-offers">{[
      ["Get Clarity Assessment", "A self-guided starting point to examine six essential marketing areas and identify where to focus next.", "Explore the assessment", "/marketing-clarity-assesment"],
      ["30-Day Growth Strategy Sprint", "Three live sessions to work through your priorities, solve practical problems, and leave with clearer next actions.", "Explore the Strategy Sprint", "/strategy-sprint"],
      ["Ongoing growth support", "For businesses looking for continuing help with paid media, CRO, measurement, and growth strategy.", "Explore services", "/services"],
    ].map(([title,body,label,to],i) => <article key={to}><span className="founder-eyebrow">0{i+1}</span><h3>{title}</h3><OfferPreview index={i} title={title} /><p>{body}</p><Link to={to} className="founder-link">{label} →</Link></article>)}</div></section>
  </main>;
}
