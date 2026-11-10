import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { customerCopy, questionProgress } from "./customer-copy";
import { setupPrompts } from "./questionnaire";

test("customer copy uses one question count and the approved wording", () => {
  assert.equal(
    customerCopy.introduction,
    "Answer 46 questions to find your next growth opportunity.",
  );
  assert.equal(questionProgress(18), "18 of 46 questions answered.");
  assert.equal(questionProgress(46), "46 of 46 questions answered.");
  assert.equal(customerCopy.completion, "All 46 questions answered.");
  assert.equal(customerCopy.optionalContext, "Additional context (optional).");
  assert.equal(setupPrompts.trendContext, customerCopy.optionalContext);
});
test("customer surfaces do not expose question classifications or optional-count explanations", () => {
  for (const file of [
    "client/src/pages/audit-assessment.tsx",
    "client/src/pages/audit-staging.tsx",
    "client/src/pages/audit-v2-preview.tsx",
    "client/src/components/audit-v2-customer.tsx",
    "client/src/components/audit-v2-results.tsx",
    "client/src/components/audit-v2-report.tsx",
    "server/audit/v2-pdf.tsx",
    "server/audit/payment.ts",
  ]) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(
      source,
      /diagnostic\s+questions|context\s+(?:questions|answers)|required\s+responses|optional notes[^<]*(?:count|add)/i,
      file,
    );
  }
});

test("Stripe checkout uses the same v2 introduction without changing the legacy message", async () => {
  const { StripeAuditPayment } = await import("../../../server/audit/payment");
  const { versions } = await import("./questionnaire");
  const payment = new StripeAuditPayment(
    "sk_test_synthetic",
    "price_synthetic",
    "whsec_synthetic",
  );
  let request: any;
  (payment as any).stripe.checkout.sessions.create = async (input: unknown) => {
    request = input;
    return {
      id: "cs_test_wording",
      url: "https://checkout.stripe.com/synthetic",
    };
  };
  await payment.checkout(
    "https://preview.example.com",
    "synthetic_claim",
    undefined,
    versions.questionnaire,
  );
  assert.equal(request.custom_text.submit.message, customerCopy.introduction);
  await payment.checkout(
    "https://preview.example.com",
    "synthetic_claim",
    undefined,
    "1.0.0",
  );
  assert.equal(
    request.custom_text.submit.message,
    "Get Clarity Assessment by Clarity Engine examines six marketing areas to help you identify where to focus next.",
  );
});
