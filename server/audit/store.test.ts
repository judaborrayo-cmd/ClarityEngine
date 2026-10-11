import { normalizeCompanyLogo } from "./company-logo";
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { PostgresAuditStore, type AuditDatabase } from "./store";
import { questionnaire } from "../../shared/marketing-clarity-audit/scoring";
import { customerContextSchema } from "../../shared/marketing-clarity-audit/context";
import { opaqueToken, tokenHash } from "./security";

test("PostgreSQL migrations, immutable reports, one retake, identity locks and atomic notification rollback", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(
    readFileSync(
      new URL("../../migrations/0001_marketing_audit.sql", import.meta.url),
      "utf8",
    ),
  );
  await db.exec(
    readFileSync(
      new URL(
        "../../migrations/0002_marketing_audit_retake.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(
    readFileSync(
      new URL(
        "../../migrations/0003_marketing_audit_work_notes.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(
    readFileSync(
      new URL(
        "../../migrations/0004_marketing_audit_checklist.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(
    readFileSync(
      new URL(
        "../../migrations/0005_marketing_audit_company_logo.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  const query: AuditDatabase["query"] = async (text, parameters) => {
    const result = await db.query(text, parameters);
    return { rows: result.rows, rowCount: result.affectedRows ?? null };
  };
  const adapter: AuditDatabase = {
    query,
    connect: async () => ({ query, release() {} }),
  };
  const store = new PostgresAuditStore("test-injected", adapter);
  const hash = tokenHash(opaqueToken());
  await store.initiate("cs_test_one", "claim_hash", hash);
  await store.initiate("cs_test_one", "claim_hash", hash);
  assert.equal(
    (await query("SELECT * FROM marketing_audit_sessions")).rows.length,
    1,
  );
  assert.equal(await store.read(hash), undefined);
  assert.equal(await store.verify("cs_test_one", "wrong_claim"), undefined);
  await store.verify("cs_test_one", "claim_hash");
  assert.equal(await store.saveAnswer(hash, "O1", "A"), false);
  assert.equal(await store.startRetake(hash), false);
  await store.saveContext(
    hash,
    customerContextSchema.parse({
      name: "Test",
      email: "test@example.com",
      companyName: "Test company",
      websiteUrl: "https://example.com",
      businessType: "professional_services",
      primaryMarketingGoal: "leads",
    }),
  );
  await store.saveAnswer(hash, "O1", "D");
  await store.saveAnswer(hash, "O2", "B");
  assert.deepEqual((await store.read(hash))!.answers, { O1: "D", O2: "B" });
  await assert.rejects(store.complete(hash));
  assert.equal((await store.read(hash))!.report, null);
  for (const question of questionnaire.questions)
    await store.saveAnswer(hash, question.id, question.id === "C6" ? "D" : "A");
  // Failure after report write must roll back both completion and notification.
  await db.exec(
    "ALTER TABLE marketing_audit_notifications ADD CONSTRAINT test_failure CHECK (false)",
  );
  await assert.rejects(store.complete(hash));
  assert.equal((await store.read(hash))!.report, null);
  await db.exec(
    "ALTER TABLE marketing_audit_notifications DROP CONSTRAINT test_failure",
  );
  const report = await store.complete(hash);
  assert.deepEqual(await store.complete(hash), report);
  assert.equal(
    (await query("SELECT * FROM marketing_audit_notifications")).rows.length,
    1,
  );
  assert.equal(await store.saveAnswer(hash, "O1", "E"), false);
  await assert.rejects(
    query(
      "UPDATE marketing_audit_sessions SET report=NULL, completed_at=NULL WHERE token_hash=$1",
      [hash],
    ),
  );
  await assert.rejects(
    query(
      "UPDATE marketing_audit_sessions SET answers='{}'::jsonb WHERE token_hash=$1",
      [hash],
    ),
  );
  await store.paymentEvent("evt_one", "cs_test_one");
  await store.paymentEvent("evt_one", "cs_test_one");
  assert.equal(
    (await query("SELECT * FROM marketing_audit_payment_events")).rows.length,
    1,
  );
  assert.equal(await store.rateLimit("test"), true);
  const insightHash = tokenHash(opaqueToken());
  await store.initiate("cs_test_insights", "claim", insightHash);
  await store.verify("cs_test_insights");
  await store.saveContext(insightHash, (await store.read(hash))!.context!);
  for (const q of questionnaire.questions.filter((q) => "teachingNote" in q))
    await store.saveAnswer(insightHash, q.id, "D");
  assert.equal((await store.read(insightHash))!.teaching_notes.length, 10);
  await store.saveAnswer(insightHash, "O1", "A");
  await store.saveAnswer(insightHash, "O1", "D");
  assert.equal((await store.read(insightHash))!.teaching_notes.length, 10);
  const originalSnapshot = structuredClone(report);
  const originalAnswers = structuredClone((await store.read(hash))!.answers);
  assert.equal(await store.startRetake(hash), true);
  let second = (await store.read(hash))!;
  assert.equal(second.run_number, 2);
  assert.deepEqual(second.answers, {});
  assert.equal(second.report, null);
  assert.deepEqual(second.reports, [
    { number: 1, report: originalSnapshot, answers: originalAnswers },
  ]);
  await assert.rejects(store.complete(hash));
  for (const key of ["name", "email", "companyName", "websiteUrl"]) {
    assert.equal(
      await store.saveContext(hash, {
        ...second.context!,
        [key]: "different-business",
      }),
      false,
    );
    await assert.rejects(
      query(
        "UPDATE marketing_audit_retakes SET context=jsonb_set(context,ARRAY[$2::text],to_jsonb($3::text)) WHERE session_id=$1",
        [second.id, key, "different-business"],
      ),
    );
  }
  assert.equal(
    await store.saveContext(hash, {
      ...second.context!,
      primaryMarketingGoal: "booked_calls",
    }),
    true,
  );
  await store.saveAnswer(hash, "O1", "B");
  assert.equal(await store.startRetake(hash), true);
  assert.equal((await store.read(hash))!.answers.O1, "B");
  for (const q of questionnaire.questions)
    await store.saveAnswer(hash, q.id, "B");
  await db.exec(
    "ALTER TABLE marketing_audit_notifications ADD CONSTRAINT second_failure CHECK (run_number<>2)",
  );
  await assert.rejects(store.complete(hash));
  assert.equal((await store.read(hash))!.report, null);
  assert.deepEqual(
    (await store.read(hash))!.reports[0].report,
    originalSnapshot,
  );
  await db.exec(
    "ALTER TABLE marketing_audit_notifications DROP CONSTRAINT second_failure",
  );
  const secondReport = await store.complete(hash);
  assert.deepEqual(await store.complete(hash), secondReport);
  second = (await store.read(hash))!;
  assert.deepEqual(
    second.reports.map((r) => r.number),
    [1, 2],
  );
  assert.deepEqual(second.reports[0].report, originalSnapshot);
  assert.deepEqual(second.reports[0].answers, originalAnswers);
  assert.deepEqual(
    second.reports[1].answers,
    Object.fromEntries(questionnaire.questions.map((q) => [q.id, "B"])),
  );
  assert.notDeepEqual(secondReport, originalSnapshot);
  assert.equal(await store.startRetake(hash), false);
  assert.equal(await store.saveAnswer(hash, "O1", "E"), false);
  assert.equal(await store.saveContext(hash, second.context!), false);
  assert.equal(
    (
      await query(
        "SELECT * FROM marketing_audit_notifications WHERE session_id=$1",
        [second.id],
      )
    ).rows.length,
    2,
  );
  assert.equal(
    (
      await query("SELECT * FROM marketing_audit_retakes WHERE session_id=$1", [
        second.id,
      ])
    ).rows.length,
    1,
  );
  await assert.rejects(
    query(
      "UPDATE marketing_audit_retakes SET report=NULL,completed_at=NULL WHERE session_id=$1",
      [second.id],
    ),
  );
  await assert.rejects(
    query(
      "UPDATE marketing_audit_retakes SET answers='{}'::jsonb WHERE session_id=$1",
      [second.id],
    ),
  );
  await assert.rejects(
    query(
      "INSERT INTO marketing_audit_retakes(id,session_id,context) VALUES(gen_random_uuid(),$1,$2::jsonb)",
      [second.id, JSON.stringify(second.context)],
    ),
  );
  await db.exec(
    readFileSync(
      new URL(
        "../../migrations/0002_marketing_audit_retake.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  assert.deepEqual(
    (await store.read(hash))!.reports[0].report,
    originalSnapshot,
  );
  const frozenBoth = JSON.stringify((await store.read(hash))!.reports);
  assert.equal(
    await store.saveWorkNote(hash, 1, "primary-0", "First run evidence"),
    true,
  );
  assert.equal(
    await store.saveWorkNote(hash, 2, "primary-0", "Second run evidence"),
    true,
  );
  assert.deepEqual(await store.workNotes(hash, 1), {
    "primary-0": "First run evidence",
  });
  assert.deepEqual(await store.workNotes(hash, 2), {
    "primary-0": "Second run evidence",
  });
  await store.saveWorkNote(hash, 1, "primary-0", "Revised working note");
  assert.equal(
    (await store.workNotes(hash, 1))["primary-0"],
    "Revised working note",
  );
  assert.equal(JSON.stringify((await store.read(hash))!.reports), frozenBoth);
  assert.equal(
    await store.saveWorkNote("unowned", 1, "primary-0", "Other person's data"),
    false,
  );
  assert.equal(
    await store.saveWorkNote(
      insightHash,
      1,
      "primary-0",
      "Incomplete diagnostic",
    ),
    false,
  );
  assert.equal(await store.saveChecklist(hash, 1, "move", true), true);
  assert.deepEqual(await store.checklist(hash, 1), { move: true });
  assert.deepEqual(await store.checklist(hash, 2), {});
  await store.saveChecklist(hash, 2, "move", true);
  await store.saveChecklist(hash, 1, "move", false);
  assert.deepEqual(await store.checklist(hash, 1), { move: false });
  assert.deepEqual(await store.checklist(hash, 2), { move: true });
  assert.equal(await store.saveChecklist("unowned", 1, "move", true), false);
  assert.equal(await store.saveChecklist(insightHash, 1, "move", true), false);
  assert.equal(JSON.stringify((await store.read(hash))!.reports), frozenBoth);
  const logoBytes = await normalizeCompanyLogo(
    readFileSync(new URL("./pdf-assets/logo.png", import.meta.url)),
    "image/png",
  );
  await store.saveCompanyLogo(hash, report.context.websiteUrl, logoBytes);
  assert.deepEqual((await store.companyLogo(hash))!.png, logoBytes);
  assert.equal(await store.companyLogo("unowned"), undefined);
  await store.saveCompanyLogo(hash, "https://other.example", null);
  assert.deepEqual((await store.companyLogo(hash))!.png, logoBytes);
  assert.equal(JSON.stringify((await store.read(hash))!.reports), frozenBoth);
});
