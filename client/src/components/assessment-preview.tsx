import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssessmentQuestion } from "@/components/assessment-question";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { assessmentInsights } from "@/lib/assessment-copy";
import { questionnaire, type Answers, type AnswerValue } from "@shared/marketing-clarity-audit/scoring";
import { sectionStyle } from "@shared/marketing-clarity-audit/sections";
import { DiagnosticClarityStack } from "@shared/marketing-clarity-audit/clarity-stack";
import examples from "@/lib/assessment-preview-examples.json";
import "@/pages/audit-assessment.css";
import "./assessment-preview.css";

const questions = questionnaire.questions.slice(0, 4);
type Example = (typeof examples)[number];

function ResultSample({ example }: { example: Example }) {
  return <div className="preview-report" style={sectionStyle(example.name === "Traffic" ? 5 : 3)}>
    <p className="preview-report-label">Get Clarity Assessment Report</p>
    <h4>{example.summary}</h4>
    <p className="preview-report-confidence">Diagnostic confidence: {example.confidence}</p>
    <ol className="preview-report-stack" aria-label="Example marketing area scores">
      {example.layers.map(layer => <li key={layer.id} style={{ background: layer.state === "primary" ? layer.color : layer.tint, color: layer.state === "primary" ? "white" : layer.color }}><span>{layer.name}</span><strong>{layer.score}<small> / 100</small></strong></li>)}
    </ol>
    <p className="preview-report-label">Recommended next moves</p>
    <ol className="preview-report-moves">{example.recommendations.map(move => <li key={move.title}><strong>{move.title}</strong><p>{move.whatToDo}</p></li>)}</ol>
    <p className="preview-report-disclaimer">Example from fictional business answers. Your findings depend on your full assessment.</p>
  </div>;
}

function ExampleCard({ example }: { example: Example }) {
  const [open, setOpen] = useState(false);
  return <div className="preview-example-card">
    <HoverCard openDelay={180} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button className="preview-example-trigger" onClick={() => setOpen(true)} aria-label={`Preview ${example.name} example result`}>
          <span className="preview-example-heading"><span>{example.name} example</span><ArrowUpRight size={17} aria-hidden="true" /></span>
          <span className="preview-report-thumbnail" aria-hidden="true"><ResultSample example={example} /></span>
          <span className="preview-example-hint">Hover or tap to preview</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="preview-example-popover" side="left" align="center" sideOffset={16} collisionPadding={20} aria-hidden="true"><ResultSample example={example} /></HoverCardContent>
    </HoverCard>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="preview-result-dialog">
        <DialogTitle>{example.name} · Example result</DialogTitle>
        <DialogDescription>A read-only sample generated from fictional answers, separate from your preview responses.</DialogDescription>
        <ResultSample example={example} />
      </DialogContent>
    </Dialog>
  </div>;
}

