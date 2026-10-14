import { onlineWorkSessionIntro } from "@/lib/assessment-copy";
import { workOpportunityTransition } from "@shared/marketing-clarity-audit/editorial-narrative";
import { reportLanguage, growthRoadmap } from "@shared/marketing-clarity-audit/customer-language";
import { NotebookPen, Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { auditRequest } from "@/lib/audit-api";
import type { FrozenAuditReport } from "@shared/marketing-clarity-audit/report";
import { workPrompts } from "@shared/marketing-clarity-audit/presentation";
import { sectionStyle } from "@shared/marketing-clarity-audit/sections";

export interface WorkSessionSaveState {
  ready: boolean;
  hasNotes: boolean;
  pending: boolean;
}

export default function AuditWorkSession({
  report,
  token,
  run,
  onSaveStateChange,
}: {
  report: FrozenAuditReport;
  token: string;
  run: number;
  onSaveStateChange?: (state: WorkSessionSaveState) => void;
}) {
  const [entries, setEntries] = useState<Record<string, string>>({});
  const values = useRef<Record<string, string>>({});
  const dirty = useRef(new Set<string>());
  const saving = useRef(new Set<string>());
  const failed = useRef(new Set<string>());
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Loading your working notes…");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const prompts = workPrompts(report);
  const road = growthRoadmap(report);
  const endpoint = `/${token}/work-session?run=${run}`;

  const ready = !loading && !error;
  const hasNotes = Object.values(entries).some(
    (value) => value.trim().length > 0,
  );
  const pending = dirty.current.size > 0 || saving.current.size > 0;
  useEffect(() => {
    onSaveStateChange?.({ ready: Boolean(ready), hasNotes, pending });
  }, [ready, hasNotes, pending, onSaveStateChange]);

  async function save(id: string) {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    if (saving.current.has(id) || !dirty.current.has(id)) return;
    saving.current.add(id);
    setStatus("Saving…");
    try {
      while (dirty.current.has(id)) {
        const value = values.current[id] ?? "";
        await auditRequest(
          `/${token}/work-session/${id}?run=${run}`,
          "PUT",
          { value },
          { keepalive: true },
        );
        if (values.current[id] === value) dirty.current.delete(id);
      }
      failed.current.delete(id);
      if (!failed.current.size) setError("");
    } catch (e) {
      failed.current.add(id);
      setError((e as Error).message);
    } finally {
      saving.current.delete(id);
      setStatus(
        failed.current.size
          ? "Not saved"
          : dirty.current.size
            ? "Saving…"
            : "Saved",
      );
    }
  }
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    auditRequest<{ entries: Record<string, string> }>(endpoint)
      .then((result) => {
        if (!active) return;
        values.current = result.entries;
        setEntries(result.entries);
        setStatus("Saved");
        setLoading(false);
      })
      .catch((e) => {
        if (active) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [endpoint, attempt]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty.current.size || saving.current.size) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    const retryOnline = () =>
      dirty.current.forEach((id) => {
        void save(id);
      });
    window.addEventListener("online", retryOnline);
    window.addEventListener("beforeunload", warn);
    return () => {
      window.removeEventListener("beforeunload", warn);
      window.removeEventListener("online", retryOnline);
      timers.current.forEach((timer) => clearTimeout(timer));
      dirty.current.forEach((id) => {
        void save(id);
      });
    };
  }, [token, run]);
  function edit(id: string, value: string) {
    values.current = { ...values.current, [id]: value };
    setEntries(values.current);
    dirty.current.add(id);
    setStatus("Saving…");
    const previous = timers.current.get(id);
    if (previous) clearTimeout(previous);
    timers.current.set(
      id,
      setTimeout(() => {
        void save(id);
      }, 700),
    );
  }
  return (
    <section
      id="clarity-work-session"
      className="audit-block"
      style={sectionStyle(report.diagnosis.primary?.sectionId)}
    >
      <div className="work-session-heading">
        <div className="work-session-header-layout">
          <div>
            <p className="report-eyebrow">Your private Clarity workspace</p>
            <h2>Your Clarity Work Session</h2>
            <h3>Turn your opportunities into action.</h3>
            <p>{onlineWorkSessionIntro}</p>
          </div>
          <aside
            className="work-session-time-cue"
            aria-label="Suggested focus time: 20 minutes"
          >
            <div className="work-session-cue-icons" aria-hidden="true">
              <NotebookPen size={26} strokeWidth={1.6} />
              <Timer size={23} strokeWidth={1.6} />
            </div>
            <strong>20 min</strong>
          </aside>
        </div>
        <p className="work-session-time-guidance">
          Set aside about 20 minutes. Start with what you know; note what you still need to find out.
        </p>
      </div>
      <p className="report-prose">
        Your responses save automatically to this private Clarity workspace. You
        can return using your secure results link.
      </p>
      <p className="report-prose">
        These are your working notes. They save separately for Report {run} and
        never change your diagnostic scores.
      </p>
      <p className="mt-3 text-sm">
        Prefer to work offline?{" "}
        <a href="#clarity-toolkit" className="underline">
          Download or print your Clarity Work Session PDF.
        </a>{" "}
        Notes in a downloaded or printed PDF do not autosave.
      </p>
      <p role="status" aria-live="polite" className="work-save-status">
        {status}
      </p>
      {error && (
        <div
          role="alert"
          className="my-3 rounded-xl border border-amber-200 bg-amber-50 p-4"
        >
          <p>
            {dirty.current.size
              ? "Your latest changes haven’t saved yet. Your text is still here. Please retry before leaving this page."
              : "We couldn’t load your saved notes. Please retry before editing."}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              if (dirty.current.size)
                dirty.current.forEach((id) => {
                  void save(id);
                });
              else setAttempt((n) => n + 1);
            }}
          >
            Retry Work Session
          </Button>
        </div>
      )}
      {(["primary", "secondary", "decision", "legacy"] as const).map(
        (group) => {
          const visible = prompts.filter((p) =>
            group === "legacy"
              ? p.legacy && Boolean(entries[p.id]?.trim())
              : !p.legacy && p.group === group,
          );
          if (!visible.length) return null;
          const content = (
            <div className="mt-4 space-y-4">
              {visible.map((prompt, index) => (
                <div
                  key={prompt.id}
                  className={`work-textarea-card rounded-xl border ${group === "decision" ? "p-4" : "p-6"}`}
                  style={{
                    ...sectionStyle(prompt.sectionId),
                    borderColor: "var(--section-border)",
                  }}
                >
                  {prompt.legacy && (
                    <p className="mb-2 text-xs font-semibold text-gray-600">
                      Previously saved response · original question
                    </p>
                  )}
                  {prompt.group === "secondary" && (
                    <p className="section-label text-xs font-semibold">
                      Your Next Opportunity
                    </p>
                  )}
                  <span className="prompt-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <label
                    htmlFor={`work-${run}-${prompt.id}`}
                    className="block font-medium"
                  >
                    {prompt.label}
                  </label>
                  {prompt.helper && (
                    <p
                      id={`work-helper-${run}-${prompt.id}`}
                      className="mt-2 text-sm leading-relaxed text-gray-600"
                    >
                      {prompt.helper}
                    </p>
                  )}
                  <textarea
                    id={`work-${run}-${prompt.id}`}
                    aria-describedby={
                      prompt.helper
                        ? `work-helper-${run}-${prompt.id}`
                        : undefined
                    }
                    rows={group === "decision" ? 2 : 4}
                    maxLength={4000}
                    value={entries[prompt.id] ?? ""}
                    disabled={
                      loading || (Boolean(error) && !dirty.current.size)
                    }
                    onChange={(event) => edit(prompt.id, event.target.value)}
                    onBlur={() => {
                      void save(prompt.id);
                    }}
                    className={`mt-3 block ${group === "decision" ? "min-h-20" : "min-h-28"} w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-base text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                    placeholder="Write your answer and any supporting evidence..."
                  />
                </div>
              ))}
            </div>
          );
          return group === "legacy" ? (
            <details
              key={group}
              className="mt-6 rounded-xl border border-gray-200 p-4"
            >
              <summary className="cursor-pointer font-medium">
                Previously saved responses
              </summary>
              <p className="mt-2 text-sm text-gray-600">
                Your earlier notes are preserved under their original questions.
              </p>
              {content}
            </details>
          ) : (
            <section
              key={group}
              className={
                group === "decision"
                  ? "mt-8 rounded-xl border border-gray-200 p-5"
                  : "mt-6"
              }
            >
              <h3 className="section-label font-semibold">
                {group === "primary"
                  ? "Work Through Your First Opportunity"
                  : group === "secondary"
                    ? `${reportLanguage.secondary}: ${road.nextTitle}`
                    : "Your decision"}
              </h3>
              {group === "secondary" && <p>{workOpportunityTransition(report)}</p>}
              {content}
            </section>
          );
        },
      )}
    </section>
  );
}
