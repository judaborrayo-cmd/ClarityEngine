import { useEffect, useRef, useState } from "react";
import { auditRequest } from "@/lib/audit-api";
import {
  recommendationsPresentation,
  recommendationWhyCritical,
} from "@shared/marketing-clarity-audit/presentation";
import type { FrozenAuditReport } from "@shared/marketing-clarity-audit/report";

export default function AuditNextMoves({
  report,
  token,
  run,
  onPendingChange,
}: {
  report: FrozenAuditReport;
  token: string;
  run: number;
  onPendingChange?: (pending: boolean) => void;
}) {
  const [values, setValues] = useState<Record<string, boolean>>({});
  const latest = useRef<Record<string, boolean>>({});
  const dirty = useRef(new Set<string>());
  const saving = useRef(new Set<string>());
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Loading your checklist…");
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    auditRequest<{ entries: Record<string, boolean> }>(
      `/${token}/checklist?run=${run}`,
    )
      .then(({ entries }) => {
        if (!active) return;
        latest.current = entries;
        setValues(entries);
        setReady(true);
        setFailed(false);
        setStatus("Checklist saved automatically");
      })
      .catch(() => {
        if (active) {
          setFailed(true);
          setStatus("We couldn’t load your checklist. Please retry.");
        }
      });
    return () => {
      active = false;
    };
  }, [token, run, attempt]);
  async function save(id: string) {
    if (saving.current.has(id)) return;
    saving.current.add(id);
    onPendingChange?.(true);
    setStatus("Saving checklist…");
    try {
      while (dirty.current.has(id)) {
        const value = latest.current[id];
        await auditRequest(
          `/${token}/checklist/${encodeURIComponent(id)}?run=${run}`,
          "PUT",
          { value },
          { keepalive: true },
        );
        if (latest.current[id] === value) dirty.current.delete(id);
      }
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      saving.current.delete(id);
      onPendingChange?.(dirty.current.size > 0 || saving.current.size > 0);
      if (dirty.current.size && !saving.current.size) setFailed(true);
      setStatus(
        dirty.current.size
          ? "Your latest checklist changes haven’t saved. Please retry before leaving."
          : "Checklist saved automatically",
      );
    }
  }
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty.current.size) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  return (
    <>
      <p role="status" className="checklist-status">
        {status}
      </p>
      {failed && (
        <button
          type="button"
          className="underline"
          onClick={() => {
            if (!ready) setAttempt((n) => n + 1);
            else dirty.current.forEach((id) => void save(id));
          }}
        >
          Retry checklist
        </button>
      )}
      <div className="moves-grid">
        {recommendationsPresentation(report).map((move, index) => (
          <div className="recommendation checklist-move" key={move.id}>
            <label className="move-check">
              <input
                type="checkbox"
                disabled={!ready}
                checked={values[move.id] ?? false}
                aria-label={`Mark Move ${index + 1} complete: ${move.title}`}
                onChange={(event) => {
                  latest.current = {
                    ...latest.current,
                    [move.id]: event.target.checked,
                  };
                  setValues(latest.current);
                  dirty.current.add(move.id);
                  void save(move.id);
                }}
              />
              <span className="move-number">Move {index + 1}</span>
            </label>
            <h3>{move.title}</h3>
            <h4>What to do</h4>
            <p>{move.whatToDo}</p>
            <h4>Done when</h4>
            <p>{move.doneWhen}</p>
            <details>
              <summary>Why this is critical</summary>
              <p>{recommendationWhyCritical(move)}</p>
            </details>
          </div>
        ))}
      </div>
    </>
  );
}
