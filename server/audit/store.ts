import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { isLocalQaCheckout, localQaEnabled } from "./local-qa";
import { randomUUID } from "node:crypto";
import type { Answers } from "../../shared/marketing-clarity-audit/scoring";
import { questionnaire } from "../../shared/marketing-clarity-audit/scoring";
import type { CustomerContext } from "../../shared/marketing-clarity-audit/context";
import {
  createFrozenReport,
  type FrozenAuditReport,
} from "../../shared/marketing-clarity-audit/report";
import type { AuditEvent } from "../../shared/marketing-clarity-audit/events";

neonConfig.webSocketConstructor = ws;
export interface AuditRecord {
  id: string;
  checkout_id: string;
  claim_hash: string;
  token_hash: string;
  payment_verified: boolean;
  context: CustomerContext | null;
  answers: Answers;
  teaching_notes: string[];
  report: FrozenAuditReport | null;
  saved_at: Date;
  run_number: 1 | 2;
  reports: { number: 1 | 2; report: FrozenAuditReport; answers: Answers }[];
}
export interface AuditStore {
  companyLogo?(
    hash: string,
  ): Promise<{ png: Buffer | null; checkedAt: Date } | undefined>;
  saveCompanyLogo?(
    hash: string,
    website: string,
    png: Buffer | null,
  ): Promise<void>;
  initiate(
    checkoutId: string,
    claimHash: string,
    tokenHash: string,
  ): Promise<void>;
  verify(
    checkoutId: string,
    claimHash?: string,
  ): Promise<AuditRecord | undefined>;
  read(hash: string): Promise<AuditRecord | undefined>;
  saveContext(hash: string, context: CustomerContext): Promise<boolean>;
  saveAnswer(hash: string, id: string, value: string): Promise<boolean>;
  complete(hash: string): Promise<FrozenAuditReport>;
  startRetake(hash: string): Promise<boolean>;
  checklist(hash: string, run: number): Promise<Record<string, boolean>>;
  saveChecklist(
    hash: string,
    run: number,
    id: string,
    value: boolean,
  ): Promise<boolean>;
  workNotes(hash: string, run: number): Promise<Record<string, string>>;
  saveWorkNote(
    hash: string,
    run: number,
    id: string,
    value: string,
  ): Promise<boolean>;
  paymentEvent(id: string, checkoutId: string): Promise<void>;
  rateLimit(key: string): Promise<boolean>;
  event(
    event: AuditEvent,
    sessionId?: string,
    questionId?: string,
  ): Promise<void>;
}

export interface AuditDatabase {
  query(
    text: string,
    parameters?: unknown[],
  ): Promise<{ rows: any[]; rowCount: number | null }>;
  connect(): Promise<{ query: AuditDatabase["query"]; release(): void }>;
}

