import { inquiryAttributionFields } from '@/lib/campaign-attribution';
import { trackAssessmentCheckout } from "@/lib/website-analytics";
import { useEffect, useState } from "react";
import { CreditCard, MessagesSquare, FileChartColumn, Signpost } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auditRequest } from "@/lib/audit-api";
import { trackAudit } from "@/lib/audit-events";
import { sectionColors } from "@shared/marketing-clarity-audit/sections";
import { progressIcons } from "@shared/marketing-clarity-audit/progress-icons";
import example from "@/lib/assessment-sales-example.json";
import "./get-clarity-assessment.css";
import ServiceOptionVideo from "@/components/ServiceOptionVideo";
import AmbientFlame from "@/components/AmbientFlame";
import { questionnaire } from "@shared/marketing-clarity-audit/scoring";
import { AssessmentPreview } from "@/components/assessment-preview";

const stepIcons = [CreditCard, MessagesSquare, FileChartColumn, Signpost];
const icons = [progressIcons.target, progressIcons.users, progressIcons.message, progressIcons.route, progressIcons.test, progressIcons.reporting];
const descriptions = [["Give people a reason to choose.", "Is it clear what you offer, who it helps, and why it’s worth paying for?"], ["Focus on the people you can best serve.", "How well do you understand your customers, what they want, and what influences their decisions?"], ["Make your value easier to understand.", "Does your messaging communicate what matters to customers in language they recognize?"], ["Help interest become action.", "Can someone move from curiosity to an inquiry, booking, or purchase without unnecessary confusion?"], ["Bring relevant people to your business.", "Do your channels and campaigns fit your audience, offer, and goals?"], ["Use your numbers to guide the next move.", "Can you tell what’s working, what needs investigation, and whether your changes are helping?"]];

