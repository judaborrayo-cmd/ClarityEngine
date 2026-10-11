import { test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CaseVisualComparison } from "./report-view";

test("case visual assets explicitly distinguish reconstruction, unavailable evidence and privacy treatments", () => {
  const empty = renderToStaticMarkup(
    React.createElement(CaseVisualComparison, {}),
  );
  assert.match(empty, /Visual before\/after example coming soon/);
  assert.doesNotMatch(empty, /<img/);
  const reconstructed = renderToStaticMarkup(
    React.createElement(CaseVisualComparison, {
      beforeImage: { src: "/case-before.png", alt: "Earlier offer layout" },
      afterImage: { src: "/case-after.png", alt: "Revised offer layout" },
      beforeCaption: "Reconstructed earlier direction",
      afterCaption: "Proposed outcome-led direction",
      reconstructedExample: true,
    }),
  );
  assert.match(
    reconstructed,
    /Reconstructed example based on the real engagement/,
  );
  assert.match(reconstructed, /Reconstructed earlier direction/);
  assert.equal((reconstructed.match(/<img/g) ?? []).length, 2);
  const redacted = renderToStaticMarkup(
    React.createElement(CaseVisualComparison, {
      beforeImage: { src: "/private-case.png", alt: "Private client offer" },
      redactedBefore: true,
    }),
  );
  assert.match(redacted, /Visual withheld for privacy/);
  assert.doesNotMatch(redacted, /private-case.png|Private client offer/);
  const blurred = renderToStaticMarkup(
    React.createElement(CaseVisualComparison, {
      beforeImage: { src: "/case.png", alt: "Private client name" },
      blurBefore: true,
    }),
  );
  assert.match(blurred, /blur\(8px\)/);
  assert.doesNotMatch(blurred, /Private client name/);
});

test("stable case asset registry supports replacement, comparison and semantic icon slots", async () => {
  const { caseAssetIds, categoryCaseAsset } = await import("./case-assets");
  const { CaseTeachingCard } = await import("./report-view");
  assert.equal(
    new Set([
      ...Object.values(caseAssetIds.offer),
      ...Object.values(categoryCaseAsset),
    ]).size,
    10,
  );
  const rendered = renderToStaticMarkup(
    React.createElement(CaseVisualComparison, {
      assets: {
        case_offer_visual_comparison: {
          src: "/comparison.png",
          alt: "Offer comparison",
          caption: "Authored comparison",
        },
      },
      reconstructedExample: true,
    }),
  );
  assert.match(rendered, /data-asset-id="case_offer_visual_comparison"/);
  assert.match(rendered, /Authored comparison/);
  assert.match(rendered, /Reconstructed example based on the real engagement/);
  for (const [title, id, className] of [
    ["The problem", caseAssetIds.offer.problem, "case-problem"],
    [
      "What customers actually cared about",
      caseAssetIds.offer.customerValue,
      "case-customer-value",
    ],
  ]) {
    const html = renderToStaticMarkup(
      React.createElement(CaseTeachingCard, { title, copy: "Evidence" }),
    );
    assert.match(html, new RegExp(`data-asset-id="${id}"`));
    assert.ok(html.includes(className));
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /<svg/);
  }
  for (const [section, id] of Object.entries(categoryCaseAsset)) {
    const html = renderToStaticMarkup(
      React.createElement(CaseVisualComparison, {
        sectionId: Number(section),
        assets: { [id]: { src: "/category.png", alt: "Category visual" } },
      }),
    );
    assert.ok(html.includes(`data-asset-id="${id}"`));
    assert.ok(html.includes("/category.png"));
  }
});
