import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auditRequest } from "@/lib/audit-api";
import { trackAudit } from "@/lib/audit-events";
import { sectionColors } from "@shared/marketing-clarity-audit/sections";
import { progressIcons } from "@shared/marketing-clarity-audit/progress-icons";
import example from "@/lib/assessment-sales-example.json";
import "./get-clarity-assessment.css";

const icons = [progressIcons.target, progressIcons.users, progressIcons.message, progressIcons.route, progressIcons.test, progressIcons.reporting];
const descriptions = ["Is your offer clear enough to choose?", "Are you reaching the people most likely to benefit?", "Does your message communicate what matters to buyers?", "Can interested people take the next step with confidence?", "Does your traffic strategy match your goals?", "Can you trust the numbers you use to make decisions?"];

function AssessmentVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const manuallyPaused = useRef(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(preference.matches);
      manuallyPaused.current = false;
      if (preference.matches) video.current?.pause();
      else void video.current?.play().catch(() => setPlaying(false));
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  async function toggle() {
    manuallyPaused.current = playing;
    if (playing) video.current?.pause();
    else {
      if (video.current?.ended) video.current.currentTime = 0;
      try { await video.current?.play(); } catch { setPlaying(false); }
    }
  }
  return <div className="gca-video-panel">
    <video ref={video} autoPlay={!reduced} muted playsInline loop role="button" tabIndex={0} onClick={toggle} onKeyDown={(event) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); void toggle(); } }} onCanPlay={() => { if (!reduced && !manuallyPaused.current) void video.current?.play().catch(() => setPlaying(false)); }} preload={reduced ? "none" : "metadata"} poster="/videos/get-clarity-assessment-poster.webp" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} aria-label={playing ? "Pause assessment animation" : "Play assessment animation"}>
      <source src="/videos/get-clarity-assessment-ping-pong.mp4" type="video/mp4" />
    </video>
  </div>;
}