export default function MarketingClarityAudit() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { trackAudit("sales_page_view"); }, []);
  async function purchase() {
    setBusy(true); setError(""); trackAudit("checkout_start");
    try {
      const checkout = await auditRequest<{ url: string }>("/checkout", "POST", {attribution:inquiryAttributionFields()});
      await trackAssessmentCheckout();
      window.location.assign(checkout.url);
    } catch (e) { setError((e as Error).message); setBusy(false); }
  }
  const cta = <Button onClick={purchase} disabled={busy} className="gca-cta">{busy ? "Opening checkout…" : "Get My Clarity Assessment — $27"}</Button>;
  return <main className="gca-page">
    <section className="gca-hero">
      <div className="gca-wrap"><div className="gca-hero-copy">

        <h1>Before you spend more on marketing, <em>get clear on what needs attention.</em></h1>
        <p className="gca-lead">Answer focused questions about your business and receive a personalized report showing where your marketing may be getting stuck—and practical next steps based on your answers.</p>
        <div className="gca-actions">{cta}<a href="#assessment-preview" className="gca-secondary">Try four questions free</a></div>
        <p className="gca-small">$27 one-time · Approximately 12–18 minutes · Report and planning workspace included</p>
        {error && <p role="alert" className="text-red-700 mt-4">{error}</p>}
      </div><AmbientFlame /></div>

    </section>
    <div className="gca-preview-band">
    <section className="gca-wrap gca-domains" aria-labelledby="areas-title">
      <h2 id="areas-title">See how the pieces of your marketing fit together.</h2>
      <div className="gca-strip">{Object.values(sectionColors).map((theme, i) => { const Icon = icons[i]; return <a key={theme.name} href="#six-areas" style={{color: theme.color, background: theme.tint}}><Icon aria-hidden="true" size={23}/><span>{theme.name}</span></a>; })}</div>
    </section>
    <AssessmentPreview onPurchase={purchase} busy={busy} error={error} />
    </div>
    <section className="gca-wrap gca-section gca-split">
      <div><h2>You have plenty of marketing ideas.<br /><em className="not-italic text-emerald-700">Which one deserves your attention first?</em></h2></div>
      <div className="gca-prose"><p>You could run more ads, rewrite your website, change your offer, or try another platform. Each takes time, money, and attention.</p><p>The harder question is what your business actually needs right now.</p><ul><li>People visit your website, but too few inquire or book.</li><li>Your team has different opinions about what to fix first.</li><li>You’re considering more advertising, but aren’t sure the foundations are ready.</li><li>You have reports, but they don’t make the next decision obvious.</li></ul><p>The Clarity Assessment gives you a structured way to examine what you know, recognize gaps, and choose where to investigate next.</p></div>
    </section>
    <section id="six-areas" className="gca-system-section"><div className="gca-city-motion"><ServiceOptionVideo name="assessment-city-system" label="city skyline and rooftop explorer" /></div><div className="gca-wrap gca-section">
      <div className="gca-system-heading">
        <div><h2>A traffic problem may start somewhere else.</h2>
        <p className="gca-question-heading"><strong>{questionnaire.questions.length} questions</strong><span>A connected view of your business.</span></p>
        <p className="gca-intro">More visitors won’t resolve an unclear offer or a confusing next step. These focused questions help you consider the connections before deciding what to change.</p></div>
      </div>
      <div className="gca-area-grid">{Object.values(sectionColors).map((theme,i) => { const Icon = icons[i]; return <article key={theme.name} style={{borderColor:theme.border, borderTopColor:theme.color}}><span className="gca-area-icon" style={{background:theme.tint,color:theme.color}}><Icon aria-hidden="true"/></span><h3>{theme.name}</h3><p><strong className="font-semibold text-slate-800">{descriptions[i][0]}</strong></p><p>{descriptions[i][1]}</p></article>; })}</div>
    </div></section>
    <section id="what-you-get" className="gca-wrap gca-section"><h2>A clearer starting point.<br />Something practical to work from.</h2><div className="gca-deliverables">
      <article><ServiceOptionVideo name="assessment-diagnosis" label="scientist clarifying a colorful mixture" /><span>01</span><h3>Understand what needs attention</h3><p>See scores across all six areas, the main constraint indicated by your answers, and the findings behind it. Your report also explains how strongly your answers support the conclusion and where more information is needed.</p></article>
      <article><ServiceOptionVideo name="assessment-chess" label="planning the next chess move" /><span>02</span><h3>Decide what to do next</h3><p>When your answers identify a clear constraint, receive three recommended moves, what completing each one looks like, and what to put on hold. A 30-day plan helps you organize the work.</p></article>
      <article><ServiceOptionVideo name="assessment-spaceship" label="futuristic spaceship flight" /><span>03</span><h3>Turn the findings into your plan</h3><p>Use your Clarity Work Session—a self-guided planning workspace—to capture decisions and next actions. Save your notes online and download your report and workspace as PDFs.</p></article>
    </div><p className="gca-note">If your answers don’t reveal a clear priority, your report explains what remains uncertain so you can investigate further.</p><div className="gca-actions">{cta}</div><p className="gca-small">$27 · One-time payment</p>{error && <p role="alert" className="text-red-700 mt-4">{error}</p>}</section>
    <section id="example-result" className="gca-tinted"><div className="gca-wrap gca-section gca-split"><div><h2>See how a finding becomes a next step.</h2><p className="gca-intro">In this example, a fictional services business’s answers point to messaging as the priority. The report translates that finding into specific work: clarify the headline, gather customer language, and support important claims with proof.</p><p className="gca-small">Example generated by the assessment. Your findings and recommendations depend on your answers.</p><p className="gca-small">Diagnostic confidence: {example.confidence}</p><div className="gca-queen-motion"><ServiceOptionVideo name="assessment-queen" label="floating queen chess piece" /></div></div><article className="gca-example"><h3>{example.summary}</h3><ol>{example.recommendations.map(move => <li key={move.title}><h4>{move.title}</h4><p>{move.whatToDo}</p><p className="gca-small"><strong>Done when:</strong> {move.doneWhen}</p></li>)}</ol></article></div></section>
    <section id="how-it-works" className="gca-wrap gca-section"><h2>From answering questions to choosing your next move.</h2><div className="gca-steps">{[
      ["Get your assessment", "Make a one-time $27 payment to access the full assessment."],
      ["Share what you know", "Enter your business details and work through the assessment questions. Your progress saves automatically, so you can pause and return using your secure link."],
      ["Explore your findings", "Generate your personalized report. See what your answers indicate, why it matters, and where more evidence would help."],
      ["Plan your next steps", "Use your Clarity Work Session to decide what to work on, what to measure, and what can wait."],
    ].map(([title,body],i)=>{ const Icon=stepIcons[i]; return <article key={title}><div className={`gca-step-seal gca-step-seal-${i+1}`} aria-hidden="true"><Icon size={30} strokeWidth={1.5}/><b>{i+1}</b></div><h3>{title}</h3><p>{body}</p></article>; })}</div></section>
    <section id="who-its-for" className="gca-wrap gca-section gca-split gca-fit"><div><h2>For the person deciding where marketing goes next.</h2><div className="gca-audience-collage"><ServiceOptionVideo mobileName="assessment-audience-mobile" name="assessment-audience" label="founder, executive, business owner, marketing specialist, and operations manager smiling and pointing toward the assessment" /></div><p className="gca-intro">Whether you own the business, lead its marketing, or wear several hats, you need a useful way to sort through competing priorities.</p><p className="gca-intro">The assessment can help you prepare for a team discussion, examine a possible weak point, or organize your thinking before investing in more marketing.</p><div className="gca-actions gca-fit-mobile-cta">{cta}</div></div><div className="gca-prose"><h3 className="gca-fit-focus-heading">Bring your business into focus.</h3><p>From retreats and travel businesses to wellness brands, fitness centers, and service companies, the questions examine the foundations behind how customers find, understand, and choose you.</p><p>You provide the context. Clarity Engine’s assessment turns your answers into structured findings you can work through.</p><p className="gca-small">This is a self-guided assessment. It does not connect to your advertising accounts or include a personal strategist review.</p><div className="gca-actions gca-fit-desktop-cta">{cta}</div>{error && <p role="alert" className="text-red-700 mt-4">{error}</p>}</div></section>
    <section className="gca-wrap gca-section gca-split"><div><h2>A few things to know before you start.</h2><p className="gca-intro">Clarity Engine helps businesses connect marketing decisions with useful action. <Link className="gca-text-link" to="/case-studies">Explore our wider work.</Link></p></div><div className="gca-faq">{[["What do I need to complete it?", "A working understanding of your business and marketing. The questions cover your offer, customers, messaging, customer journey, traffic, and measurement. You don’t need to connect an advertising account."], ["How long does the assessment take?", "The assessment is designed for approximately 12–18 minutes. Allow additional time if you need to check information or work through your results. Your progress saves automatically, so you can pause and return using your secure link."], ["What makes the report personalized?", "Your answers determine the scores, findings, and recommended priorities. The report explains the reasoning and highlights where the information you provided isn’t enough for a clear conclusion."], ["Will I receive three recommended actions?", "When your answers identify a clear constraint, your report includes three recommended moves. If there isn’t enough evidence to establish a priority, it explains what remains uncertain."], ["Is the Clarity Work Session a call?", "No. It’s a self-guided planning workspace included with your assessment. Use it to capture decisions and next actions, save notes online, and download them as a PDF."], ["How do I return to my assessment and results?", "Keep your secure resume link. It lets you return without creating an account or password. You can also download your report as a PDF."], ["Is this the same as the Deep Dive Growth Audit?", "No. The $27 assessment uses the answers you provide. The Deep Dive Growth Audit is a separately scoped engagement involving hands-on investigation and a personal findings walkthrough."], ["Do I need to purchase anything else?", "No. Your $27 payment includes the assessment, personalized report, and Clarity Work Session. Additional Clarity Engine support is optional."]].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section id="assessment-purchase" className="gca-final" style={{scrollMarginTop: 110}}><div className="gca-wrap"><h2>Give your next marketing decision<br /><em className="not-italic text-emerald-700">a clearer starting point.</em></h2><p>Take a focused look at your business, see what your answers reveal, and leave with findings you can use to plan your next move.</p>{cta}<p className="gca-small">$27 · One-time payment</p>{error && <p role="alert" className="text-red-700">{error}</p>}</div></section>
  </main>;
}
