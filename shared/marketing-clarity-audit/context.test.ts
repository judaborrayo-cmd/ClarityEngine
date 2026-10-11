import { test } from "node:test";
import assert from "node:assert/strict";
import { customerContextSchema } from "./context";
import content from "./report-content.json";

const context = {
  name: "Customer",
  email: "customer@example.com",
  companyName: "Example",
  websiteUrl: "https://example.com",
  businessType: "professional_services",
  primaryMarketingGoal: "leads",
};

test("all customer and business context fields are required", () => {
  assert.ok(customerContextSchema.safeParse(context).success);
  for (const key of Object.keys(context)) {
    const incomplete = { ...context } as Record<string, unknown>;
    delete incomplete[key];
    assert.equal(
      customerContextSchema.safeParse(incomplete).success,
      false,
      key,
    );
  }
});

test("reject malformed and unsupported website URLs, credentials and blank names", () => {
  for (const websiteUrl of [
    "",
    "  ",
    "not a website",
    "https:///example.com",
    "javascript:alert(1)",
    "ftp://example.com",
    "https://user:secret@example.com",
    "https://localhost",
  ]) {
    assert.equal(
      customerContextSchema.safeParse({ ...context, websiteUrl }).success,
      false,
      websiteUrl,
    );
  }
  assert.equal(
    customerContextSchema.safeParse({ ...context, name: "  " }).success,
    false,
  );
  assert.equal(
    customerContextSchema.safeParse({ ...context, email: "invalid" }).success,
    false,
  );
});

test("website normalization accepts bare domains and preserves explicit protocols", () => {
  for (const [input, expected] of [
    ["example.com", "https://example.com"],
    ["www.example.com", "https://www.example.com"],
    ["  example.com/path?source=a  ", "https://example.com/path?source=a"],
    ["http://example.com/path", "http://example.com/path"],
    ["https://www.example.com", "https://www.example.com"],
  ]) {
    assert.equal(
      customerContextSchema.parse({ ...context, websiteUrl: input }).websiteUrl,
      expected,
    );
  }
});

test("report content preserves all canonical patterns, recommendations and cases", () => {
  assert.equal(content.patterns.length, 15);
  assert.equal(content.recommendations.length, 48);
  assert.equal(content.cases.length, 10);
  assert.equal(content.workSessions.length, 6);
  assert.equal(
    new Set(content.recommendations.map((action) => action.id)).size,
    48,
  );
  for (const pattern of content.patterns) {
    assert.equal(pattern.recommendationIds.length, 3);
    assert.equal(pattern.planPhases.length, 4);
    for (const id of pattern.recommendationIds)
      assert.ok(
        id.startsWith("DYNAMIC_UPSTREAM_") ||
          content.recommendations.some((action) => action.id === id),
      );
  }
  for (const card of content.cases)
    assert.ok(
      ["A_quantified", "B_observed", "C_strategic"].includes(card.evidence),
    );
});
