import { test } from "node:test";
import assert from "node:assert/strict";
import { opaqueToken, tokenHash, validToken, resumeToken } from "./security";

test("resume credentials are opaque, hashed, and bound to browser claim and checkout", () => {
  const claim = opaqueToken();
  assert.ok(validToken(claim));
  assert.notEqual(opaqueToken(), claim);
  const token = resumeToken(claim, "cs_test_one", "test-secret");
  assert.ok(validToken(token));
  assert.equal(token, resumeToken(claim, "cs_test_one", "test-secret"));
  assert.notEqual(token, resumeToken(claim, "cs_test_two", "test-secret"));
  assert.notEqual(
    token,
    resumeToken(opaqueToken(), "cs_test_one", "test-secret"),
  );
  assert.notEqual(tokenHash(token), token);
  assert.ok(!validToken("email@example.com"));
});
