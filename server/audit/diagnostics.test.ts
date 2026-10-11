import { test } from "node:test";
import assert from "node:assert/strict";
import { auditDiagnostic } from "./diagnostics";

test("audit diagnostics expose known failure codes without private data", () => {
  const secret = "private-resume-token-or-key";
  const result = auditDiagnostic(`/${secret}/answers?email=customer@example.com`, "request", {
    code: secret, message: secret, stack: secret, requestId: secret,
  });
  assert.deepEqual(result, { route: "/[private-audit]", stage: "request", code: "unknown" });
  assert.equal(JSON.stringify(result).includes(secret), false);
  assert.deepEqual(auditDiagnostic("/checkout", "stripe_checkout", { code: "resource_missing" }), {
    route: "/checkout", stage: "stripe_checkout", code: "resource_missing",
  });
});
