import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./about-founder.css";
import InquiryForm from "@/components/inquiry-form";
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
      <div><p className="founder-relationship">Juda Borrayo · Founder of Clarity Engine</p><p className="founder-title">Senior Growth Marketing Strategist | Paid Media, CRO &amp; Full-Funnel Growth</p><h1>Experienced direction.<br /><em>Hands-on help to grow.</em></h1><p className="founder-lead">I founded Clarity Engine to help businesses connect marketing decisions with the work that moves them forward. Get senior strategy and practical support to turn more interest in your experience into inquiries, bookings, and revenue.</p><div className="founder-actions"><a className="founder-button" href="#ways-to-work">Explore ways to work together </a><Link className="founder-link" to="/case-studies">View case studies </Link></div><div className="founder-contact"><a href="#inquiry">Ask a question</a><a href="https://www.linkedin.com/in/judaborrayo" target="_blank" rel="noopener noreferrer">LinkedIn </a></div></div>
      <div className="founder-visual"><FounderHeroVideo startAt={2.5} /><aside className="founder-perspective"><p>Your customers experience the whole journey. Clarity Engine connects the ads, messaging, landing pages, and measurement behind it—so your team can see what deserves attention and act on it.</p><div className="founder-journey" aria-label="Customer journey"><span>Discover</span><span aria-hidden="true">→</span><span>Understand</span><span aria-hidden="true">→</span><span>Become a customer</span></div></aside></div>
    </section>
    <section className="founder-wrap founder-section founder-split"><div><h2>The next opportunity may be<br /><em>beyond the ad account.</em></h2></div><div className="founder-prose"><p>A campaign can bring the right people to your website and still fall short. An unclear offer, a difficult booking journey, or a missed follow-up can keep that interest from becoming business.</p><p>Clarity Engine helps retreats, travel, hospitality, wellness, and other experience-led businesses examine those connections. We bring paid media, conversion testing, creative direction, and measurement into the same conversation.</p><p>My work spans 12+ years in growth marketing and more than $5 million in managed paid media spend. That experience helps me ask better questions about what the numbers mean—and what your team should investigate or test next.</p><p>Depending on the engagement, I can guide your existing specialists, take on agreed execution, or combine both. We clarify the priorities and responsibilities so useful ideas have a path into practice.</p></div></section>
    <section className="founder-tint"><div className="founder-wrap founder-section"><h2>Clear priorities.<br /><em>A practical way forward.</em></h2><ol className="founder-steps">{[
      ["Understand what’s happening", "Start with your goals, your customers, and the evidence available. Understand where progress is getting stuck and what your team needs."],
      ["Decide what to do next", "Choose priorities around likely value, effort, and what we know. Make the reasoning clear so your team understands where to focus."],
      ["Put the plan into practice", "Use the latest AI tools to help analyze performance, develop creative, and build page variations faster, with experienced review and execution matched to your scope."],
      ["Learn from what changes", "Agree on useful measures, review the evidence, and refine the next move. Be clear about what a test shows and what still needs time or investigation."],
    ].map(([title,body],i) => <li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>
    <section className="founder-wrap founder-section founder-motivation"><div><h2>Good ideas need<br /><em>someone to move them forward.</em></h2></div><div className="founder-prose"><p>The part of this work I enjoy most is helping someone understand a complicated problem well enough to take the next step. A useful strategy should make the work ahead clearer for the people responsible for it.</p><p>That’s why Clarity Engine combines strategic direction with practical support. Whether we’re working through a decision or collaborating on a campaign, the aim is to give your team the clarity and capacity to move forward.</p></div></section>
    <section className="founder-wrap founder-evidence"><div><h2>See how the thinking <em>translates into work.</em></h2><p>Explore work with retreat, travel, and multi-location businesses. See the challenges, the decisions made, and the campaigns, testing, and measurement behind each engagement.</p></div><Link to="/case-studies" className="founder-button">View case studies </Link></section>
    <section id="ways-to-work" className="founder-wrap founder-section"><h2>Start with the support <em>your team needs now.</em></h2><div className="founder-offers">{[
      ["Get Clarity Assessment", "Organize your thinking before your next marketing decision. Answer questions across six essential areas and receive a personalized report based on your answers.", "Explore the assessment", "/marketing-clarity-assesment"],
      ["30-Day Growth Strategy Sprint", "Bring the decisions and roadblocks you’re working through. Use three live sessions over 30 days to develop priorities and practical next steps.", "Explore the Strategy Sprint", "/strategy-sprint"],
      ["Ongoing growth support", "Add direction and implementation capacity to your team. Explore support for campaigns, landing-page testing, creative, and measurement.", "Explore services", "/services"],
    ].map(([title,body,label,to],i) => <article key={to}><span className="founder-eyebrow">0{i+1}</span><h3>{title}</h3><OfferPreview index={i} title={title} /><p>{body}</p><Link to={to} className="founder-link">{label} →</Link></article>)}</div></section>
    <InquiryForm />
  </main>;
}
