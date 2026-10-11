import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auditRequest } from "@/lib/audit-api";
import { trackAudit } from "@/lib/audit-events";
import AuditAnswerReview from "@/components/audit-answer-review";
import type { Answers } from "@shared/marketing-clarity-audit/scoring";
import type { WorkSessionSaveState } from "@/components/audit-work-session";
import AuditNextMoves from "@/components/audit-next-moves";
import AuditWorkSession from "@/components/audit-work-session";
import { AuditReportView } from "@shared/marketing-clarity-audit/report-view";
import type { FrozenAuditReport } from "@shared/marketing-clarity-audit/report";

export default function AuditResults() {
  const { token } = useParams();
  const [params, setParams] = useSearchParams();
  const selectedRun = params.get("run");
  const navigate = useNavigate();
  const [runInfo, setRunInfo] = useState<{
    localQa?: boolean;
    runNumber: number;
    activeRun: number;
    completedReports: number[];
    retakeAvailable: boolean;
  }>();
  const [frozenAnswers, setFrozenAnswers] = useState<Answers>({});
  const [copyStatus, setCopyStatus] = useState("");
  const [checklistPending, setChecklistPending] = useState(false);
  const [workState, setWorkState] = useState<WorkSessionSaveState>({
    ready: false,
    hasNotes: false,
    pending: false,
  });
  const [report, setReport] = useState<FrozenAuditReport>();
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (report && token) trackAudit("report_viewed", token);
  }, [report, token]);
  useEffect(() => {
    let active = true;
    setError("");
    setReport(undefined);
    setFrozenAnswers({});
    setWorkState({ ready: false, hasNotes: false, pending: false });
    setRunInfo(undefined);
    auditRequest<{
      report: FrozenAuditReport;
      frozenAnswers: Answers;
      localQa?: boolean;
      runNumber: number;
      activeRun: number;
      completedReports: number[];
      retakeAvailable: boolean;
    }>(`/${token}/report${selectedRun ? `?run=${selectedRun}` : ""}`)
      .then((result) => {
        if (active) {
          setReport(result.report);
          setFrozenAnswers(result.frozenAnswers);
          setRunInfo(result);
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [token, attempt, selectedRun]);
  async function copyPrivateLink() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/audit/results/${token}`,
      );
      setCopyStatus("Private link copied. Keep it somewhere safe.");
    } catch {
      setCopyStatus(
        "Copy this page’s address from your browser’s address bar and keep it somewhere safe.",
      );
    }
  }
  async function download(kind: string) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        `/api/audit/${token}/download/${kind}${runInfo ? `?run=${runInfo.runNumber}` : ""}`,
      );
      if (!response.ok)
        throw new Error(
          "The download is temporarily unavailable. Your web report is still available. Please retry.",
        );
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = `marketing-clarity-${kind}-${runInfo?.runNumber ?? 1}.pdf`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      trackAudit(
        kind === "report" ? "report_downloaded" : "work_session_downloaded",
        token,
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function startRetake() {
    setBusy(true);
    setError("");
    try {
      await auditRequest(`/${token}/retake`, "POST", {});
      navigate(`/audit/resume/${token}`);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {runInfo?.localQa && (
        <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold">
          LOCAL QA TEST REPORT — this workspace does not consume the original
          purchase’s included retake.
        </p>
      )}
      {error && (
        <div role="alert" className="mb-5 rounded-xl bg-red-50 p-4">
          <p>{error}</p>
          {!report && (
            <>
              <Button onClick={() => setAttempt((n) => n + 1)}>Retry</Button>
              <Link className="ml-3 underline" to={`/audit/resume/${token}`}>
                Return to Get Clarity Assessment
              </Link>
            </>
          )}
        </div>
      )}
      {!report && !error && <p role="status">Loading your report…</p>}
      {report && (
        <AuditReportView
          companyLogo={
            token
              ? {
                  src: `/api/audit/${token}/company-logo`,
                  alt: `${report.context.companyName} logo`,
                }
              : undefined
          }
          afterHero={
            <>
              <div className="report-navigation mb-4 print:hidden">
                <h2 className="text-sm font-semibold">
                  Your Get Clarity Assessment results
                  {runInfo ? ` · Report ${runInfo.runNumber}` : ""}
                </h2>
                {report && (
                  <a
                    href="#audit-answer-review"
                    className="mt-3 inline-block text-sm font-medium underline"
                  >
                    Review My Assessment Answers
                  </a>
                )}
                {runInfo && runInfo.completedReports.length > 1 && (
                  <div
                    role="group"
                    className="mt-3 flex gap-3"
                    aria-label="Your completed reports"
                  >
                    {runInfo.completedReports.map((run) => (
                      <Button
                        key={run}
                        variant={
                          run === runInfo.runNumber ? "default" : "outline"
                        }
                        disabled={busy || workState.pending || checklistPending}
                        aria-pressed={run === runInfo.runNumber}
                        onClick={() => setParams({ run: String(run) })}
                      >
                        Report {run}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <div className="report-utilities grid gap-4 md:grid-cols-2">
                {" "}
                {report && (
                  <section
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5 print:hidden"
                    aria-labelledby="private-results-link-title"
                  >
                    <h2
                      id="private-results-link-title"
                      className="font-semibold"
                    >
                      Save your private results link
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed">
                      This private link gives you continued access to your
                      Get Clarity Assessment Report, saved Work Session notes, and
                      included retake. Keep it somewhere safe.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-3 border-violet-200 bg-white text-primary hover:bg-violet-50 hover:text-primary"
                      onClick={copyPrivateLink}
                    >
                      Copy private link
                    </Button>
                    <p className="mt-2 text-xs text-gray-600">
                      You can also bookmark this page in your browser. No login
                      is required.
                    </p>
                    {copyStatus && (
                      <p role="status" className="mt-2 text-sm">
                        {copyStatus}
                      </p>
                    )}
                  </section>
                )}
                {report && runInfo && !runInfo.localQa && (
                  <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 print:hidden">
                    {runInfo.retakeAvailable ? (
                      <>
                        <h2 className="font-semibold">1 Included Retake</h2>
                        <p className="mt-2 break-words text-sm">
                          Want to reconsider your answers? You can run the
                          diagnostic one more time for{" "}
                          {report.context.companyName?.trim() ||
                            "your business"}
                          . Your original report will remain available.
                        </p>
                        <p className="mt-3 text-sm font-semibold">
                          1 retake remaining
                        </p>
                        <Button
                          className="mt-4"
                          disabled={
                            busy || workState.pending || checklistPending
                          }
                          onClick={startRetake}
                        >
                          Start My Included Retake
                        </Button>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
                          You don’t have to use your retake now. Save it for
                          later and reassess your business after you’ve had time
                          to apply these recommendations. Many businesses may
                          find it useful to revisit the diagnostic in 60–90
                          days.
                        </p>
                      </>
                    ) : runInfo.completedReports.length < 2 ? (
                      <>
                        <h2 className="font-semibold">
                          Your included retake is in progress
                        </h2>
                        <Link
                          className="mt-2 inline-block underline"
                          to={`/audit/resume/${token}`}
                          aria-disabled={workState.pending || checklistPending}
                          onClick={(event) => {
                            if (workState.pending || checklistPending)
                              event.preventDefault();
                          }}
                        >
                          Continue your retake
                        </Link>
                      </>
                    ) : (
                      <>
                        <h2 className="font-semibold">
                          Both reports are complete
                        </h2>
                        <p className="mt-2 text-sm">
                          Retake used · Report 1 and Report 2 remain available
                        </p>
                      </>
                    )}
                  </section>
                )}
              </div>
            </>
          }
          nextMoves={
            token && runInfo ? (
              <AuditNextMoves
                key={`moves-${token}-${runInfo.runNumber}`}
                report={report}
                token={token}
                run={runInfo.runNumber}
                onPendingChange={setChecklistPending}
              />
            ) : undefined
          }
          report={report}
          workSession={
            token && runInfo ? (
              <AuditWorkSession
                key={`${token}:${runInfo.runNumber}`}
                report={report}
                token={token}
                run={runInfo.runNumber}
                onSaveStateChange={setWorkState}
              />
            ) : undefined
          }
          onWorkTogether={() => trackAudit("work_together_clicked", token)}
        />
      )}
      {report && runInfo && (
        <AuditAnswerReview
          key={runInfo.runNumber}
          answers={frozenAnswers}
          run={runInfo.runNumber}
        />
      )}
      {report && (
        <section
          id="clarity-toolkit"
          className="my-10 rounded-2xl border border-violet-200 bg-violet-50/50 p-5 sm:p-8 print:hidden"
        >
          <h2 className="text-2xl font-bold">Your Clarity Toolkit</h2>
          <p className="mt-2 text-sm text-gray-600">
            Two distinct resources, included with your purchase.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Your diagnosis
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                Get Clarity Assessment Report
              </h3>
              <p className="my-4 text-sm leading-relaxed">
                Your diagnosis, scorecard, next three moves, priorities to
                avoid, real-world example, KPI guidance, and 30-day plan.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#marketing-clarity-report"
                  className="inline-flex min-h-10 items-center rounded-lg border border-gray-300 px-4 text-sm font-medium"
                >
                  Open Report
                </a>
                <Button disabled={busy} onClick={() => download("report")}>
                  Download Get Clarity Assessment Report PDF
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                Your strategic worksheet
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                Clarity Work Session
              </h3>
              <p className="my-4 text-sm leading-relaxed">
                Guided strategic questions and a decision worksheet for working
                through your primary constraint.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#clarity-work-session"
                  className="inline-flex min-h-10 items-center rounded-lg border border-gray-300 px-4 text-sm font-medium"
                >
                  Work Online
                </a>
                <Button
                  variant="outline"
                  disabled={busy}
                  onClick={() => download("work-session")}
                >
                  Download Blank Work Session PDF
                </Button>
                <Button
                  variant="outline"
                  disabled={
                    busy ||
                    !workState.ready ||
                    !workState.hasNotes ||
                    workState.pending ||
                    checklistPending
                  }
                  onClick={() => download("work-session-completed")}
                >
                  Download My Completed Work Session PDF
                </Button>
              </div>
              <p className="mt-3 text-xs text-gray-600">
                {workState.pending || checklistPending
                  ? "Wait for your latest changes to save before downloading your responses."
                  : workState.hasNotes
                    ? "The completed PDF includes saved responses for this report. Unanswered prompts retain writing space."
                    : "Your completed PDF becomes available once you save a Work Session response."}{" "}
                Open either PDF to print or work offline.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