export function AssessmentPreview({ onPurchase, busy, error }: { onPurchase: () => void; busy: boolean; error: string }) {
  // Deliberately ephemeral: no API, storage, cookies, or answer analytics.
  const [answers, setAnswers] = useState<Answers>({});
  const [position, setPosition] = useState(0);
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const shownInsights = useRef(new Set<string>());
  const question = questions[position];
  const complete = position === questions.length;
  const answered = Object.keys(answers).length;
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if (interacted.current) titleRef.current?.focus({ preventScroll: true }); }, [position]);
  function advance() {
    setNote(""); setPending(false); setPosition(p => Math.min(p + 1, questions.length));
  }
  function answer(value: AnswerValue) {
    if (!question || pending) return;
    interacted.current = true;
    setAnswers(current => ({ ...current, [question.id]: value }));
    // Keep the real assessment's relevant Clarity Insights and auto-advance timing.
    const insight = ["D", "E"].includes(value) && !shownInsights.current.has(question.id) ? assessmentInsights[question.id] : undefined;
    if (position === questions.length - 1) {
      setPending(true); timer.current = setTimeout(advance, 350);
    } else if (insight) { shownInsights.current.add(question.id); setNote(insight); }
    else { setPending(true); timer.current = setTimeout(advance, 350); }
  }
  function back() {
    if (timer.current) clearTimeout(timer.current);
    setPending(false); setNote(""); setPosition(p => Math.max(0, p - 1));
  }
  const purchaseButton = <Button className="gca-cta" disabled={busy} onClick={onPurchase}>{busy ? "Opening checkout…" : "Get My Clarity Assessment — $27"}<span aria-hidden="true"> →</span></Button>;
  return <section id="assessment-preview" className="gca-wrap gca-section gca-preview-section" aria-labelledby="assessment-preview-title">
    <div className="preview-intro"><p className="gca-eyebrow">Try the first four questions</p><h2 id="assessment-preview-title">A little preview. A clearer starting point.</h2>
      <p className="gca-intro">Experience the first four questions of the Clarity Assessment. The full assessment connects your answers across six marketing areas to provide personalized findings and help you focus your time and money where they can make the greatest difference.</p>
      <p className="preview-sample-notice"><LockKeyhole size={16} aria-hidden="true" /><span><strong>Free sample · 4 of 35 questions.</strong> Preview answers aren’t saved. The full assessment and your personalized results are $27.</span></p>
    </div>
    <div className="assessment-shell assessment-preview" data-assessment-preview-active={answered > 0 ? "true" : undefined} style={sectionStyle(1)}>
      <div className="preview-quiz">
        <div className="preview-progress assessment-companion">
          <div><span className="preview-sample-badge">Assessment preview</span><p className="text-sm font-semibold mt-3">Offer · Section 1 of 6</p><p className="text-sm mt-1" role="status">{complete ? "Preview complete" : `Question ${position + 1} of 4`} · {answered} of 4 answered</p></div>
          <progress className="audit-progress mt-3 w-full" value={answered} max={4} aria-label="Sample question progress" />
          <p className="preview-progress-caption">{Math.round(answered / 4 * 100)}% of preview · Answers aren’t saved</p>
        </div>
        {complete ? <div className="preview-locked">
          <div className="preview-locked-background" aria-hidden="true"><p>Offer · Question 5 of 35</p><div className="preview-skeleton-title" />{[1, 2, 3, 4, 5].map(i => <div className="preview-skeleton-answer" key={i}><i /><span /></div>)}</div>
          <div className="preview-unlock-card"><span className="preview-lock-icon"><LockKeyhole aria-hidden="true" /></span><p className="gca-eyebrow">You’ve completed the preview</p><h3 ref={titleRef} tabIndex={-1}>Ready for the full picture?</h3><p>Unlock all 35 questions and discover what your answers suggest about your business’s biggest marketing opportunities.</p><ul><li>Personalized findings across all six areas</li><li>Focused next moves and a 30-day plan</li><li>Your report and Clarity Work Session</li></ul>{purchaseButton}<p className="preview-price-note">$27 · One-time payment</p><p className="preview-restart-note">Your sample answers aren’t saved. After purchase, you’ll start the full assessment with your business details.</p><Button variant="ghost" onClick={back}>← Review my sample answers</Button></div>
        </div> : <AssessmentQuestion question={question} selected={answers[question.id]} position={position} busy={pending} note={note} canContinue={Boolean(answers[question.id])} titleRef={titleRef} onAnswer={answer} onContinue={advance} onBack={back} />}
      </div>
      <aside className="preview-sidebar" aria-label="Assessment areas and example results"><DiagnosticClarityStack answers={answers} currentSection={1} /><div className="preview-examples"><p className="preview-sidebar-label">A glimpse of your results</p><p className="preview-sidebar-copy">Two examples. Different challenges.<br />A focused next move for each.</p>{examples.map(example => <ExampleCard key={example.name} example={example} />)}<p className="preview-examples-note">Read-only examples from fictional businesses. Your report is based on your full assessment.</p></div></aside>
    </div>
    <div className="preview-bottom-cta"><p>Go beyond the preview.<br /><strong>Find where your business can focus next.</strong></p>{purchaseButton}</div>
    {error && <p role="alert" className="mt-4 text-red-700">{error}</p>}
  </section>;
}
