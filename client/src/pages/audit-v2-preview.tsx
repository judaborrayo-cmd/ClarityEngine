import {
  customerCopy,
  questionProgress,
} from "@shared/marketing-clarity-audit/v2/customer-copy";
import { setupChoices } from "@/components/audit-v2-choices";
import { ReportView } from "@/components/audit-v2-report";
import React, { useState } from "react";
import { ZodError } from "zod";
import { createRoot } from "react-dom/client";
import {
  assessmentQuestions,
  ownershipOptions,
  trends,
  sections,
  setupPrompts,
  versions,
  requiredSetupFields,
  nonUseReasons,
  type Setup,
  type Answers,
} from "@shared/marketing-clarity-audit/v2/questionnaire";
import {
  createReport,
  draftSchema,
  type Report,
} from "@shared/marketing-clarity-audit/v2/engine";
import { scenarios } from "@shared/marketing-clarity-audit/v2/scenarios";
import "./audit-v2-preview.css";

const storageKey = `clarity-engine:v2-preview:${versions.questionnaire}:workspace`;
interface Workspace {
  setup: Setup;
  answers: Answers;
  reports: Report[];
  notes: Record<string, string>;
}
const empty = (): Workspace => ({
  setup: {} as Setup,
  answers: {},
  reports: [],
  notes: {},
});
function load(): Workspace {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (!saved) return empty();
    // Partial setup is allowed until its conditional screens are complete. Completed data is version validated.
    if (saved.version !== versions.questionnaire) return empty();
    return { ...empty(), ...saved.workspace };
  } catch {
    return empty();
  }
}
function App() {
  const [workspace, setWorkspace] = useState(load);
  const [screen, setScreen] = useState(() => {
    const fields = requiredSetupFields;
    const missingSetup = fields.findIndex((f) => !workspace.setup[f]);
    if (missingSetup >= 0) return missingSetup;
    const next = assessmentQuestions(workspace.setup).findIndex(
      (q) => !workspace.answers[q.id],
    );
    return fields.length + Math.max(0, next);
  });
  const [tab, setTab] = useState<"assessment" | "report">(
    workspace.reports.length ? "report" : "assessment",
  );
  const [selectedRun, setSelectedRun] = useState(workspace.reports.length - 1);
  const [error, setError] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("");
  const { setup, answers, reports } = workspace;
  function save(next: Workspace) {
    setWorkspace(next);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ version: versions.questionnaire, workspace: next }),
      );
      setError("");
    } catch {
      setError(
        "Browser storage is unavailable. Keep this page open and export your report before leaving.",
      );
    }
  }
  const setupFields = requiredSetupFields;
  const questionList = assessmentQuestions(setup);
  const totalScreens = setupFields.length + questionList.length;
  const field = screen < setupFields.length ? setupFields[screen] : undefined;
  const question = questionList[screen - setupFields.length];
  const report = reports[selectedRun];
  const choices = setupChoices;
  function select(value: string) {
    if (field) {
      const nextSetup = { ...setup, [field]: value } as Setup;
      save({ ...workspace, setup: nextSetup });
    } else if (question)
      save({
        ...workspace,
        answers: { ...answers, [question.id]: value as Answers[string] },
      });
  }
  function finish() {
    try {
      const draft = draftSchema.parse({ versions, setup, answers });
      const nextReport = createReport(draft);
      save({ ...workspace, reports: [...reports, nextReport] });
      setSelectedRun(reports.length);
      setTab("report");
    } catch (error) {
      if (error instanceof ZodError) {
        const issue = error.issues[0];
        const fieldIndex = requiredSetupFields.indexOf(
          issue.path[1] as (typeof requiredSetupFields)[number],
        );
        if (fieldIndex >= 0) setScreen(fieldIndex);
        setError(issue.message);
      } else
        setError(
          error instanceof Error
            ? error.message
            : "Answer every question before generating your report.",
        );
    }
  }
  function exportJson() {
    const blob = new Blob([JSON.stringify(workspace, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "clarity-engine-v2-preview.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }
  return (
    <main>
      <header>
        <span className="eyebrow">CLARITY ENGINE / DEVELOPMENT REVIEW</span>
        <h1>Your next growth opportunity</h1>
        <p>
          {customerCopy.introduction} This local preview saves in this browser,
          separately from purchased assessments.
        </p>
        <p className="small">
          Explicit non-advertising answers are available. Your reason and
          readiness help shape a useful next step. Allow roughly 15–25 minutes
          for this preview; timing awaits review.
        </p>
      </header>
      <div className="toolbar">
        <label>
          Review a synthetic profile
          <select
            aria-label="Review a synthetic profile"
            value={selectedScenario}
            onChange={(e) => {
              setSelectedScenario(e.target.value);
              const s = scenarios[Number(e.target.value)];
              if (!s) return;
              const r = createReport(s.draft);
              save({
                ...workspace,
                setup: s.draft.setup,
                answers: s.draft.answers,
                reports: [...reports, r],
              });
              setSelectedRun(reports.length);
              setTab("report");
              setScreen(0);
            }}
          >
            <option value="">Choose a profile</option>
            {scenarios.map((s, i) => (
              <option value={i} key={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => setTab("assessment")}>Questionnaire</button>
        <button disabled={!reports.length} onClick={() => setTab("report")}>
          Reports ({reports.length})
        </button>
        <button onClick={exportJson}>Export preview and notes</button>
      </div>
      {error && <p role="alert">{error}</p>}
      {tab === "assessment" ? (
        <section className="card">
          <p className="eyebrow">
            Screen {Math.min(screen + 1, totalScreens)} of {totalScreens} ·{" "}
            {field
              ? "Your business"
              : sections.find((s) => s.id === question?.sectionId)?.name}
          </p>
          <progress
            aria-label="Assessment progress"
            max={totalScreens}
            value={screen}
          />
          <h2>{field ? setupPrompts[field] : question?.prompt}</h2>
          {!field && <p>{question?.supporting}</p>}
          <fieldset>
            <legend className="sr-only">Choose one answer</legend>
            {(field ? choices[field] : question?.options)?.map((c) => {
              const checked = field
                ? setup[field] === c.value
                : answers[question.id] === c.value;
              return (
                <label
                  className={`answer ${checked ? "selected" : ""}`}
                  key={c.value}
                >
                  <input
                    type="radio"
                    name="answer"
                    checked={checked}
                    value={c.value}
                    onChange={() => select(c.value)}
                  />
                  <span>{"text" in c ? c.text : ""}</span>
                </label>
              );
            })}
          </fieldset>
          {field === "trend" && (
            <label>
              {setupPrompts.trendContext}
              <textarea
                value={setup.trendContext ?? ""}
                maxLength={1200}
                onChange={(e) =>
                  save({
                    ...workspace,
                    setup: { ...setup, trendContext: e.target.value },
                  })
                }
              />
            </label>
          )}
          <div className="toolbar">
            <button
              disabled={screen === 0}
              onClick={() => setScreen((n) => n - 1)}
            >
              Back
            </button>
            <button
              disabled={field ? !setup[field] : !answers[question?.id]}
              onClick={() =>
                screen === totalScreens - 1 ? finish() : setScreen((n) => n + 1)
              }
            >
              {screen === totalScreens - 1 ? "Generate report" : "Continue"}
            </button>
          </div>
          <p className="small">
            {questionProgress(
              requiredSetupFields.filter((f) => setup[f]).length +
                questionList.filter((q) => answers[q.id]).length,
            )}{" "}
            You can return to earlier screens to revise answers.
          </p>
        </section>
      ) : (
        report && (
          <>
            <div className="toolbar">
              <label>
                Frozen preview report
                <select
                  aria-label="Frozen preview report"
                  value={selectedRun}
                  onChange={(e) => setSelectedRun(Number(e.target.value))}
                >
                  {reports.map((r, i) => (
                    <option value={i} key={i}>
                      Report {i + 1} · {r.createdAt}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={async () => {
                  try {
                    const res = await fetch("/api/preview/pdf", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(report),
                    });
                    if (!res.ok) throw Error();
                    const url = URL.createObjectURL(await res.blob());
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "clarity-engine-preview.pdf";
                    a.click();
                    URL.revokeObjectURL(url);
                  } catch {
                    setError(
                      "Could not generate the PDF. Retry while the local preview server is running.",
                    );
                  }
                }}
              >
                Download report PDF
              </button>
            </div>
            <ReportView report={report} />
            <section className="card">
              <h2>Work session</h2>
              {report.workSession.map((prompt, i) => (
                <label key={prompt}>
                  {prompt}
                  <textarea
                    aria-label={`Work-session note ${i + 1}`}
                    value={workspace.notes[`${selectedRun}:work:${i}`] ?? ""}
                    onChange={(e) =>
                      save({
                        ...workspace,
                        notes: {
                          ...workspace.notes,
                          [`${selectedRun}:work:${i}`]: e.target.value,
                        },
                      })
                    }
                  />
                </label>
              ))}
            </section>
            <section className="card">
              <h2>Reviewer notes</h2>
              <p>
                Record wording changes, diagnosis concerns, and whether the
                first priority feels justified.
              </p>
              <textarea
                aria-label="Reviewer notes"
                value={workspace.notes[`${selectedRun}:review`] ?? ""}
                onChange={(e) =>
                  save({
                    ...workspace,
                    notes: {
                      ...workspace.notes,
                      [`${selectedRun}:review`]: e.target.value,
                    },
                  })
                }
              />
            </section>
          </>
        )
      )}
      <footer>
        {versions.questionnaire} · Local review only ·{" "}
        <a href="/review/index.html">Representative review pack</a>
      </footer>
    </main>
  );
}
if (import.meta.env.DEV)
  createRoot(document.getElementById("root")!).render(<App />);
