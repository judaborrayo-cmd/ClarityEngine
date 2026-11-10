import { invalidatedByChange as invalidatedByGoalChange } from "../../shared/marketing-clarity-audit/v2-goals/dependencies";
import { invalidatedByChange } from "../../shared/marketing-clarity-audit/v2-next/dependencies";
import {
  assessmentModel,
  isV2Version,
} from "../../shared/marketing-clarity-audit/versioning";
import { randomUUID } from "node:crypto";
import {
  PostgresAuditStore,
  type AuditDatabase,
  type AuditRecord,
} from "./store";
import type { FrozenAuditReport } from "../../shared/marketing-clarity-audit/report";
import {
  createReport,
  draftSchema,
} from "../../shared/marketing-clarity-audit/v2/engine";
import {
  versions,
  requiredSetupFields,
  setupSchema,
} from "../../shared/marketing-clarity-audit/v2/questionnaire";
import { customerContextSchema } from "../../shared/marketing-clarity-audit/context";

// Legacy interface remains unchanged. The versioned boundary is dispatched before any v1 renderer/validator.
export class VersionedAuditStore extends PostgresAuditStore {
  constructor(
    url: string,
    private db: AuditDatabase,
    readonly newVersion = "1.0.0",
  ) {
    super(url, db);
  }
  async initiate(
    checkout: string,
    claim: string,
    hash: string,
    version = this.newVersion,
  ) {
    if (version !== "1.0.0" && !isV2Version(version))
      throw new Error("Unsupported checkout version");
    await this.db.query(
      "INSERT INTO marketing_audit_sessions(id,checkout_id,claim_hash,token_hash,content_version) VALUES($1,$2,$3,$4,$5) ON CONFLICT(checkout_id) DO NOTHING",
      [randomUUID(), checkout, claim, hash, version],
    );
  }
  async read(hash: string) {
    const row = await super.read(hash);
    if (!row) return row;
    const extra = (
      await this.db.query(
        "SELECT s.content_version,s.setup,r.content_version AS retake_version,r.setup AS retake_setup FROM marketing_audit_sessions s LEFT JOIN marketing_audit_retakes r ON r.session_id=s.id WHERE s.token_hash=$1",
        [hash],
      )
    ).rows[0];
    return {
      ...row,
      content_version:
        row.run_number === 2 ? extra.retake_version : extra.content_version,
      setup: row.run_number === 2 ? extra.retake_setup : extra.setup,
    };
  }
  async saveSetup(hash: string, field: string, value: string | string[]) {
    if (![...requiredSetupFields, "trendContext"].includes(field as any))
      return false;
    const row = await this.read(hash);
    if (!row || !isV2Version(row.content_version) || row.report || !row.context)
      return false;
    const model = assessmentModel(row.content_version);
    // Empty goal arrays may be saved while editing; completion still requires at least one goal.
    const parsed =
      field === "outcome" &&
      ["2.0.0-preview.5", "2.0.0-preview.6", "2.0.0-preview.7"].includes(
        row.content_version,
      ) &&
      Array.isArray(value) &&
      value.length === 0
        ? { success: true }
        : (model.setupSchema.innerType().shape as any)[field]?.safeParse(value);
    if (!parsed?.success) return false;
    const table =
      row.run_number === 2
        ? "marketing_audit_retakes"
        : "marketing_audit_sessions";
    const clear = ["2.0.0-preview.6", "2.0.0-preview.7"].includes(
      row.content_version,
    )
      ? invalidatedByGoalChange(row.setup as any, field, value)
      : row.content_version === "2.0.0-preview.5"
        ? invalidatedByChange(row.setup as any, field, value)
        : { setup: [], answers: [] };
    return (
      (
        await this.db.query(
          `UPDATE ${table} SET setup=jsonb_set(setup - $4::text[],ARRAY[$2::text],($3::jsonb)),answers=answers - $5::text[],saved_at=now() WHERE ${row.run_number === 2 ? "session_id" : "id"}=$1 AND report IS NULL`,
          [row.id, field, JSON.stringify(value), clear.setup, clear.answers],
        )
      ).rowCount === 1
    );
  }
  async startRetake(hash: string) {
    const row = await this.read(hash);
    if (!row) return false;
    if (row.run_number === 2) return !row.report;
    if (!row.report) return false;
    const result = await this.db.query(
      "INSERT INTO marketing_audit_retakes(id,session_id,context,content_version) VALUES($1,$2,$3::jsonb,$4) ON CONFLICT(session_id) DO NOTHING",
      [randomUUID(), row.id, JSON.stringify(row.context), row.content_version],
    );
    if (result.rowCount === 1) return true;
    const current = await this.read(hash);
    return current?.run_number === 2 && !current.report;
  }
  async complete(hash: string): Promise<FrozenAuditReport> {
    const row = await this.read(hash);
    if (!row || row.content_version === "1.0.0") return super.complete(hash);
    if (!isV2Version(row.content_version))
      throw new Error("Unsupported assessment version");
    const c = await this.db.connect();
    try {
      await c.query("BEGIN");
      // Lock entitlement first, matching legacy completion ordering.
      await c.query(
        "SELECT id FROM marketing_audit_sessions WHERE id=$1 FOR UPDATE",
        [row.id],
      );
      const table =
        row.run_number === 2
          ? "marketing_audit_retakes"
          : "marketing_audit_sessions";
      const current = (
        await c.query(
          `SELECT * FROM ${table} WHERE ${row.run_number === 2 ? "session_id" : "id"}=$1 FOR UPDATE`,
          [row.id],
        )
      ).rows[0];
      if (current.report) {
        await c.query("COMMIT");
        return current.report;
      }
      const model = assessmentModel(row.content_version);
      const draft = model.draftSchema.parse({
        versions: model.versions,
        setup: current.setup,
        answers: current.answers,
      });
      const generated = (model.create as (draft: unknown) => any)(draft);
      const context = model.contextSchema.parse(current.context);
      const report = {
        ...generated,
        context: [
          "2.0.0-preview.5",
          "2.0.0-preview.6",
          "2.0.0-preview.7",
        ].includes(row.content_version)
          ? {
              ...context,
              marketingGoals: [...(draft.setup.outcome as string[])],
            }
          : context,
      };
      await c.query(
        `UPDATE ${table} SET report=$2::jsonb,completed_at=now(),saved_at=now() WHERE id=$1`,
        [current.id, JSON.stringify(report)],
      );
      await c.query(
        "INSERT INTO marketing_audit_event_receipts(session_id,event,run_number) VALUES($1,'diagnostic_complete',$2) ON CONFLICT DO NOTHING",
        [row.id, row.run_number],
      );
      // Preview never queues customer notifications. Production enabling is a separate review.
      await c.query("COMMIT");
      return report as unknown as FrozenAuditReport;
    } catch (e) {
      await c.query("ROLLBACK");
      throw e;
    } finally {
      c.release();
    }
  }
  async saveCheckoutAttribution(
    checkoutId: string,
    attribution: Record<string, string>,
  ) {
    await this.db.query(
      "UPDATE marketing_audit_sessions SET attribution=$2::jsonb WHERE checkout_id=$1 AND report IS NULL",
      [checkoutId, JSON.stringify(attribution)],
    );
  }
  async purchaseReceipt(sessionId: string, amount: number, currency: string) {
    await this.db.query(
      "INSERT INTO marketing_audit_event_receipts(session_id,event,run_number,amount_total,currency) VALUES($1,'purchase_success',1,$2,$3) ON CONFLICT DO NOTHING",
      [sessionId, amount, currency],
    );
  }
}
