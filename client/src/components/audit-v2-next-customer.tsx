import {trackAssessmentCompletion} from "@/lib/website-analytics";
import { invalidatedByChange } from "@shared/marketing-clarity-audit/v2-next/dependencies";
import { AuditCompletionCard } from "./audit-completion-card";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auditRequest } from "@/lib/audit-api";
import { trackAudit } from "@/lib/audit-events";
import { DiagnosticClarityStack } from "@shared/marketing-clarity-audit/clarity-stack";
import {
  sectionStyle,
  sectionColors,
} from "@shared/marketing-clarity-audit/sections";
import { assessmentSections, assessmentInsights } from "@/lib/assessment-copy";
import {
  customerCopy,
  questionProgress,
} from "@shared/marketing-clarity-audit/v2/customer-copy";
import {
  customerSteps,
  completedStepValues,
} from "@shared/marketing-clarity-audit/v2-next/customer-sequence";
import {
  setupPrompts,
  versions,
  type Setup,
  type Answers,
} from "@shared/marketing-clarity-audit/v2-next/questionnaire";
import { draftSchema } from "@shared/marketing-clarity-audit/v2-next/engine";
import { choicesFor, setupPrompt } from "./audit-v2-next-choices";
import { isSetupAnswered } from "@shared/marketing-clarity-audit/v2-next/customer-sequence";
import "../pages/audit-assessment.css";
export function AuditV2NextCustomer({
  token,
  initial,
}: {
  token: string;
  initial: {
    setup: Setup;
    answers: Answers;
    context?: { companyName: string };
    runNumber?: number;
  };
}) {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const [insight, setInsight] = useState("");
  const navigate = useNavigate(),
    titleRef = useRef<HTMLHeadingElement>(null);
  const [setup, setSetup] = useState(initial.setup),
    [answers, setAnswers] = useState(initial.answers);
  const setupChoices = choicesFor(setup);
  const steps = customerSteps(setup),
    values = completedStepValues(setup, answers);
  const [position, setPosition] = useState(() => {
    const next = steps.findIndex((s) => !values[s.key]);
    return next < 0 ? steps.length : next;
  });
  const [transition, setTransition] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [status, setStatus] = useState("Saved"),
    [pendingValue, setPendingValue] = useState<string | string[]>();
  const step = steps[position],
    field = step?.field,
    q = step?.question,
    sectionId = step?.sectionId ?? 6;
  const section = sectionColors[sectionId as keyof typeof sectionColors],
    copy = assessmentSections[sectionId];
  const local = steps.filter((s) => s.sectionId === sectionId),
    count = steps.filter((s) => values[s.key]).length;
  const selected = step ? values[step.key] : undefined;
  useEffect(() => {
    titleRef.current?.focus();
  }, [position, transition]);
  function advance() {
    setInsight("");
    if (
      step &&
      (position === steps.length - 1 ||
        steps[position + 1].sectionId !== sectionId)
    ) {
      setTransition(true);
      trackAudit("section_complete", token, q?.id);
    } else setPosition((p) => p + 1);
  }
  async function save(value: string | string[]) {
    if (!step) return;
    setBusy(true);
    setPendingValue(value);
    setStatus("Saving…");
    setError("");
    try {
      if (field) {
        await auditRequest(`/${token}/setup`, "PUT", { field, value });
        const clear = invalidatedByChange(setup, field, value);
        setSetup(
          (s) =>
            Object.fromEntries(
              Object.entries({ ...s, [field]: value }).filter(
                ([key]) => !clear.setup.includes(key),
              ),
            ) as Setup,
        );
        setAnswers((a) =>
          Object.fromEntries(
            Object.entries(a).filter(([key]) => !clear.answers.includes(key)),
          ),
        );
      } else if (q) {
        await auditRequest(`/${token}/answer`, "PUT", {
          questionId: q.id,
          answer: value as string,
        });
        setAnswers((a) => ({ ...a, [q.id]: value as any }));
        trackAudit("question_answered", token, q.id);
      }
      setStatus("Saved");
      if (q) {
        const teaching = ["D", "E"].includes(value as string)
          ? assessmentInsights[q.id]
          : undefined;
        if (teaching) setInsight(teaching);
        else {
          await new Promise((resolve) => setTimeout(resolve, 350));
          if (mounted.current) advance();
        }
      }
    } catch (e) {
      setError((e as Error).message);
      setStatus("Not saved. Please retry.");
    } finally {
      setBusy(false);
      setPendingValue(undefined);
    }
  }
  async function saveNotes(value: string) {
    if (value === (setup.trendContext ?? "")) return;
    setBusy(true);
    setStatus("Saving…");
    try {
      await auditRequest(`/${token}/setup`, "PUT", {
        field: "trendContext",
        value,
      });
      setSetup((s) => ({ ...s, trendContext: value }));
      setStatus("Saved");
    } catch (e) {
      setError((e as Error).message);
      setStatus("Not saved. Please retry.");
    } finally {
      setBusy(false);
    }
  }
  async function complete() {
    setBusy(true);
    setError("");
    try {
      draftSchema.parse({ versions, setup, answers });
      const completed = await auditRequest<{completionId: string; completionProof?:string}>(`/${token}/complete`, "POST");
      trackAssessmentCompletion(completed.completionId,completed.completionProof);
      navigate(`/audit/results/${token}`);
    } catch {
      setError(
        "Please answer all 46 questions and check that your advertising answers agree.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="assessment-shell mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="assessment-heading mb-4 text-2xl font-bold">
        Get Clarity Assessment
      </h1>
      {initial.runNumber === 2 && (
        <p className="mb-4 text-sm">
          Included retake · Report 2 of 2.{" "}
          <a className="underline" href={`/audit/results/${token}?run=1`}>
            View your original report
          </a>
        </p>
      )}
      <div
        className={`assessment-workspace${!step ? " assessment-workspace-complete" : ""}`}
      >
        <div
          style={sectionStyle(sectionId)}
          className="assessment-companion sticky top-28 z-20 mb-6 rounded-xl border border-gray-200 bg-white/95 p-4 backdrop-blur md:top-20"
        >
          <div className="assessment-progress-layout grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-3 sm:grid-cols-[1fr_280px] sm:gap-6">
            <div>
              {initial.context?.companyName && (
                <p className="mb-1 break-words text-xs text-muted-foreground">
                  Get Clarity Assessment for {initial.context.companyName}
                </p>
              )}
              <p className="text-sm font-semibold">
                {step
                  ? `${section.name} · Section ${sectionId} of 6`
                  : "Review"}
              </p>
              <p className="mt-1 text-sm">{questionProgress(count)}</p>
              {step && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Question {local.findIndex((s) => s.key === step.key) + 1} of{" "}
                  {local.length} in this section
                </p>
              )}
              <progress
                className="audit-progress mt-2 h-2 w-full"
                value={count}
                max={46}
                aria-label="Questions answered"
              />
              <p role="status" aria-live="polite" className="mt-1 text-xs">
                {status}
              </p>
            </div>
            <DiagnosticClarityStack
              answers={values}
              questions={steps.map((s) => ({
                id: s.key,
                sectionId: s.sectionId,
              }))}
              currentSection={transition ? undefined : step?.sectionId}
            />
          </div>
        </div>
        {transition ? (
          <section
            style={sectionStyle(sectionId)}
            className="assessment-transition rounded-2xl border border-gray-200 p-8"
          >
            <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-bold">
              <span style={{ color: "var(--section-color)" }}>
                {section.name} complete
              </span>
            </h2>
            <p className="my-4">{copy.completion}</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Your answers are saved.
            </p>
            <Button
              onClick={() => {
                setTransition(false);
                setPosition((p) => p + 1);
              }}
            >
              {position === steps.length - 1
                ? "Review your answers"
                : "Continue to next section"}
            </Button>
            <Button variant="ghost" onClick={() => setTransition(false)}>
              Review last answer
            </Button>
          </section>
        ) : step ? (
          <section
            style={sectionStyle(sectionId)}
            className="assessment-question rounded-2xl border border-gray-200 p-5 sm:p-8"
          >
            <p className="text-sm" style={{ color: "var(--section-color)" }}>
              {copy.title}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {copy.description}
            </p>
            <h2
              ref={titleRef}
              tabIndex={-1}
              className="mt-4 max-w-3xl text-xl font-semibold outline-none sm:text-2xl"
            >
              {field
                ? (setupPrompt(field, setup) ?? setupPrompts[field])
                : q!.prompt}
            </h2>
            {q?.supporting && <p className="mt-3 text-sm">{q.supporting}</p>}
            <fieldset className="mt-6 space-y-3" disabled={busy}>
              <legend className="sr-only">Choose your answer</legend>
              {(field ? setupChoices[field]! : q!.options).map((o) => (
                <label
                  key={o.value}
                  className="assessment-answer flex min-h-12 cursor-pointer gap-3 rounded-xl border p-4 focus-within:ring-2 focus-within:ring-primary"
                >
                  <input
                    type={field === "outcome" ? "checkbox" : "radio"}
                    name="response"
                    value={o.value}
                    checked={
                      field === "outcome"
                        ? (
                            (pendingValue ?? selected ?? []) as string[]
                          ).includes(o.value)
                        : (pendingValue ?? selected) === o.value
                    }
                    onChange={(event) =>
                      save(
                        field === "outcome"
                          ? event.target.checked
                            ? [...((selected ?? []) as string[]), o.value]
                            : ((selected ?? []) as string[]).filter(
                                (v) => v !== o.value,
                              )
                          : o.value,
                      )
                    }
                    className="mt-1 shrink-0"
                  />
                  <span className="max-w-3xl">{o.text}</span>
                </label>
              ))}
            </fieldset>
            {field === "trend" && (
              <label className="mt-5 block text-sm font-medium">
                {customerCopy.optionalContext}
                <textarea
                  aria-label={customerCopy.optionalContext}
                  className="mt-2 block min-h-28 w-full rounded-xl border border-gray-300 p-4"
                  maxLength={1200}
                  defaultValue={setup.trendContext ?? ""}
                  disabled={busy}
                  onBlur={(e) => saveNotes(e.target.value)}
                />
              </label>
            )}
            {insight && (
              <aside
                role="status"
                className="assessment-insight mt-5 rounded-xl bg-green-50 p-4"
              >
                <h3 className="font-semibold">Clarity Insight</h3>
                <p className="mt-2">{insight}</p>
                <Button className="mt-3" disabled={busy} onClick={advance}>
                  Continue
                </Button>
              </aside>
            )}
            <div className="assessment-navigation mt-6 flex justify-between">
              <Button
                variant="outline"
                disabled={busy || position === 0}
                onClick={() => {
                  setInsight("");
                  setPosition((p) => p - 1);
                }}
              >
                Back
              </Button>
              {!insight && (
                <Button
                  disabled={busy || !isSetupAnswered(selected)}
                  onClick={advance}
                >
                  Continue
                </Button>
              )}
            </div>
          </section>
        ) : (
          <AuditCompletionCard
            titleRef={titleRef}
            companyName={initial.context?.companyName}
            isRetake={initial.runNumber === 2}
            busy={busy || count !== 46}
            complete={complete}
            back={() => setPosition((p) => Math.max(0, p - 1))}
            completionLabel={customerCopy.completion}
          />
        )}
      </div>
      <details className="my-5 rounded-xl border border-gray-200 p-4">
        <summary className="cursor-pointer font-medium">
          Save your secure resume link
        </summary>
        <p className="mt-2 text-sm">
          Keep this private link to return without an account or password.
        </p>
        <input
          aria-label="Secure resume link"
          readOnly
          value={`${window.location.origin}/audit/resume/${token}`}
          className="mt-2 w-full rounded border p-2 text-sm"
        />
      </details>
      {error && (
        <p role="alert" className="my-4 rounded-xl bg-red-50 p-4">
          {error}
        </p>
      )}
    </main>
  );
}
