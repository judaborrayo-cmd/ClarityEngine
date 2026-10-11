export const auditEvents = [
  "sales_page_view",
  "checkout_start",
  "purchase_success",
  "audit_start",
  "section_start",
  "section_complete",
  "question_answered",
  "resume",
  "diagnostic_complete",
  "report_viewed",
  "report_downloaded",
  "work_session_downloaded",
  "work_together_clicked",
] as const;
export type AuditEvent = (typeof auditEvents)[number];
