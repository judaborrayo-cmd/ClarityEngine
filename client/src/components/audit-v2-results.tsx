import { customerCopy } from "@shared/marketing-clarity-audit/v2/customer-copy";
import { useEffect, useState, useRef } from "react";
import type { CustomerV2Report } from "@shared/marketing-clarity-audit/v2/customer-report";
import { ReportView } from "./audit-v2-report";
import { auditRequest } from "@/lib/audit-api";
import { Button } from "@/components/ui/button";
import AuditNextMoves from "./audit-next-moves";
import { sectionStyle } from "@shared/marketing-clarity-audit/sections";
import "../pages/audit-results.css";
export function AuditV2Results({
  report,
  token,
  info,
}: {
  report: CustomerV2Report;
  token: string;
  info: {
    runNumber: number;
    activeRun: number;
    completedReports: number[];
    retakeAvailable: boolean;
  };
}) {
  const [notes, setNotes] = useState<Record<string, string>>({}),
    [status, setStatus] = useState("Loading saved work…"),
    [error, setError] = useState("");
  const [checklistPending, setChecklistPending] = useState(false);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(0);
  const dirty = useRef(false);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  const run = `?run=${info.runNumber}`;
  useEffect(() => {
    setReady(false);
    setNotes({});
    dirty.current = false;
    let active = true;
    auditRequest<{ entries: Record<string, string> }>(
      `/${token}/work-session${run}`,
    )
      .then((r) => {
        if (active) {
          setNotes(r.entries);
          setReady(true);
          setStatus("Saved work loaded.");
        }
      })
      .catch(() => {
        if (active)
          setError("Unable to load your notes. Please reload before editing.");
      });
    return () => {
      active = false;
    };
  }, [token, run]);
  async function save(id: string, value: string) {
    setStatus("Saving…");
    setPending((n) => n + 1);
    setError("");
    try {
      await auditRequest(`/${token}/work-session/${id}${run}`, "PUT", {
        value,
      });
      setStatus("Saved.");
      dirty.current = false;
    } catch {
      setError("Notes were not saved. Please retry before leaving.");
    } finally {
      setPending((n) => n - 1);
    }
  }
  async function retake() {
    if (
      !window.confirm(
        "Start your included retake? Your first report stays available.",
      )
    )
      return;
    try {
      await auditRequest(`/${token}/retake`, "POST");
      window.location.assign(`/audit/resume/${token}`);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <main className="report-workspace mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <ReportView
        report={report}
        companyName={report.context.companyName}
        prepared={report.context}
        nextMoves={
          <AuditNextMoves
            moves={report.recommendations}
            token={token}
            run={info.runNumber}
            onPendingChange={setChecklistPending}
          />
        }
        utilities={
          <section className="report-navigation my-6 print:hidden">
            <p>
              {customerCopy.completion} · Report {info.runNumber} · Completed{" "}
              {new Date(report.createdAt).toLocaleDateString()}
            </p>
            <div className="my-4 flex flex-wrap gap-3">
              {info.completedReports.map((n) => (
                <Button
                  key={n}
                  variant={n === info.runNumber ? "default" : "outline"}
                  asChild
                >
                  <a href={`/audit/results/${token}?run=${n}`}>Report {n}</a>
                </Button>
              ))}
              <Button variant="outline" asChild>
                <a href={`/api/audit/${token}/download/report${run}`}>
                  Download report PDF
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={`/api/audit/${token}/download/work-session-completed${run}`}
                >
                  Download report and saved work
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  navigator.clipboard
                    .writeText(window.location.href)
                    .catch(() =>
                      setError(
                        "Copy this page’s address to keep your private link.",
                      ),
                    )
                }
              >
                Copy Private Link
              </Button>
            </div>
            {info.activeRun > info.runNumber &&
              !info.completedReports.includes(info.activeRun) && (
                <Button asChild>
                  <a href={`/audit/resume/${token}`}>
                    Resume your included retake
                  </a>
                </Button>
              )}
            {info.retakeAvailable && (
              <div className="report-utilities mt-4">
                <section>
                  <h2>1 Included Retake</h2>
                  <p>
                    Your purchase includes one complete retake. Your original
                    report and notes remain available.
                  </p>
                  <Button
                    className="mt-3"
                    disabled={pending > 0 || dirty.current || checklistPending}
                    onClick={retake}
                  >
                    Start My Included Retake
                  </Button>
                </section>
              </div>
            )}
          </section>
        }
      />
      <div className="audit-report">
        <section
          id="clarity-work-session"
          className="audit-block"
          style={sectionStyle(report.diagnosis.primary?.sectionId)}
        >
          <div className="work-session-heading">
            <p className="report-eyebrow">Your next step</p>
            <h2>Your Clarity Work Session</h2>
            <p>
              Use these prompts to connect your opportunity to the evidence in
              your business.
            </p>
          </div>
          <p role="status">{status}</p>
          {report.workSession.map((p, i) => (
            <div className="work-textarea-card my-5" key={i}>
              <label className="block font-semibold">
                {p}
                <textarea
                  className="mt-4 block min-h-32 w-full border"
                  aria-label={p}
                  maxLength={4000}
                  disabled={!ready || pending > 0}
                  value={notes[`work-${i + 1}`] ?? ""}
                  onChange={(e) => {
                    dirty.current = true;
                    setNotes((n) => ({
                      ...n,
                      [`work-${i + 1}`]: e.target.value,
                    }));
                  }}
                  onBlur={(e) => save(`work-${i + 1}`, e.target.value)}
                />
              </label>
              <Button
                className="mt-3"
                variant="outline"
                disabled={!ready || pending > 0}
                onClick={() =>
                  save(`work-${i + 1}`, notes[`work-${i + 1}`] ?? "")
                }
              >
                Save response
              </Button>
            </div>
          ))}
        </section>
      </div>
      <section id="clarity-toolkit" className="my-10 rounded-2xl border border-violet-200 bg-violet-50/50 p-5 sm:p-8 print:hidden">
        <h2 className="text-2xl font-bold">Your Clarity Toolkit</h2>
        <p className="mt-2 text-sm text-gray-600">Your report and personalized work session are included with your purchase.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-xl font-semibold">Your High Growth Opportunities</h3>
            <p className="my-4 text-sm">Your six growth levers, priorities, first three moves, progress measures and four-week plan.</p>
            <Button asChild><a href={`/api/audit/${token}/download/report${run}`}>Download Your Report PDF</a></Button>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-xl font-semibold">Clarity Work Session</h3>
            <p className="my-4 text-sm">Work through your personalized prompts online or download them to write offline.</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild><a href={`/api/audit/${token}/download/work-session${run}`}>Download Blank Work Session PDF</a></Button>
              <Button variant="outline" disabled={!ready || pending > 0 || dirty.current || checklistPending} onClick={() => window.location.assign(`/api/audit/${token}/download/work-session-completed${run}`)}>Download My Saved Work</Button>
            </div>
            <p className="mt-3 text-xs text-gray-600">PDF downloads include your report. Save your latest responses before downloading your completed work.</p>
          </div>
        </div>
      </section>
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
