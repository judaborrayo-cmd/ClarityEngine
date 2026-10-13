import { test } from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import {
  publicLogoAddress,
  logoUrl,
  logoCandidates,
  normalizeCompanyLogo,
  resolveLogoHost,
  discoverCompanyLogo,
  validatedCachedCompanyLogo,
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

const brandFixture = async () => sharp({create:{width:120,height:50,channels:3,background:"white"}}).composite([{input:Buffer.from('<svg width="120" height="50"><rect x="10" y="10" width="70" height="30" fill="#5541BF"/></svg>')}]).png().toBuffer();
test("discovery rejects validation badges, tracking/decorative/social assets and third-party organization logos", () => {
  const html = `<a href="https://validator.w3.org/check?uri=referer"><img class="logo" src="/resources/images/valid-html401-gold.png" alt="valid HTML"></a><img class="logo" src="/tracking-pixel.png"><img alt="logo" src="/share-icon.png"><img alt="decorative logo" src="/graphic.png"><script type="application/ld+json">{"@type":"Organization","url":"https://other.example","logo":"/thirdparty.png"}</script><script type="application/ld+json">{"@type":"Person","logo":"/person.png"}</script><img alt="Company logo" src="/brand.png">`;
  assert.deepEqual(logoCandidates(html,"https://example.com"),["https://example.com/brand.png","https://example.com/favicon.png"]);
});
test("confident logo discovery records validation provenance; legacy, corrupt and different-website cache bytes fail closed", async () => {
 const body=await brandFixture();const requests:string[]=[];
 const found=await discoverCompanyLogo("https://example.com",async(url)=>{requests.push(url);return url==="https://example.com/"?{body:Buffer.from('<script type="application/ld+json">{"@type":"Organization","logo":"/brand.png"}</script>'),mime:"text/html",url}:{body,mime:"image/png",url};});
 assert.ok(found);assert.equal(requests[1],"https://example.com/brand.png");
 assert.deepEqual(await validatedCachedCompanyLogo(found,"https://example.com"),found);
 assert.equal(await validatedCachedCompanyLogo(found,"https://different.example"),null);
 assert.equal(await validatedCachedCompanyLogo(body,"https://example.com"),null);
 const badgeCache=await sharp(body).withXmp(`<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:ce="https://www.clarity-engine.org/logo-policy" ce:policy="2" ce:website="${Buffer.from('https://example.com/').toString('base64url')}" ce:source="${Buffer.from('https://example.com/valid-html401-gold.png').toString('base64url')}"/></rdf:RDF></x:xmpmeta>`).png().toBuffer();
 assert.equal(await validatedCachedCompanyLogo(badgeCache,"https://example.com"),null);
 assert.equal(await validatedCachedCompanyLogo(Buffer.from('invalid'),"https://example.com"),null);
});
test("missing logo and a website offering only a validation badge return text-only fallback without fetching the badge", async () => {
 for(const html of ['<p>No logo</p>','<a href="https://validator.w3.org/check"><img class="logo" alt="valid HTML" src="/valid-html401-gold.png"></a>']){
  const requested:string[]=[];
  const found=await discoverCompanyLogo("https://example.com",async(url)=>{requested.push(url);if(url==="https://example.com/")return {body:Buffer.from(html),mime:"text/html",url};throw Error('No supported logo');});
  assert.equal(found,null);assert.ok(!requested.some(u=>u.includes('valid-html')));
 }
 const body=await brandFixture();
 assert.equal(await discoverCompanyLogo("https://example.com",async(url)=>url==="https://example.com/"?{body:Buffer.from('<meta property="og:logo" content="/brand.png">'),mime:"text/html",url}:{body,mime:"text/html",url}),null);
});
