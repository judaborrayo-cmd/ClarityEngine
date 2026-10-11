import type { AuditEvent } from "@shared/marketing-clarity-audit/events";

export function trackAudit(
  event: AuditEvent,
  token?: string,
  questionId?: string,
) {
  void fetch(`/api/audit${token ? `/${token}` : ""}/events`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, ...(questionId ? { questionId } : {}) }),
  }).catch(() => {
    /* Analytics must never block saving or reporting. */
  });
}