export class PostgresAuditStore implements AuditStore {
  private pool: AuditDatabase;
  constructor(url: string, database?: AuditDatabase) {
    this.pool = database ?? new Pool({ connectionString: url });
  }
  async initiate(checkoutId: string, claimHash: string, hash: string) {
    await this.pool.query(
      "INSERT INTO marketing_audit_sessions(id, checkout_id, claim_hash, token_hash) VALUES($1,$2,$3,$4) ON CONFLICT(checkout_id) DO NOTHING",
      [randomUUID(), checkoutId, claimHash, hash],
    );
  }
  async verify(checkoutId: string, claimHash?: string) {
    const result = await this.pool.query(
      "UPDATE marketing_audit_sessions SET payment_verified=true WHERE checkout_id=$1 AND ($2::text IS NULL OR claim_hash=$2) RETURNING *",
      [checkoutId, claimHash ?? null],
    );
    return result.rows[0] as AuditRecord | undefined;
  }
  async read(hash: string) {
    const original = (
      await this.pool.query(
        "SELECT s.*, r.id AS retake_id, r.context AS retake_context, r.answers AS retake_answers, r.teaching_notes AS retake_notes, r.report AS retake_report, r.saved_at AS retake_saved_at FROM marketing_audit_sessions s LEFT JOIN marketing_audit_retakes r ON r.session_id=s.id WHERE s.token_hash=$1 AND s.payment_verified=true",
        [hash],
      )
    ).rows[0];
    if (
      !original ||
      (isLocalQaCheckout(original.checkout_id) && !localQaEnabled())
    )
      return undefined;
    const retake = original.retake_id
      ? {
          context: original.retake_context,
          answers: original.retake_answers,
          teaching_notes: original.retake_notes,
          report: original.retake_report,
          saved_at: original.retake_saved_at,
        }
      : undefined;
    const reports: AuditRecord["reports"] = [];
    if (original.report)
      reports.push({
        number: 1,
        report: original.report,
        answers: structuredClone(original.answers),
      });
    if (retake?.report)
      reports.push({
        number: 2,
        report: retake.report,
        answers: structuredClone(retake.answers),
      });
    return {
      ...original,
      ...(retake
        ? {
            context: retake.context,
            answers: retake.answers,
            teaching_notes: retake.teaching_notes,
            report: retake.report,
            saved_at: retake.saved_at,
          }
        : {}),
      run_number: retake ? 2 : 1,
      reports,
    } as AuditRecord;
  }
  async startRetake(hash: string) {
    const connection = await this.pool.connect();
    try {
      await connection.query("BEGIN");
      const original = (
        await connection.query(
          "SELECT * FROM marketing_audit_sessions WHERE token_hash=$1 AND payment_verified=true FOR UPDATE",
          [hash],
        )
      ).rows[0];
      if (!original?.report) {
        await connection.query("COMMIT");
        return false;
      }
      await connection.query(
        "INSERT INTO marketing_audit_retakes(id,session_id,context) VALUES($1,$2,$3::jsonb) ON CONFLICT(session_id) DO NOTHING",
        [randomUUID(), original.id, JSON.stringify(original.context)],
      );
      const retake = (
        await connection.query(
          "SELECT report FROM marketing_audit_retakes WHERE session_id=$1",
          [original.id],
        )
      ).rows[0];
      await connection.query("COMMIT");
      return !retake.report;
    } catch (error) {
      await connection.query("ROLLBACK");
      throw error;
    } finally {
      connection.release();
    }
  }
  async saveContext(hash: string, context: CustomerContext) {
    const row = await this.read(hash);
    if (
      row &&
      isLocalQaCheckout(row.checkout_id) &&
      ["name", "email", "companyName", "websiteUrl"].some(
        (key) =>
          context[key as keyof CustomerContext] !==
          row.context?.[key as keyof CustomerContext],
      )
    )
      return false;
    if (row?.run_number === 2) {
      const original = row.reports[0].report.context;
      if (
        ["name", "email", "companyName", "websiteUrl"].some(
          (key) =>
            context[key as keyof CustomerContext] !==
            original[key as keyof CustomerContext],
        )
      )
        return false;
      return (
        (
          await this.pool.query(
            "UPDATE marketing_audit_retakes SET context=$2::jsonb,saved_at=now() WHERE session_id=$1 AND report IS NULL",
            [row.id, JSON.stringify(context)],
          )
        ).rowCount === 1
      );
    }
    const result = await this.pool.query(
      "UPDATE marketing_audit_sessions SET context=$2::jsonb, saved_at=now() WHERE token_hash=$1 AND payment_verified=true AND report IS NULL",
      [hash, JSON.stringify(context)],
    );
    return result.rowCount === 1;
  }
  async saveAnswer(hash: string, id: string, value: string) {
    const hasInsight =
      questionnaire.questions.some((q) => q.id === id && "teachingNote" in q) &&
      ["D", "E"].includes(value);
    const row = await this.read(hash);
    if (row?.run_number === 2) {
      return (
        (
          await this.pool.query(
            "UPDATE marketing_audit_retakes SET answers=jsonb_set(answers, ARRAY[$2::text], to_jsonb($3::text)), teaching_notes=CASE WHEN $4::boolean AND jsonb_array_length(teaching_notes)<10 AND NOT (teaching_notes ? $2::text) THEN teaching_notes || to_jsonb($2::text) ELSE teaching_notes END, saved_at=now() WHERE session_id=$1 AND report IS NULL",
            [row.id, id, value, hasInsight],
          )
        ).rowCount === 1
      );
    }
    const result = await this.pool.query(
      "UPDATE marketing_audit_sessions SET answers=jsonb_set(answers, ARRAY[$2::text], to_jsonb($3::text)), teaching_notes=CASE WHEN $4::boolean AND jsonb_array_length(teaching_notes)<10 AND NOT (teaching_notes ? $2::text) THEN teaching_notes || to_jsonb($2::text) ELSE teaching_notes END, saved_at=now() WHERE token_hash=$1 AND payment_verified=true AND context IS NOT NULL AND report IS NULL",
      [hash, id, value, hasInsight],
    );
    return result.rowCount === 1;
  }
  async complete(hash: string) {
    const connection = await this.pool.connect();
    try {
      await connection.query("BEGIN");
      const original = (
        await connection.query(
          "SELECT * FROM marketing_audit_sessions WHERE token_hash=$1 AND payment_verified=true FOR UPDATE",
          [hash],
        )
      ).rows[0] as AuditRecord | undefined;
      if (!original) throw new Error("Audit not found");
      const retake = (
        await connection.query(
          "SELECT * FROM marketing_audit_retakes WHERE session_id=$1 FOR UPDATE",
          [original.id],
        )
      ).rows[0] as AuditRecord | undefined;
      const row = retake ?? original;
      const runNumber = retake ? 2 : 1;
      if (row.report) {
        await connection.query("COMMIT");
        return row.report;
      }
      const report = createFrozenReport(row.answers, row.context);
      const notification = {
        ...report.context,
        overallScore: report.diagnosis.overallScore,
        primaryConstraint: report.diagnosis.primary?.sectionId,
        secondaryConstraint: report.diagnosis.secondary?.sectionId,
        confidence: report.diagnosis.confidence.level,
        reportId: row.id,
        runNumber,
      };
      await connection.query(
        `UPDATE ${retake ? "marketing_audit_retakes" : "marketing_audit_sessions"} SET report=$2::jsonb, completed_at=now(), saved_at=now() WHERE id=$1`,
        [row.id, JSON.stringify(report)],
      );
      if (!isLocalQaCheckout(original.checkout_id))
        await connection.query(
          "INSERT INTO marketing_audit_notifications(session_id,payload,run_number) VALUES($1,$2::jsonb,$3) ON CONFLICT DO NOTHING",
          [original.id, JSON.stringify(notification), runNumber],
        );
      await connection.query(
        "INSERT INTO marketing_audit_events(id,session_id,event) VALUES($1,$2,$3)",
        [randomUUID(), original.id, "diagnostic_complete"],
      );
      await connection.query("COMMIT");
      return report;
    } catch (error) {
      await connection.query("ROLLBACK");
      throw error;
    } finally {
      connection.release();
    }
  }
  async checklist(hash: string, run: number) {
    const result = await this.pool.query(
      "SELECT n.entry_id,n.value FROM marketing_audit_checklist n JOIN marketing_audit_sessions s ON s.id=n.session_id WHERE s.token_hash=$1 AND s.payment_verified=true AND n.run_number=$2",
      [hash, run],
    );
    return Object.fromEntries(result.rows.map((r) => [r.entry_id, r.value]));
  }
  async saveChecklist(hash: string, run: number, id: string, value: boolean) {
    const result = await this.pool.query(
      "INSERT INTO marketing_audit_checklist(session_id,run_number,entry_id,value) SELECT s.id,$2,$3,$4 FROM marketing_audit_sessions s LEFT JOIN marketing_audit_retakes r ON r.session_id=s.id WHERE s.token_hash=$1 AND s.payment_verified=true AND (($2=1 AND s.report IS NOT NULL) OR ($2=2 AND r.report IS NOT NULL)) ON CONFLICT(session_id,run_number,entry_id) DO UPDATE SET value=EXCLUDED.value,saved_at=now()",
      [hash, run, id, value],
    );
    return result.rowCount === 1;
  }
  async companyLogo(hash: string) {
    const result = await this.pool.query(
      "SELECT l.png,l.checked_at FROM marketing_audit_company_logos l JOIN marketing_audit_sessions s ON s.id=l.session_id WHERE s.token_hash=$1 AND s.payment_verified=true AND l.website_url=s.context->>'websiteUrl'",
      [hash],
    );
    return result.rows[0]
      ? {
          png: result.rows[0].png ? Buffer.from(result.rows[0].png) : null,
          checkedAt: new Date(result.rows[0].checked_at),
        }
      : undefined;
  }
  async saveCompanyLogo(hash: string, website: string, png: Buffer | null) {
    await this.pool.query(
      "INSERT INTO marketing_audit_company_logos(session_id,website_url,png) SELECT id,$2,$3 FROM marketing_audit_sessions WHERE token_hash=$1 AND payment_verified=true AND context->>'websiteUrl'=$2 ON CONFLICT(session_id) DO UPDATE SET website_url=EXCLUDED.website_url,png=EXCLUDED.png,checked_at=now()",
      [hash, website, png],
    );
  }
  async workNotes(hash: string, run: number) {
    const result = await this.pool.query(
      "SELECT n.entry_id,n.value FROM marketing_audit_work_notes n JOIN marketing_audit_sessions s ON s.id=n.session_id WHERE s.token_hash=$1 AND s.payment_verified=true AND n.run_number=$2",
      [hash, run],
    );
    return Object.fromEntries(result.rows.map((r) => [r.entry_id, r.value]));
  }
  async saveWorkNote(hash: string, run: number, id: string, value: string) {
    const result = await this.pool.query(
      "INSERT INTO marketing_audit_work_notes(session_id,run_number,entry_id,value) SELECT s.id,$2,$3,$4 FROM marketing_audit_sessions s LEFT JOIN marketing_audit_retakes r ON r.session_id=s.id WHERE s.token_hash=$1 AND s.payment_verified=true AND (($2=1 AND s.report IS NOT NULL) OR ($2=2 AND r.report IS NOT NULL)) ON CONFLICT(session_id,run_number,entry_id) DO UPDATE SET value=EXCLUDED.value,saved_at=now()",
      [hash, run, id, value],
    );
    return result.rowCount === 1;
  }
  async paymentEvent(id: string, checkoutId: string) {
    await this.pool.query(
      "INSERT INTO marketing_audit_payment_events(event_id,checkout_id) VALUES($1,$2) ON CONFLICT DO NOTHING",
      [id, checkoutId],
    );
    await this.verify(checkoutId);
  }
  async rateLimit(key: string) {
    const bucket = Math.floor(Date.now() / 60000);
    const result = await this.pool.query(
      "INSERT INTO marketing_audit_rate_limits(key,bucket,attempts) VALUES($1,$2,1) ON CONFLICT(key) DO UPDATE SET bucket=$2, attempts=CASE WHEN marketing_audit_rate_limits.bucket=$2 THEN marketing_audit_rate_limits.attempts+1 ELSE 1 END RETURNING attempts",
      [key, bucket],
    );
    return result.rows[0].attempts <= 120;
  }
  async event(event: AuditEvent, sessionId?: string, questionId?: string) {
    await this.pool.query(
      "INSERT INTO marketing_audit_events(id,session_id,event,question_id) VALUES($1,$2,$3,$4)",
      [randomUUID(), sessionId ?? null, event, questionId ?? null],
    );
  }
}