export default function MarketingClarityAudit() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { trackAudit("sales_page_view"); }, []);
  async function purchase() {
    setBusy(true); setError(""); trackAudit("checkout_start");
    try {
      const checkout = await auditRequest<{ url: string }>("/checkout", "POST", {});
      window.location.assign(checkout.url);
    } catch (e) { setError((e as Error).message); setBusy(false); }
  }
  const cta = <Button onClick={purchase} disabled={busy} className="gca-cta">{busy ? "Opening checkout…" : "Get My Clarity Assessment — $27"}<span aria-hidden="true"> →</span></Button>;
  return <main className="gca-page">
    <section className="gca-hero gca-wrap">
      <div>
        <p className="gca-eyebrow">Get Clarity Assessment <span>by Clarity Engine</span></p>
        <h1>Know what to <em>focus on next.</em></h1>
        <p className="gca-lead">See where your marketing may be getting stuck. Examine six essential areas and identify where to focus next.</p>
        <div className="gca-actions">{cta}<a href="#what-you-get" className="gca-secondary">See what you get</a></div>
        <p className="gca-small">$27 · One-time payment · A focused starting point</p>
        {error && <p role="alert" className="text-red-700 mt-4">{error}</p>}
      </div>
      <AssessmentVideo />
    </section>
    <section className="gca-wrap gca-domains" aria-labelledby="areas-title">
      <h2 id="areas-title">Six areas. A clearer direction.</h2>
      <div className="gca-strip">{Object.values(sectionColors).map((theme, i) => { const Icon = icons[i]; return <a key={theme.name} href="#six-areas" style={{color: theme.color, background: theme.tint}}><Icon aria-hidden="true" size={23}/><span>{theme.name}</span></a>; })}</div>
    </section>
    <section className="gca-wrap gca-section gca-split">
      <div><p className="gca-eyebrow">When everything feels important</p><h2>More activity isn’t always the next move.</h2></div>
      <div className="gca-prose"><p>You have ideas, channels, and advice competing for attention. The harder decision is which problem deserves your time first.</p><ul><li>You’re preparing for growth, but aren’t sure what needs to be ready.</li><li>You have numbers, but aren’t sure which ones to trust.</li><li>Your team sees different problems and needs a shared starting point.</li></ul><p>Get Clarity Assessment helps you turn what you know about your marketing into a more focused decision.</p></div>
    </section>
    <section id="six-areas" className="gca-tinted"><div className="gca-wrap gca-section"><p className="gca-eyebrow">What it examines</p><h2>Your marketing works as a system.</h2><p className="gca-intro">35 questions look across these six areas, so an apparent traffic problem can be considered alongside your offer, message, and customer experience.</p><div className="gca-area-grid">{Object.values(sectionColors).map((theme,i) => { const Icon = icons[i]; return <article key={theme.name}><Icon aria-hidden="true" style={{color:theme.color}}/><h3>{theme.name}</h3><p>{descriptions[i]}</p></article>; })}</div></div></section>
    <section id="what-you-get" className="gca-wrap gca-section"><p className="gca-eyebrow">What you get</p><h2>A report you can use to make a decision.</h2><div className="gca-deliverables">
      <article><span>01</span><h3>A clearer diagnosis</h3><p>Six area scores, the primary constraint indicated by your answers, supporting findings, and diagnostic confidence. The report explains the reasoning and where evidence is missing.</p></article>
      <article><span>02</span><h3>Focused next moves</h3><p>When a constraint is identified, receive three recommended moves with completion criteria, plus what to deprioritize. A 30-day plan helps organize the work.</p></article>
      <article><span>03</span><h3>Space to work through it</h3><p>Use your Clarity Work Session to capture decisions and next actions. Save notes online and download your report and Work Session as PDFs.</p></article>
    </div><p className="gca-note">If your answers don’t establish a clear constraint, the report says so. Use the Work Session to clarify your evidence and next decision; three priority fixes are not guaranteed for every result.</p></section>
    <section className="gca-tinted"><div className="gca-wrap gca-section gca-split"><div><p className="gca-eyebrow">Example result · synthetic answers</p><h2>See what a next move looks like.</h2><p className="gca-intro">This example was generated by the assessment’s actual report logic for a fictional services business with a message constraint. Your findings depend on your answers.</p><p className="gca-small">Diagnostic confidence: {example.confidence}</p></div><article className="gca-example"><p className="gca-eyebrow">Get Clarity Assessment Report</p><h3>{example.summary}</h3><ol>{example.recommendations.map(move => <li key={move.title}><h4>{move.title}</h4><p>{move.whatToDo}</p><p className="gca-small"><strong>Done when:</strong> {move.doneWhen}</p></li>)}</ol></article></div></section>
    <section id="how-it-works" className="gca-wrap gca-section"><p className="gca-eyebrow">How it works</p><h2>From your answers to your next action.</h2><div className="gca-steps">{[
      ["Purchase", "Pay $27 through Stripe and return to the assessment."],
      ["Share your context", "Enter your business details and answer 35 questions. Progress autosaves; keep your secure resume link."],
      ["Review your results", "Generate your personalized report after completing the assessment. Review findings, reasoning, and confidence."],
      ["Choose your next move", "Use your recommendations and Work Session to decide what to do, what to measure, and what to leave for later."],
    ].map(([title,body],i)=><article key={title}><span>{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="gca-wrap gca-section gca-split gca-fit"><div><p className="gca-eyebrow">A useful starting point</p><h2>For people making marketing decisions.</h2><p className="gca-intro">Built for founders, executives, and business owners who can describe their offer, customers, marketing activity, and results—even when some answers are uncertain.</p></div><div className="gca-prose"><h3>Answer from what you know.</h3><p>This is a structured diagnosis based on your inputs. It does not inspect your ad accounts, verify your tracking, or replace an expert review of your business.</p><h3>Need a deeper review?</h3><p>Clarity Engine’s higher-priced Deep Dive Audit is a separate service for a more comprehensive review of tracking, campaigns, and the funnel. Your assessment is useful on its own.</p><Link to="/checkout/audit" className="gca-text-link">Explore the Deep Dive Audit →</Link></div></section>
    <section className="gca-wrap gca-section gca-split"><div><p className="gca-eyebrow">Before you begin</p><h2>A few practical answers.</h2><p className="gca-intro">Clarity Engine helps businesses connect marketing decisions with useful action. <Link className="gca-text-link" to="/case-studies">Explore our wider work.</Link></p></div><div className="gca-faq">{[
      ["What information do I need?", "Your contact and business details, website, business type, and primary marketing goal. The questions cover your offer, audience, message, conversion experience, traffic, and measurement. No ad-account connection is required."],
      ["How long should I allow?", "The assessment is designed for approximately 12–18 minutes. Allow additional time if you need to check information or work through your results."],
      ["How do I access my results?", "After purchase and completion, your results open online. Keep the secure resume link to return to your assessment and reports; no account or password is required. You can download your report as a PDF."],
      ["Will it give me three priorities?", "When the diagnosis identifies a constraint, the report provides three recommended moves. If the answers don’t establish a clear constraint, it explains that limitation instead of inventing priority fixes."],
      ["Does it guarantee growth?", "No. It helps you decide where to focus based on the answers you provide. Outcomes depend on your evidence, decisions, implementation, and market."],
      ["Do I need to buy another service?", "No. The assessment includes your report and Clarity Work Session. A deeper service is an optional next step if you need hands-on review."],
    ].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="gca-final"><div className="gca-wrap"><p className="gca-eyebrow">Get Clarity Assessment by Clarity Engine</p><h2>Give your next decision<br/>a clearer starting point.</h2><p>Six marketing areas. Practical findings. A more focused next move.</p>{cta}<p className="gca-small">$27 · One-time payment</p>{error && <p role="alert" className="text-red-700">{error}</p>}</div></section>
  </main>;
}
