import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ShieldCheck } from "lucide-react";
import { strategySprintOffer as offer } from "@shared/strategy-sprint-offer";
import ServiceOptionVideo from "@/components/ServiceOptionVideo";
import { SprintTestimonials } from "@/components/sprint-testimonials";
import "./strategy-sprint.css";

// Approved Sprint sorting animation: play once, with optional replay.
const sprintMedia = { src: "/videos/strategy-sprint-sunlit-v2.mp4", poster: "/videos/strategy-sprint-sunlit-v2-poster.webp", loop: false };
function SprintMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
      {!failed && <button type="button" onClick={toggle} className="ss-media-toggle" aria-label={playing ? "Pause growth strategy animation" : "Play growth strategy animation"} />}
    </div>
    <figcaption>Clarity Engine · Growth strategy, brought into focus.</figcaption>
  </figure>;
}
function PurchaseLink() { return <a className="ss-cta" href={offer.checkoutUrl} target="_blank" rel="noopener noreferrer">Start My Strategy Sprint </a>; }
// Concise sales-page summaries; full checkout inclusions remain unchanged.
const inclusions = [
  {title: "Time to work through the real issue", copy: "Three live sessions over 30 days, typically 60–120 minutes each depending on the topic, availability, and work involved."},
  {title: "A connected look at your marketing", copy: "Explore how your offer, messaging, website, campaigns, and measurement fit together. Focus on the parts most relevant to the decision in front of you."},
  {title: "Practical help during the session", copy: "Bring drafts, pages, campaigns, or implementation questions. Work through options together, using AI tools for research, ideas, or workflows when useful."},
  {title: "A focus that moves with you", copy: "Use each session for the issue that matters most at that point. Return to an earlier decision, review what you tried, or address the next blocker."},
  {title: "A way to revisit the work", copy: "Sessions can be recorded for you, with AI-assisted summaries and action items to help you follow through and share the next steps with your team."},
];
const questions = [
  ["How do we schedule the sessions?", "After purchase, we’ll choose three session times that work for both of us over the next 30 days, and identify the highest-priority topics for the first call."],
  ["What should I prepare?", "Share relevant links, questions, pages, campaigns, offers, analytics, or other context before the first call. Bring your current roadblocks and half-finished ideas; you don’t need a polished presentation."],
  ["How long is each session?", "Typically 60–120 minutes, depending on the topic, availability, and what we are working through."],
  ["Can I revisit the sessions afterward?", "Live video sessions can be recorded for you, with AI-assisted summaries and action items to make follow-through easier."],
  ["Does the Sprint include ongoing execution?", "The Sprint includes strategic advisory and live problem-solving. We can work on implementation questions together during the sessions. Ongoing execution, campaign management, website development, and media buying outside sessions require a separate agreement."],
  ["What is the first-session guarantee?", `${offer.guarantee} ${offer.guaranteeExpiry}`],
];
export default function StrategySprint() {
  return <main className="ss-page">
    <section className="ss-wrap ss-hero">
      <div className="ss-hero-copy"><p className="ss-eyebrow">30-Day Growth Strategy Sprint</p><h1>Turn a stuck marketing decision<br /><em>into a practical way forward.</em></h1><div className="ss-lead ss-hero-benefits"><p>Three live working sessions with Clarity Engine over 30 days. Bring the challenge you’re facing and work through what to do next—with experienced guidance and AI tools where they help.</p><ul>{["Work on your actual pages, campaigns, or offers", "Choose priorities and practical next steps", "Return with progress, questions, and new decisions"].map(benefit => <li key={benefit}><Check aria-hidden="true" /><span>{benefit}</span></li>)}</ul></div><p className="ss-price"><strong>${offer.price}</strong> <span>One-time payment · No subscription</span></p><PurchaseLink /><a className="ss-anchor" href="#sprint-inclusions">See what’s included </a></div>
      <SprintMedia />
    </section>
    <div className="ss-band"><div className="ss-wrap ss-highlights"><span><Check aria-hidden="true" /> Three live sessions</span><span><Check aria-hidden="true" /> Your priorities, your focus</span><span><ShieldCheck aria-hidden="true" /> First-session guarantee</span></div></div>
    <section id="sprint-conversation" className="ss-wrap ss-section ss-collaboration">
      <div><h2>You don’t need another list of ideas.<br /><em>You need help deciding what to do.</em></h2><p className="ss-intro">Should you improve the landing page or change the campaign? Is the offer clear enough? Where could AI save your team time? Bring the question—and the work behind it. We’ll examine the context, weigh your options, and choose a useful next step.</p></div>
      <aside className="ss-consultation" aria-label="You and Juda working through marketing questions"><ServiceOptionVideo name="strategy-sprint-consultation" label="Juda guiding five different clients through their marketing priorities on a video call" /><p>Your business on the screen.<br /><strong>Experienced support alongside you.</strong></p></aside>
      <div className="ss-topic-tags" aria-label="Possible session topics"><span>Offer & messaging</span><span>Pages & funnels</span><span>Campaigns & measurement</span><span>Business decisions & roadblocks</span></div>
    </section>
    <section className="ss-example-section"><div className="ss-wrap ss-section ss-split ss-example-layout"><div><h2>Leave with a decision<br /><em>you can put to work.</em></h2><p className="ss-intro">Work toward a specific decision, the reasons behind it, and the actions to take next. Use the time between sessions to make progress, then return to review what you learned and refine the plan.</p><p className="ss-small">Illustrative example. Your session notes and next actions depend on your business.</p></div><article className="ss-notes" aria-labelledby="ss-example-title"><div className="ss-notes-header"><span className="ss-example-label">Example</span><span>Session notes · Landing page</span></div><h3 id="ss-example-title">Before adding more traffic,<br />clarify the next step.</h3><div className="ss-note-row"><span>Question</span><p>People view our retreat page, but few inquire. Should we spend more on ads?</p></div><div className="ss-note-decision"><span>Decision to explore</span><p>Check whether the retreat offer and inquiry path are clear before increasing ad spend.</p></div><h4>Practical next actions</h4><ol><li><span>01</span><p>Review whether the headline makes the retreat’s value and intended guest clear.</p></li><li><span>02</span><p>Try the inquiry form on a phone and note any confusing or unnecessary steps.</p></li><li><span>03</span><p>Check how inquiries are tracked so you can evaluate the next change.</p></li></ol><div className="ss-notes-footer">Next discussion: review what you found and choose a focused test.</div></article><div className="ss-example-purchase"><PurchaseLink /><span>${offer.price} · Three sessions over 30 days</span></div></div></section>
    <section id="sprint-inclusions" className="ss-tint"><div className="ss-wrap ss-section"><h2>Three working sessions.<br /><em>Built around your business.</em></h2><div className="ss-grid ss-inclusions">{inclusions.map(benefit => <article className="ss-card" key={benefit.title}><Check aria-hidden="true" className="ss-check" /><h3>{benefit.title}</h3><p>{benefit.copy}</p></article>)}</div><p className="ss-boundary">The Sprint is strategic advisory and live problem-solving. Ongoing execution, campaign management, website development, and media buying outside sessions require a separate agreement.</p></div></section>
    <section className="ss-wrap ss-section"><h2>Bring the context.<br /><em>Build on the progress.</em></h2><ol className="ss-grid ss-steps ss-connected">{[
      ["Start with what’s getting stuck", "Share the relevant pages, campaigns, numbers, or questions so we can focus the first session on your priority."],
      ["Make the next decision together", "Examine the issue, compare options, and work through practical questions with Clarity Engine."],
      ["Put the learning to work", "Take the agreed next steps between sessions. Bring back what happened so we can refine the approach."],
    ].map(([title,copy],i) => <li key={title}><span className="ss-step-marker">{i+1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><div className="ss-scheduling"><div><strong>First, purchase and choose your times.</strong><p>${offer.price} once for three live sessions over 30 days. After purchase, we’ll arrange times that work for both of us. Sessions typically run 60–120 minutes.</p></div><a href="#ss-practical-questions" className="ss-anchor">Scheduling & preparation </a></div></section>
    <section className="ss-wrap ss-section ss-split ss-fit"><div><h2>For people ready to<br /><em>work on the problem.</em></h2><p className="ss-intro">A good fit for founders, business owners, and marketing leads who have a specific challenge and want an experienced partner to think it through with them. Bring your context and be ready to take action between sessions.</p></div><div><h3>Choose the support that matches the work.</h3><p>The Sprint gives you live guidance and problem-solving. For a self-guided starting point, explore the <Link to="/marketing-clarity-assesment" className="ss-inline-link">Clarity Assessment</Link>. For a deeper investigation, see the <Link to="/growth-clarity-audit" className="ss-inline-link">Deep Dive Growth Audit</Link>. For ongoing strategy and execution, explore the <Link to="/growth-partnership" className="ss-inline-link">Growth Partnership</Link>.</p></div></section>
    <section className="ss-tint"><div className="ss-wrap ss-section ss-split"><div><h2>Work through your challenge<br /><em>with experienced judgment.</em></h2></div><div><p className="ss-credential">12+ years in paid media & growth strategy.</p><p>Your sessions are led by Juda Borrayo, Clarity Engine’s founder. His experience includes $5M+ in ad spend managed and work across travel, hospitality, wellness, and other growth businesses. That practical background helps connect the strategy to the work involved.</p><Link to="/case-studies" className="ss-anchor">Explore Clarity Engine’s wider work </Link><p className="ss-small">These credentials describe broader experience, rather than promised Sprint outcomes.</p></div></div></section>
    <SprintTestimonials />
    <section id="ss-practical-questions" className="ss-wrap ss-section ss-split"><div><h2>A few things to know<br /><em>before you start.</em></h2></div><div className="ss-faq">{questions.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section id="sprint-purchase" className="ss-final" style={{ scrollMarginTop: 100 }}><div className="ss-wrap"><h2>Make room for the decision<br /><em>you’ve been putting off.</em></h2><p>Bring your current challenge. Use three live sessions over 30 days to work through your options, choose next steps, and build on what you learn.</p><p className="ss-price"><strong>${offer.price}</strong> <span>One-time payment</span></p><PurchaseLink /><p className="ss-small">First-session guarantee: request a full refund within 24 hours after your first session if the engagement is not useful for your business.</p></div></section>
  </main>;
}
