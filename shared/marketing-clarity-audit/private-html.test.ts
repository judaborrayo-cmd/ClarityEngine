import { test } from "node:test";
import assert from "node:assert/strict";
import { privateAuditHtml } from "./private-html";

test("private initial HTML has no external widget scripts and preserves application entry", () => {
  const html = privateAuditHtml(
    '<head></head><body><script src="https://assets.calendly.com/assets/external/widget.js" async></script><script src="https://replit.com/public/js/replit-dev-banner.js"></script><script src="/ux-enhancements.js"></script><script type="module" src="/assets/app.js"></script></body>',
  );
  assert.ok(!html.includes("calendly.com"));
  assert.ok(!html.includes("replit.com"));
  assert.ok(!html.includes("ux-enhancements.js"));
  assert.ok(html.includes("noindex,nofollow"));
  assert.ok(html.includes("no-referrer"));
  assert.ok(html.includes("/assets/app.js"));
});
