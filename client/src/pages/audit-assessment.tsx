import { trackWebsiteEvent, trackPurchase, type Receipt } from "@/lib/website-analytics";
import {AuditV2PriorityCustomer} from '@/components/audit-v2-priority-customer';
import {versions as priorityVersions} from '@shared/marketing-clarity-audit/v2-priority/questionnaire';
import {AuditV2GoalsCustomer} from '@/components/audit-v2-goals-customer';
import {versions as goalsVersions} from '@shared/marketing-clarity-audit/v2-goals/questionnaire';
import {customerContextGoalsSchema} from '@shared/marketing-clarity-audit/v2-goals/goals';
import {AuditV2NextCustomer} from "@/components/audit-v2-next-customer";
import {versions as nextVersions} from "@shared/marketing-clarity-audit/v2-next/questionnaire";
import {customerContextNextSchema} from "@shared/marketing-clarity-audit/v2-next/goals";
import { AuditCompletionCard } from "@/components/audit-completion-card";
import { customerCopy } from "@shared/marketing-clarity-audit/v2/customer-copy";
import { AuditV2Customer } from "@/components/audit-v2-customer";
import {
  versions,
  type Setup,
} from "@shared/marketing-clarity-audit/v2/questionnaire";
import { assessmentSections, assessmentInsights } from "@/lib/assessment-copy";
import "./audit-assessment.css";
import { AssessmentQuestion } from "@/components/assessment-question";
import { DiagnosticClarityStack } from "@shared/marketing-clarity-audit/clarity-stack";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sectionStyle } from "@shared/marketing-clarity-audit/sections";
import { auditRequest } from "@/lib/audit-api";
import { trackAudit } from "@/lib/audit-events";
import {
  questionnaire,
  type Answers,
  type AnswerValue,
  assessmentProgress,
} from "@shared/marketing-clarity-audit/scoring";
import {
  businessTypes,
  marketingGoals,
  customerContextSchema,
  type CustomerContext,
} from "@shared/marketing-clarity-audit/context";

