import "./audit-assessment.css";
import { questionDisplay } from "@shared/marketing-clarity-audit/question-display";
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
          const result = await auditRequest<{ token: string }>(
            "/exchange",
            "POST",
            { checkoutId },
          );
          trackAudit("purchase_success", result.token);
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
  const progress = assessmentProgress(session?.answers ?? {});
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
        setNote(saved.teachingNote);
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
    const parsed = customerContextSchema.safeParse(
      isRetake ? { ...session?.context, ...data } : data,
    );
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      await auditRequest(`/${token}/context`, "PUT", parsed.data);
      setSession((current) =>
        current ? { ...current, context: parsed.data } : current,
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

  return (
    <main className="assessment-shell mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {session?.localQa && (
        <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold">
          LOCAL QA TEST RUN — separate from the purchased assessment. Original
          reports and included retake are untouched.
        </p>
      )}
      <h1 className="assessment-heading mb-4 text-2xl font-bold">Get Clarity Assessment</h1>
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
            Tell us about your business
          </h2>
          <p className="mt-3">
            Six sections · 35 questions · approximately 12–18 minutes. Your
            answers save automatically. Scores stay hidden until completion.
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
            <label className="block font-medium">
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
            <Button disabled={busy} type="submit">
              {busy ? "Saving…" : "Start Get Clarity Assessment"}
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
          <div className="assessment-workspace">
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
                    {section?.name ?? "Review"} · Section {section?.id ?? 6} of 6
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
                  Your answers are saved. Next:{" "}
                  {
                    questionnaire.sections.find(
                      (s) => s.id === (section?.id ?? 0) + 1,
                    )?.name
                  }
                  .
                </p>
                {(section?.id === 1 || section?.id === 3) && (
                  <p className="mb-4 break-words text-sm text-muted-foreground">
                    {section.id === 3
                      ? `Halfway there. You’re narrowing down the highest-leverage next moves${companyName ? ` for ${companyName}` : " for your business"}.`
                      : `You’re building a clearer picture of what deserves attention next${companyName ? ` at ${companyName}` : " in your business"}.`}
                  </p>
                )}
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
              <section
                style={sectionStyle(section?.id)}
                className="assessment-question rounded-2xl border border-gray-200 p-5 sm:p-8"
              >
                <p className="text-sm" style={{ color: "var(--section-color)" }}>
                  {section?.title}
                </p>
                <h2
                  ref={titleRef}
                  tabIndex={-1}
                  className="mt-4 max-w-3xl text-xl font-semibold outline-none sm:text-2xl"
                >
                  {questionDisplay(question)}
                </h2>
                {"helperText" in question && (
                  <p className="mt-3 text-sm">{question.helperText}</p>
                )}
                <fieldset className="mt-6 space-y-3" disabled={busy}>
                  <legend className="sr-only">Choose your answer</legend>
                  {question.options.map((option) => (
                    <label
                      key={option.value}
                      className={`assessment-answer flex min-h-12 cursor-pointer gap-3 rounded-xl border p-4 focus-within:ring-2 focus-within:ring-primary ${option.value === (selectedForQuestion ?? session.answers[question.id]) ? "border-primary bg-violet-50" : "border-gray-200"}`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={
                          option.value ===
                          (selectedForQuestion ?? session.answers[question.id])
                        }
                        onChange={() => saveAnswer(option.value as AnswerValue)}
                        className="mt-1 shrink-0 accent-violet-600"
                      />
                      <span className="max-w-3xl">{option.text}</span>
                    </label>
                  ))}
                </fieldset>
                {note && (
                  <aside
                    role="status"
                    className="assessment-insight mt-5 rounded-xl bg-green-50 p-4"
                  >
                    <h3 className="font-semibold">Clarity Insight</h3>
                    <p className="mt-2">{note}</p>
                    <Button className="mt-3" onClick={advance}>
                      Continue
                    </Button>
                  </aside>
                )}
                <div className="assessment-navigation mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    disabled={position === 0 || busy}
                    onClick={back}
                  >
                    Back
                  </Button>
                  {session.answers[question.id] && !note && !error && (
                    <Button disabled={busy} onClick={advance}>
                      Continue
                    </Button>
                  )}
                </div>
              </section>
            ) : (
              <section className="assessment-ready relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-6 shadow-sm sm:p-10">
                <div
                  aria-hidden="true"
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-violet-100"
                >
                  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M5 40L24 7L43 40H5Z"
                      stroke="#6d4ce8"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 40L29 21L24 7"
                      stroke="#16734b"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 15L24 20L28 15"
                      stroke="#6d4ce8"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-800">
                  Six sections explored · All 35 answers saved
                </p>
                <h2
                  ref={titleRef}
                  tabIndex={-1}
                  className="max-w-xl text-3xl font-bold leading-tight outline-none sm:text-4xl"
                >
                  You’ve completed the climb. Now let’s find the clearest path
                  forward.
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  You’ve examined six interconnected parts of your marketing
                  system and given us the context needed to look for the patterns
                  between them.
                </p>
                <p className="break-words text-sm text-muted-foreground">
                  Prepared specifically for {companyName || "your business"}
                </p>
                <div className="my-6 rounded-xl border border-violet-100 bg-white/80 p-4">
                  <h3 className="font-semibold">
                    Review before generating your report
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">
                    {isRetake
                      ? "You can still edit any answer before continuing. This is your included retake. Generating your report freezes Report 2; your original report will remain available."
                      : "You can still edit any answer before continuing. Your purchase also includes one complete retake in case you want to reassess your business after reviewing your first results."}
                  </p>
                </div>
                <p className="mb-4 text-lg font-semibold text-primary">
                  Your clarity is one step away.
                </p>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  We examined the six layers of your marketing system. Now we can
                  show you where to focus and what to do next.
                </p>
                <ol
                  aria-label="Your Clarity Stack"
                  className="clarity-stack mb-6 flex flex-col gap-3"
                >
                  {[
                    [
                      "Your Primary Constraint",
                      "The issue most likely holding progress back.",
                      "#5541BF",
                      "#F7F4FF",
                    ],
                    [
                      "Your 3 Highest-Leverage Next Moves",
                      "Where your attention is most likely to matter.",
                      "#145C43",
                      "#F2FAF5",
                    ],
                    [
                      "What Not to Prioritize Yet",
                      "What you can stop spending attention on for now.",
                      "#14636B",
                      "#F1F9FA",
                    ],
                    [
                      "Your 30-Day Clarity Plan",
                      "How to turn the diagnosis into action.",
                      "#5541BF",
                      "#F7F4FF",
                    ],
                  ].map(([title, description, color, tint], index) => (
                    <li
                      key={title}
                      className="flex w-full items-start gap-4 rounded-xl border border-white p-5 shadow-sm sm:items-center sm:p-6"
                      style={{
                        backgroundColor: tint,
                        borderLeft: `4px solid ${color}`,
                        boxShadow:
                          "0 3px 0 rgba(37, 28, 69, 0.05), 0 8px 20px rgba(37, 28, 69, 0.025)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-white text-sm font-semibold tracking-wide"
                        style={{ color, borderColor: `${color}30` }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-semibold leading-snug text-gray-900">
                          {title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    className="h-auto min-h-12 whitespace-normal px-5 py-3"
                    disabled={busy}
                    onClick={complete}
                  >
                    {busy
                      ? "Generating your report…"
                      : "Generate My Get Clarity Assessment Report"}
                  </Button>
                  <Button variant="ghost" disabled={busy} onClick={back}>
                    Back
                  </Button>
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </main>
  );
}
