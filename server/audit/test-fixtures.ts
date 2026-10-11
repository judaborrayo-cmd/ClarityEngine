import { randomUUID } from "node:crypto";
import type { AuditRecord, AuditStore } from "./store";
import type { AuditPayment } from "./payment";
import { createFrozenReport } from "../../shared/marketing-clarity-audit/report";
import type { CustomerContext } from "../../shared/marketing-clarity-audit/context";
import type { Answers } from "../../shared/marketing-clarity-audit/scoring";
import { questionnaire } from "../../shared/marketing-clarity-audit/scoring";

// Explicit dependency injection for isolated tests. Never imported by production entry points.
export class TestAuditStore implements AuditStore {
  companyLogo?: AuditStore["companyLogo"];
  saveCompanyLogo?: AuditStore["saveCompanyLogo"];
  records = new Map<string, AuditRecord>();
  checks = new Map<string, Record<string, boolean>>();
  notes = new Map<string, Record<string, string>>();
  retakes = new Map<string, AuditRecord>();
  notifications = new Map<string, unknown>();
  events = new Set<string>();
  failSave = false;
  async initiate(checkoutId: string, claimHash: string, hash: string) {
    if (!this.records.has(hash))
      this.records.set(hash, {
        id: randomUUID(),
        checkout_id: checkoutId,
        claim_hash: claimHash,
        token_hash: hash,
        payment_verified: false,
        context: null,
        answers: {},
        teaching_notes: [],
        report: null,
        saved_at: new Date(),
        run_number: 1,
        reports: [],
      });
  }
  async verify(id: string, claimHash?: string) {
    const row = Array.from(this.records.values()).find(
      (r) => r.checkout_id === id && (!claimHash || r.claim_hash === claimHash),
    );
    if (row) row.payment_verified = true;
    return row;
  }
  async read(hash: string) {
    const original = this.records.get(hash);
    if (!original?.payment_verified) return undefined;
    const retake = this.retakes.get(hash);
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
    return { ...(retake ?? original), id: original.id, reports };
  }
  async startRetake(hash: string) {
    const original = this.records.get(hash);
    if (!original?.payment_verified || !original.report) return false;
    if (this.retakes.has(hash)) return !this.retakes.get(hash)!.report;
    this.retakes.set(hash, {
      ...original,
      id: randomUUID(),
      context: structuredClone(original.context),
      answers: {},
      teaching_notes: [],
      report: null,
      run_number: 2,
      reports: [],
    });
    return true;
  }
  async saveContext(hash: string, context: CustomerContext) {
    const row = this.retakes.get(hash) ?? this.records.get(hash);
    if (!row?.payment_verified || row.report) return false;
    if (row.run_number === 2) {
      const original = this.records.get(hash)!.context!;
      if (
        ["name", "email", "companyName", "websiteUrl"].some(
          (key) =>
            context[key as keyof CustomerContext] !==
            original[key as keyof CustomerContext],
        )
      )
        return false;
    }
    row.context = context;
    return true;
  }
  async saveAnswer(hash: string, id: string, value: string) {
    if (this.failSave) throw new Error("Simulated storage failure");
    const row = this.retakes.get(hash) ?? this.records.get(hash);
    if (!row?.payment_verified || row.report || !row.context) return false;
    row.answers[id] = value as "A";
    if (
      ["D", "E"].includes(value) &&
      questionnaire.questions.some((q) => q.id === id && "teachingNote" in q) &&
      row.teaching_notes.length < 10 &&
      !row.teaching_notes.includes(id)
    )
      row.teaching_notes.push(id);
    row.saved_at = new Date();
    return true;
  }
  async complete(hash: string) {
    const row = (this.retakes.get(hash) ?? this.records.get(hash))!;
    if (!row.report) {
      row.report = createFrozenReport(row.answers, row.context);
      this.notifications.set(
        `${this.records.get(hash)!.id}:${row.run_number}`,
        row.report.context,
      );
    }
    return row.report;
  }
  async checklist(hash: string, run: number) {
    return this.checks.get(`${hash}:${run}`) ?? {};
  }
  async saveChecklist(hash: string, run: number, id: string, value: boolean) {
    if (!(await this.read(hash))?.reports.some((r) => r.number === run))
      return false;
    if (this.failSave) throw new Error("Simulated storage failure");
    const key = `${hash}:${run}`;
    this.checks.set(key, { ...this.checks.get(key), [id]: value });
    return true;
  }
  async workNotes(hash: string, run: number) {
    return this.notes.get(`${hash}:${run}`) ?? {};
  }
  async saveWorkNote(hash: string, run: number, id: string, value: string) {
    if (!(await this.read(hash))?.reports.some((r) => r.number === run))
      return false;
    if (this.failSave) throw new Error("Simulated storage failure");
    const key = `${hash}:${run}`;
    this.notes.set(key, { ...this.notes.get(key), [id]: value });
    return true;
  }
  async paymentEvent(id: string, checkoutId: string) {
    this.events.add(id);
    await this.verify(checkoutId);
  }
  async rateLimit() {
    return true;
  }
  async event() {}
}

export class TestAuditPayment implements AuditPayment {
  purchases = new Map<string, { claimHash: string; paid: boolean }>();
  autoPaid = true;
  async checkout(origin: string, claimHash: string) {
    const id = `cs_test_${randomUUID().replaceAll("-", "")}`;
    this.purchases.set(id, { claimHash, paid: this.autoPaid });
    return { id, url: `${origin}/audit/start?session_id=${id}` };
  }
  async isPaid(id: string, claimHash?: string) {
    const purchase = this.purchases.get(id);
    return Boolean(
      purchase?.paid && (!claimHash || purchase.claimHash === claimHash),
    );
  }
  webhook(body: Buffer, signature: string) {
    if (signature !== "test-signature") throw new Error("Invalid signature");
    return JSON.parse(body.toString()) as { id: string; checkoutId: string };
  }
}