type Session = {
  version?: string;
  setup?: Setup;
  localQa?: boolean;
  context: CustomerContext | null;
  answers: Answers;
  completed: boolean;
  savedAt: string;
  runNumber?: 1 | 2;
};
export default function AuditAssessment() {
  const { token } = useParams();
  const [params] = useSearchParams();
  const checkoutId = params.get("session_id");
  const navigate = useNavigate();
  const [session, setSession] = useState<Session>();
  const [position, setPosition] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Saved");
  const [selected, setSelected] = useState<AnswerValue>();
  const pendingQuestion = useRef<string>();
  const [note, setNote] = useState("");
  const [transition, setTransition] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let active = true;
    setError("");
    (async () => {
      try {
        if (!token) {
          if (!checkoutId)
            throw new Error(
              "Purchase the Get Clarity Assessment to get started, or open your secure resume link.",
            );
          const result = await auditRequest<{ token: string; receipt: Receipt | null }>(
            "/exchange",
            "POST",
            { checkoutId },
          );
          trackAudit("purchase_success", result.token);
          if (result.receipt) trackPurchase(result.receipt);
          if (active)
            navigate(`/audit/resume/${result.token}`, { replace: true });
          return;
        }
        const value = await auditRequest<Session>(`/${token}`);
        if (!active) return;
        if (value.completed) {
          navigate(`/audit/results/${token}`, { replace: true });
          return;
        }
        setSession(value);
        trackAudit("resume", token);
        const next = questionnaire.questions.findIndex(
          (q) => !value.answers[q.id],
        );
        setPosition(next < 0 ? 35 : next);
      } catch (e) {
        if (active) setError((e as Error).message);
      }
    })();
    return () => {
      active = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [token, checkoutId, loadAttempt, navigate]);
  useEffect(() => {
    setSelected(undefined);
    setNote("");
    titleRef.current?.focus();
  }, [position]);
  useEffect(() => {
    if (transition) titleRef.current?.focus();
  }, [transition]);
  useEffect(() => {
    const current = questionnaire.questions[position];
    if (
      session?.context &&
      token &&
      current &&
      questionnaire.questions.findIndex(
        (q) => q.sectionId === current.sectionId,
      ) === position
    )
      trackAudit("section_start", token, current.id);
  }, [position, token, Boolean(session?.context)]);
  const question = questionnaire.questions[position];
  const selectedForQuestion =
    pendingQuestion.current === question?.id ? selected : undefined;
  const section =
    question &&
    questionnaire.sections.find((s) => s.id === question.sectionId)!;
  const progress = assessmentProgress(
    [versions.questionnaire,nextVersions.questionnaire,goalsVersions.questionnaire,priorityVersions.questionnaire].includes(session?.version as any) ? {} : (session?.answers ?? {}),
  );
  const companyName = session?.context?.companyName?.trim();
  const isRetake = session?.runNumber === 2;
  const localQuestions = section
    ? questionnaire.questions.filter((q) => q.sectionId === section.id)
    : [];
  const resumeUrl = `${window.location.origin}/audit/resume/${token}`;

  const advance = () => {
    if (
      question &&
      position < 34 &&
      questionnaire.questions[position + 1].sectionId !== question.sectionId
    ) {
      trackAudit("section_complete", token, question.id);
      setTransition(true);
    } else setPosition((p) => p + 1);
    setNote("");
  };
  async function saveAnswer(value: AnswerValue) {
    if (busy || !question || !session) return;
    pendingQuestion.current = question.id;
    setSelected(value);
    setBusy(true);
    setStatus("Saving…");
    setError("");
    try {
      const saved = await auditRequest<{ teachingNote?: string }>(
        `/${token}/answer`,
        "PUT",
        { questionId: question.id, answer: value },
      );
      setSession((current) =>
        current
          ? {
              ...current,
              answers: { ...current.answers, [question.id]: value },
            }
          : current,
      );
      setStatus("Saved");
      trackAudit("question_answered", token, question.id);
      if (position === 34) trackAudit("section_complete", token, question.id);
      if (saved.teachingNote) {
        setNote(assessmentInsights[question.id] ?? saved.teachingNote);
        setBusy(false);
      } else
        timer.current = setTimeout(() => {
          advance();
          setBusy(false);
        }, 350);
    } catch (e) {
      setError((e as Error).message);
      setStatus("Not saved");
      setBusy(false);
    }
  }
  async function saveContext(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    const parsed = ([goalsVersions.questionnaire,priorityVersions.questionnaire].includes(session?.version as any)?customerContextGoalsSchema:session?.version===nextVersions.questionnaire?customerContextNextSchema:customerContextSchema).safeParse(
      isRetake ? { ...session?.context, ...data } : data,
    );
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      await auditRequest(`/${token}/context`, "PUT", parsed.data);
      if (!session?.localQa) trackWebsiteEvent("assessment_context_submit", { form_id: isRetake ? "assessment_context_update" : "assessment_context" });
      setSession((current) =>
        current ? { ...current, context: parsed.data as any } : current,
      );
      if (isRetake) setStatus("Business focus saved");
      else trackAudit("audit_start", token);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function complete() {
    setBusy(true);
    setError("");
    try {
      await auditRequest(`/${token}/complete`, "POST", {});
      if (!session?.localQa) trackWebsiteEvent("assessment_complete", { form_id: "clarity_assessment" });
      navigate(`/audit/results/${token}`);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }
  const back = () => {
    if (timer.current) clearTimeout(timer.current);
    setError("");
    setNote("");
    setTransition(false);
    setPosition((p) => Math.max(0, p - 1));
  };

  if(session?.context&&token&&session.version===priorityVersions.questionnaire)return <AuditV2PriorityCustomer token={token} initial={session as any}/>;
  if(session?.context&&token&&session.version===goalsVersions.questionnaire)return <AuditV2GoalsCustomer token={token} initial={session as any}/>;
  if(session?.context&&token&&session.version===nextVersions.questionnaire)return <AuditV2NextCustomer token={token} initial={session as any}/>;
  if (session?.context && token && session.version === versions.questionnaire)
    return <AuditV2Customer token={token} initial={session as any} />;
  return (
    <main className="assessment-shell mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {session?.localQa && (
        <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold">
          LOCAL QA TEST RUN — separate from the purchased assessment. Original
          reports and included retake are untouched.
        </p>
      )}
      {session && !session.localQa && !session.context && (
        <div role="status" className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
          <p className="font-semibold">Purchase confirmed. Thank you for choosing Get Clarity Assessment.</p>
          <p className="mt-2">Set aside about 20 minutes to gain greater clarity on where to focus in your business.</p>
        </div>
      )}
      <h1 className="assessment-heading mb-4 text-2xl font-bold">{session && !session.context ? "The journey begins with a single step." : "Get Clarity Assessment"}</h1>
      {session && !session.context && <p className="mb-6">Enter your company, website, and other business details to get started.</p>}
      {!session && !error && (
        <p role="status">Verifying purchase and loading your assessment…</p>
      )}
      {error && (
        <div
          role="alert"
          className="my-4 rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <p>{error}</p>
          {!session ? (
            <Button
              className="mt-3"
              onClick={() => setLoadAttempt((n) => n + 1)}
            >
              Retry
            </Button>
          ) : status === "Not saved" && selected ? (
            <Button className="mt-3" onClick={() => saveAnswer(selected)}>
              Retry save
            </Button>
          ) : null}
        </div>
      )}
      {!session && error && (
        <Link to="/marketing-clarity-assesment" className="underline">
          Return to Get Clarity Assessment
        </Link>
      )}
      {session && !session.context && (
        <section className="rounded-2xl border border-gray-200 p-5 sm:p-8">
          <h2 className="text-2xl font-semibold">
            Find your next growth opportunity.
          </h2>
          <p className="mt-3">
            {[versions.questionnaire,nextVersions.questionnaire,goalsVersions.questionnaire,priorityVersions.questionnaire].includes(session.version as any)
              ? customerCopy.introduction
              : "Answer 35 questions to find your next growth opportunity."}{" "}
            Explore six growth levers: what you sell, who buys, how you explain
            it, the path to taking action, how people find you, and how you
            learn from results. Together, your answers help identify where to
            focus next—with three practical moves and a 30-day plan.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {[versions.questionnaire,nextVersions.questionnaire,goalsVersions.questionnaire,priorityVersions.questionnaire].includes(session.version as any)
              ? "Allow about 15–25 minutes."
              : "Allow 12–18 minutes."}{" "}
            Answer for how your business works today. Your answers save
            automatically; use your secure resume link to return. Scores appear
            after you finish.
          </p>
          <form onSubmit={saveContext} className="mt-6 space-y-5">
            {[
              ["name", "Name", "text"],
              ["email", "Email", "email"],
              ["companyName", "Company name", "text"],
              ["websiteUrl", "Website URL", "text"],
            ].map(([name, label, type]) => (
              <label key={name} className="block font-medium">
                {label}
                <Input
                  name={name}
                  type={type}
                  inputMode={name === "websiteUrl" ? "url" : undefined}
                  autoCapitalize={name === "websiteUrl" ? "none" : undefined}
                  required
                  className="mt-2 placeholder:text-gray-400"
                  placeholder={
                    name === "websiteUrl"
                      ? "https://www.example.com"
                      : undefined
                  }
                />
              </label>
            ))}
            <label className="block font-medium">
              Business type
              <select
                name="businessType"
                required
                className="mt-2 block min-h-11 w-full rounded-md border border-input bg-white p-2"
              >
                <option value="">Select a business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </label>
            {![nextVersions.questionnaire,goalsVersions.questionnaire,priorityVersions.questionnaire].includes(session.version as any)&&<label className="block font-medium">
              Primary marketing goal
              <select
                name="primaryMarketingGoal"
                required
                className="mt-2 block min-h-11 w-full rounded-md border border-input bg-white p-2"
              >
                <option value="">Select a goal</option>
                {marketingGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </label>
            }
            <Button disabled={busy} type="submit">
              {busy ? "Saving…" : "Start My Assessment"}
            </Button>
          </form>
        </section>
      )}
      {session && (
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
            value={resumeUrl}
            onFocus={(event) => event.target.select()}
            className="mt-2 w-full rounded border p-2 text-sm"
          />
          <Button
            variant="outline"
            className="mt-2"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(resumeUrl);
                setStatus("Resume link copied");
              } catch {
                setStatus("Select and copy the resume link");
              }
            }}
          >
            Copy resume link
          </Button>
        </details>
      )}
      {session?.context && (
        <>
          {isRetake && (
            <div className="mb-4 text-sm text-muted-foreground">
              Included retake · Report 2 of 2.{" "}
              <Link className="underline" to={`/audit/results/${token}?run=1`}>
                View your original report
              </Link>
              <details className="mt-3 rounded-xl border border-gray-200 p-4">
                <summary className="cursor-pointer font-medium">
                  Update your business focus
                </summary>
                <p className="mt-2">
                  Your purchaser details, company, and website stay the same.
                  You can update your business type or marketing goal for this
                  retake.
                </p>
                <form className="mt-3 space-y-3" onSubmit={saveContext}>
                  <label className="block">
                    Retake business type
                    <select
                      name="businessType"
                      defaultValue={session.context.businessType}
                      required
                      className="mt-1 block min-h-11 w-full rounded-md border border-input bg-white p-2"
                    >
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    Retake marketing goal
                    <select
                      name="primaryMarketingGoal"
                      defaultValue={session.context.primaryMarketingGoal}
                      required
                      className="mt-1 block min-h-11 w-full rounded-md border border-input bg-white p-2"
                    >
                      {marketingGoals.map((goal) => (
                        <option key={goal} value={goal}>
                          {goal.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Button variant="outline" type="submit" disabled={busy}>
                    {busy ? "Saving…" : "Save Business Focus"}
                  </Button>
                </form>
              </details>
            </div>
          )}
          <div
            className={`assessment-workspace${!question ? " assessment-workspace-complete" : ""}`}
          >
            <div
              style={sectionStyle(section?.id)}
              className="assessment-companion sticky top-28 z-20 mb-6 rounded-xl border border-gray-200 bg-white/95 p-4 backdrop-blur md:top-20"
            >
              <div className="assessment-progress-layout grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-3 sm:grid-cols-[1fr_280px] sm:gap-6">
                <div>
                  {companyName && (
                    <p className="mb-1 break-words text-xs text-muted-foreground">
                      Get Clarity Assessment for {companyName}
                    </p>
                  )}
                  <p className="text-sm font-semibold">
                    {section?.name ?? "Review"} · Section {section?.id ?? 6} of
                    6
                  </p>
                  <p className="mt-1 text-sm">
                    {question
                      ? `Question ${localQuestions.findIndex((q) => q.id === question.id) + 1} of ${localQuestions.length} · `
                      : ""}
                    {progress.percent}% complete · {progress.remainingTime}
                  </p>
                  <progress
                    className="audit-progress mt-2 h-2 w-full accent-violet-600"
                    value={progress.answered}
                    max={35}
                    aria-label="Assessment progress"
                  />
                  <p role="status" aria-live="polite" className="mt-1 text-xs">
                    {status}
                  </p>
                </div>
                <DiagnosticClarityStack
                  answers={session.answers}
                  currentSection={transition ? undefined : section?.id}
                />
              </div>
            </div>
            {transition ? (
              <section
                style={sectionStyle(section?.id)}
                className="assessment-transition rounded-2xl border border-gray-200 p-8"
              >
                <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-bold">
                  <span style={{ color: "var(--section-color)" }}>
                    {section?.name} complete
                  </span>
                </h2>
                <p className="my-4">
                  {section && assessmentSections[section.id]?.completion}
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Your answers are saved.
                </p>
                <Button
                  onClick={() => {
                    setTransition(false);
                    setPosition((p) => p + 1);
                  }}
                >
                  Continue to next section
                </Button>
                <Button variant="ghost" onClick={() => setTransition(false)}>
                  Review last answer
                </Button>
              </section>
            ) : question ? (
              <AssessmentQuestion
                question={question}
                selected={selectedForQuestion ?? session.answers[question.id]}
                busy={busy}
                position={position}
                note={note}
                error={error}
                canContinue={Boolean(session.answers[question.id])}
                titleRef={titleRef}
                onAnswer={saveAnswer}
                onContinue={advance}
                onBack={back}
              />
            ) : (
              <AuditCompletionCard
                titleRef={titleRef}
                companyName={companyName}
                isRetake={isRetake}
                busy={busy}
                complete={complete}
                back={back}
                completionLabel="All 35 answers saved"
              />
            )}
          </div>
        </>
      )}
    </main>
  );
}
