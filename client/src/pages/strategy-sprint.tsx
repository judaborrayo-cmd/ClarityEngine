import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Pause, Play, ShieldCheck } from "lucide-react";
import { strategySprintOffer as offer, strategySprintBenefits } from "@shared/strategy-sprint-offer";
import ServiceOptionVideo from "@/components/ServiceOptionVideo";
import { SprintTestimonials } from "@/components/sprint-testimonials";
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
// Concise sales-page summaries; full checkout inclusions remain unchanged.
const inclusionSummaries = [
  "Three sessions over 30 days, typically 60–120 minutes depending on the topic, availability, and work involved.",
  "Review your offer, messaging, funnel, website, customer journey, lead generation, ad readiness, and analytics for opportunities and drop-offs.",
  "Work on current decisions, drafts, campaigns, pages, implementation issues, or AI workflows. Research options together when helpful.",
  "No rigid curriculum. The focus adapts to your current priorities.",
  "Sessions can be recorded, with AI-assisted summaries and action items for follow-through.",
];
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
    <section id="sprint-conversation" className="ss-wrap ss-section ss-collaboration">
      <div><p className="ss-eyebrow">You + Juda · Working directly together</p><h2>Bring your problem.<br /><em>We’ll work through it together.</em></h2><p className="ss-intro">Bring a stuck decision, a page, or a campaign. We’ll ask useful questions and explore your options together. You don’t need everything figured out.</p></div>
      <aside className="ss-consultation" aria-label="You and Juda working through marketing questions"><ServiceOptionVideo name="strategy-sprint-consultation" label="Juda guiding five different clients through their marketing priorities on a video call" /><p>A shared look at the problem.<br /><strong>A more focused next decision.</strong></p></aside>
      <div className="ss-topic-tags" aria-label="Possible session topics"><span>Offer & messaging</span><span>Pages & funnels</span><span>Campaigns & measurement</span><span>Business decisions & roadblocks</span></div>
    </section>
    <section className="ss-example-section"><div className="ss-wrap ss-section ss-split ss-example-layout"><div><p className="ss-eyebrow">From conversation to follow-through</p><h2>Make the next step <em>something you can use.</em></h2><p className="ss-intro">A session can turn a broad question into a clearer decision and practical next actions. Recordings and AI-assisted summaries can help you revisit what you worked through.</p><p className="ss-small">Illustrative example. Your session notes and next actions depend on your business.</p></div><article className="ss-notes" aria-labelledby="ss-example-title"><div className="ss-notes-header"><span className="ss-example-label">Example</span><span>Session notes · Landing page</span></div><h3 id="ss-example-title">Before adding more traffic,<br />clarify the next step.</h3><div className="ss-note-row"><span>Question</span><p>People visit the page, but few enquire. Do we need a new campaign?</p></div><div className="ss-note-decision"><span>Decision to explore</span><p>Review the page’s offer and enquiry path before expanding traffic.</p></div><h4>Practical next actions</h4><ol><li><span>01</span><p>Review the headline and primary CTA for a clear offer and next step.</p></li><li><span>02</span><p>Walk through the enquiry form on mobile and note points of friction.</p></li><li><span>03</span><p>Check how enquiries are measured before deciding what to test.</p></li></ol><div className="ss-notes-footer">Next discussion: review what you found and choose a focused test.</div></article><div className="ss-example-purchase"><PurchaseLink /><span>${offer.price} · Three sessions over 30 days</span></div></div></section>
    <section id="sprint-inclusions" className="ss-tint"><div className="ss-wrap ss-section"><p className="ss-eyebrow">What’s included</p><h2>Personal guidance. <em>Practical next actions.</em></h2><div className="ss-grid ss-inclusions">{strategySprintBenefits.map((benefit, index) => <article className="ss-card" key={benefit.title}><Check aria-hidden="true" className="ss-check" /><h3>{benefit.title}</h3><p>{inclusionSummaries[index]}</p></article>)}</div><p className="ss-boundary">The Sprint is strategic advisory and live problem-solving. Ongoing execution, campaign management, website development, and media buying outside sessions require a separate agreement.</p></div></section>
    <section className="ss-wrap ss-section"><p className="ss-eyebrow">How it works</p><h2>From your context <em>to your next action.</em></h2><ol className="ss-grid ss-steps ss-connected">{[
      ["Bring your context", "Share relevant pages, campaigns, analytics, and questions."],
      ["Work through it together", "Review the problem and weigh your options with Juda."],
      ["Leave with practical next actions", "Choose next steps; revisit them in later sessions."],
    ].map(([title,copy],i) => <li key={title}><span className="ss-step-marker">{i+1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><div className="ss-scheduling"><div><strong>First, purchase and choose your times.</strong><p>${offer.price} once for three live sessions over 30 days. After purchase, we’ll arrange times that work for both of us. Sessions typically run 60–120 minutes.</p></div><a href="#ss-practical-questions" className="ss-anchor">Scheduling & preparation ↓</a></div></section>
    <section className="ss-wrap ss-section ss-split ss-fit"><div><p className="ss-eyebrow">Who it suits</p><h2>For founders with decisions <em>to make.</em></h2><p className="ss-intro">For founders and business owners ready to participate in solving a current business or marketing problem.</p></div><div><h3>Choose the level of help you need.</h3><p>Choose the self-guided Get Clarity Assessment for an initial diagnosis, or the Sprint for live advisory. Ongoing account management and done-for-you services are separate.</p></div></section>
    <section className="ss-tint"><div className="ss-wrap ss-section ss-split"><div><p className="ss-eyebrow">Work directly with Juda</p><h2>Experience behind <em>the conversation.</em></h2></div><div><p className="ss-credential">12+ years in paid media & growth strategy.</p><p>Clarity Engine’s wider work includes $5M+ in ad spend managed across growth brands. That experience informs the questions and options we work through together.</p><Link to="/case-studies" className="ss-anchor">Explore Clarity Engine’s wider work →</Link><p className="ss-small">These credentials describe broader experience, rather than promised Sprint outcomes.</p></div></div></section>
    <SprintTestimonials />
    <section id="ss-practical-questions" className="ss-wrap ss-section ss-split"><div><p className="ss-eyebrow">Practical questions</p><h2>Know what <em>you’re buying.</em></h2></div><div className="ss-faq">{questions.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="ss-final"><div className="ss-wrap"><p className="ss-eyebrow">{offer.name} · by Clarity Engine</p><h2>Bring your next decision.<br /><em>Let’s work through it.</em></h2><p>Three live sessions over 30 days, focused on your business priorities.</p><p className="ss-price"><strong>${offer.price}</strong> <span>One-time payment</span></p><PurchaseLink /><p className="ss-small">First-session guarantee: request a full refund within 24 hours after your first session if the engagement is not useful for your business.</p></div></section>
  </main>;
}
