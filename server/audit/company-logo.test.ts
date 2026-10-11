import { test } from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import {
  publicLogoAddress,
  logoUrl,
  logoCandidates,
  normalizeCompanyLogo,
  resolveLogoHost,
} from "./company-logo";

test("logo requests reject non-public addresses, credentials, unsafe schemes and ports", async () => {
  for (const address of [
    "127.0.0.1",
    "10.0.0.1",
    "172.16.1.1",
    "192.168.0.1",
    "169.254.169.254",
    "100.64.0.1",
    "::1",
    "::ffff:127.0.0.1",
    "fc00::1",
    "fe80::1",
    "198.51.100.1",
    "2001:db8::1",
  ])
    assert.equal(publicLogoAddress(address), false, address);
  assert.equal(publicLogoAddress("8.8.8.8"), true);
  for (const value of [
    "file:///etc/passwd",
    "data:image/png;base64,AA",
    "http://user:pass@example.com",
    "http://example.com:3001/logo",
    "http://localhost/logo",
  ])
    assert.throws(() => logoUrl(value));
  for (const addresses of [
    [{ address: "127.0.0.1", family: 4 }],
    [
      { address: "8.8.8.8", family: 4 },
      { address: "169.254.169.254", family: 4 },
    ],
  ])
    await assert.rejects(
      resolveLogoHost(
        "https://example.com/logo",
        AbortSignal.timeout(1000),
        async () => addresses as any,
      ),
      /Unsafe address/,
    );
  const resolved = await resolveLogoHost(
    "https://example.com/logo",
    AbortSignal.timeout(1000),
    async () => [{ address: "8.8.8.8", family: 4 }] as any,
  );
  assert.equal(resolved.pinned.address, "8.8.8.8");
  const aborted = new AbortController();
  aborted.abort();
  await assert.rejects(
    resolveLogoHost("https://example.com", aborted.signal),
    /timeout/,
  );
});
test("logo candidates prefer organization and identifiable brand assets, use icons last, and exclude arbitrary social photography", () => {
  const html = `<script type="application/ld+json">{"@type":"Organization","logo":{"url":"/organization.png"}}</script><img alt="Company logo" src="/header.png"><meta property="og:image" content="/photo.jpg"><link rel="icon" href="/icon.png">`;
  const candidates = logoCandidates(html, "https://example.com/page");
  assert.deepEqual(candidates.slice(0, 3), [
    "https://example.com/organization.png",
    "https://example.com/header.png",
    "https://example.com/icon.png",
  ]);
  assert.ok(!candidates.includes("https://example.com/photo.jpg"));
});
test("logo decoding rejects unsafe, oversized, blank and malformed images and normalizes usable raster assets", async () => {
  const image = await sharp({
    create: { width: 120, height: 50, channels: 3, background: "white" },
  })
    .composite([
      {
        input: Buffer.from(
          '<svg width="120" height="50"><rect x="10" y="10" width="70" height="30" fill="#5541BF"/></svg>',
        ),
      },
    ])
    .png()
    .toBuffer();
  const logo = await normalizeCompanyLogo(image, "image/png");
  assert.equal((await sharp(logo).metadata()).format, "png");
  assert.ok(logo.length < 131072);
  await assert.rejects(
    normalizeCompanyLogo(
      Buffer.from('<svg onload="evil()"/>'),
      "image/svg+xml",
    ),
  );
  await assert.rejects(normalizeCompanyLogo(Buffer.alloc(600000), "image/png"));
  await assert.rejects(
    normalizeCompanyLogo(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      "image/png",
    ),
  );
  const blank = await sharp({
    create: { width: 20, height: 20, channels: 3, background: "white" },
  })
    .png()
    .toBuffer();
  await assert.rejects(normalizeCompanyLogo(blank, "image/png"), /Unreadable/);
});
