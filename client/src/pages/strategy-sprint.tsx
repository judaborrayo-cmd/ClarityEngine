import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Pause, Play, ShieldCheck } from "lucide-react";
import { strategySprintOffer as offer, strategySprintBenefits } from "@shared/strategy-sprint-offer";
import "./strategy-sprint.css";

// Approved Sprint sorting animation: play once, with optional replay.
const sprintMedia = { src: "/videos/strategy-sprint-hero.mp4", poster: "/videos/strategy-sprint-hero-poster.webp", loop: false };
function SprintMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(preference.matches);
      if (preference.matches) video.current?.pause();
      else void video.current?.play().catch(() => setPlaying(false));
    };
    sync(); preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  async function toggle() {
    if (playing) video.current?.pause();
    else { if (video.current?.ended) video.current.currentTime = 0; try { await video.current?.play(); } catch { setFailed(true); } }
  }
  return <figure className="ss-media">
    <div className="ss-media-frame">
      {failed ? <img src={sprintMedia.poster} alt="Clarity Engine growth strategy visual" /> : <video ref={video} autoPlay={!reduced} muted playsInline loop={sprintMedia.loop} poster={sprintMedia.poster} preload={reduced ? "none" : "metadata"} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setFailed(true)} aria-label="Clarity Engine growth strategy animation"><source src={sprintMedia.src} type="video/mp4" /></video>}
      {!failed && <button type="button" onClick={toggle} className="ss-media-control" aria-label={playing ? "Pause animation" : "Play animation"}>{playing ? <Pause size={16} /> : <Play size={16} />}<span>{playing ? "Pause" : "Play"}</span></button>}
    </div>
    <figcaption>Clarity Engine · Growth strategy, brought into focus.</figcaption>
  </figure>;
}
function PurchaseLink() { return <a className="ss-cta" href={offer.checkoutUrl} target="_blank" rel="noopener noreferrer">Start My Strategy Sprint <ArrowRight aria-hidden="true" size={19} /></a>; }
const questions = [
  ["How do we schedule the sessions?", "After purchase, we’ll choose three session times that work for both of us over the next 30 days, and identify the highest-priority topics for the first call."],
  ["What should I prepare?", "Share relevant links, questions, pages, campaigns, offers, analytics, or other context before the first call. Bring your current roadblocks and half-finished ideas; you don’t need a polished presentation."],
  ["How long is each session?", "Typically 60–120 minutes, depending on the topic, availability, and what we are working through."],
  ["Can I revisit the sessions afterward?", "Live video sessions can be recorded for you, with AI-assisted summaries and action items to make follow-through easier."],
  ["Will you implement everything for me?", "This is strategic advisory and live problem-solving. We can work through implementation issues together during sessions. Ongoing done-for-you execution, campaign management, website development, and media buying outside the sessions are separate services, available only if separately agreed. This is not a managed-services retainer."],
  ["What is the first-session guarantee?", `${offer.guarantee} ${offer.guaranteeExpiry}`],
];
export default function StrategySprint() {
  return <main className="ss-page">
    <section className="ss-wrap ss-hero">
      <div className="ss-hero-copy"><p className="ss-eyebrow">{offer.name}</p><h1>Get clear on what matters next.<br /><em>Move faster.</em></h1><p className="ss-lead">Work directly with Juda through three live strategy sessions over 30 days. Solve growth problems, sharpen your offer and funnel, and make stronger decisions.</p><p className="ss-price"><strong>${offer.price}</strong> <span>One-time payment · No subscription</span></p><PurchaseLink /><a className="ss-anchor" href="#sprint-inclusions">See what’s included ↓</a></div>
      <SprintMedia />
    </section>
    <div className="ss-band"><div className="ss-wrap ss-highlights"><span><Check aria-hidden="true" /> Three live sessions</span><span><Check aria-hidden="true" /> Your priorities, your focus</span><span><ShieldCheck aria-hidden="true" /> First-session guarantee</span></div></div>
    <section className="ss-wrap ss-section"><p className="ss-eyebrow">Bring the problem in front of you</p><h2>Less circling. <em>More working through it.</em></h2><p className="ss-intro">You don’t need another rigid curriculum. Each session centers on the highest-value issue for your business, adapting as you make progress.</p><div className="ss-grid ss-topics">{[
      ["Offer & messaging", "Review what you sell, who it serves, and how you communicate its value."],
      ["Pages & funnels", "Work through your website, customer journey, and places where interest drops off."],
      ["Campaigns & measurement", "Review lead generation, Google Ads or Meta Ads readiness, and analytics."],
      ["Decisions & roadblocks", "Bring drafts, ideas, implementation issues, or AI workflows. Research options together when helpful."],
    ].map(([title,copy], i) => <article key={title}><span className="ss-number">0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section id="sprint-inclusions" className="ss-tint"><div className="ss-wrap ss-section"><p className="ss-eyebrow">What’s included</p><h2>Personal guidance. <em>Practical next actions.</em></h2><div className="ss-grid ss-inclusions">{strategySprintBenefits.map(benefit => <article className="ss-card" key={benefit.title}><Check aria-hidden="true" className="ss-check" /><h3>{benefit.title}</h3><p>{benefit.copy}</p></article>)}</div><p className="ss-boundary">The Sprint is strategic advisory and live problem-solving. Ongoing execution, campaign management, website development, and media buying outside sessions require a separate agreement.</p></div></section>
    <section className="ss-wrap ss-section"><p className="ss-eyebrow">How it works</p><h2>A clear way to <em>get started.</em></h2><ol className="ss-grid ss-steps">{[
      ["Purchase your Sprint", "Pay $497 once through the existing secure checkout."],
      ["Choose times & share context", "We’ll arrange three sessions over the next 30 days. Send the questions and materials that will help us use the first call well."],
      ["Work through what matters", "Use the sessions to understand the problem, work through priorities, and review next actions. The focus stays flexible, rather than following a fixed curriculum."],
    ].map(([title,copy],i) => <li key={title}><span className="ss-number">0{i+1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>
    <section className="ss-wrap ss-section ss-split ss-fit"><div><p className="ss-eyebrow">Who it suits</p><h2>For founders with decisions <em>to make.</em></h2><p className="ss-intro">A useful fit when you want experienced guidance on a current business or marketing problem—and you’re ready to participate in the work.</p></div><div><h3>You want to work through it together.</h3><p>Bring your priorities, questions, and context. Juda works alongside you during the live sessions to help clarify decisions and next actions.</p><h3>Choose the level of help you need.</h3><p>The Get Clarity Assessment is a self-guided starting point. The Sprint adds direct, personal advisory sessions. Ongoing account management and done-for-you services are separate engagements.</p></div></section>
    <section className="ss-tint"><div className="ss-wrap ss-section ss-split"><div><p className="ss-eyebrow">Work directly with Juda</p><h2>Experience behind <em>the conversation.</em></h2></div><div><p className="ss-credential">12+ years in paid media & growth strategy.</p><p>Clarity Engine’s wider work includes $5M+ in ad spend managed across growth brands. That experience informs the questions and options we work through together.</p><Link to="/case-studies" className="ss-anchor">Explore Clarity Engine’s wider work →</Link><p className="ss-small">These credentials describe broader experience, rather than promised Sprint outcomes.</p></div></div></section>
    <section className="ss-wrap ss-section ss-split"><div><p className="ss-eyebrow">Practical questions</p><h2>Know what <em>you’re buying.</em></h2></div><div className="ss-faq">{questions.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="ss-final"><div className="ss-wrap"><p className="ss-eyebrow">{offer.name} · by Clarity Engine</p><h2>Bring your next decision.<br /><em>Let’s work through it.</em></h2><p>Three live sessions over 30 days, focused on your business priorities.</p><p className="ss-price"><strong>${offer.price}</strong> <span>One-time payment</span></p><PurchaseLink /><p className="ss-small">First-session guarantee: request a full refund within 24 hours after your first session if the engagement is not useful for your business.</p></div></section>
  </main>;
}
