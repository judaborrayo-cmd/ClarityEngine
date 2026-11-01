import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { Parser } from 'htmlparser2';
import { plannedDestinations } from '../client/src/components/navigation-config';
import { indexablePagePaths, pageHtmlFile, publicOrigin, publicPagePaths } from '../shared/page-metadata';
const base = process.env.SEO_BASE;
async function get(route: string, file: string, status = 200) {
  if (!base) return fs.readFile('dist/'+file, 'utf8');
  const r = await fetch(base+route);
  assert.equal(r.status, status, route);
  return r.text();
}
const sitemap = await get('/sitemap.xml', 'sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(urls, indexablePagePaths.map(p => publicOrigin+p));
assert.equal(new Set(urls).size, urls.length);
assert.ok(!urls.some(u => /\/(audit|checkout)\//.test(u) || u.endsWith('/steven')));
const robots = await get('/robots.txt', 'robots.txt');
assert.match(robots, /User-agent: \*\nAllow: \/\n/);
assert.ok(robots.includes('Sitemap: '+publicOrigin+'/sitemap.xml'));
assert.ok(!robots.includes('<html'));
const config = JSON.parse(await fs.readFile('vercel.json','utf8'));
assert.ok(!config.rewrites.some((r: {source:string}) => r.source === '/(.*)'));
for (const route of publicPagePaths.filter(p => p !== '/')) {
  for (const suffix of ['', '/']) assert.ok(config.rewrites.some((r: {source:string,destination:string}) => r.source === route+suffix && r.destination === '/'+pageHtmlFile(route)), 'Direct route '+route+suffix);
}
for (const route of indexablePagePaths) {
  const html = await get(route, pageHtmlFile(route));
  let headings = 0, text = '', schema = '', inSchema = false;
  const assets = new Set<string>();
  new Parser({onopentag(tag, a) {
    if (tag === 'h1') headings++;
    if (tag === 'script' && a.id === 'page-structured-data') inSchema=true;
    for (const key of ['src','poster']) if (a[key]?.startsWith('/') && !a[key].startsWith('//')) assets.add(a[key]);
  },ontext(t) {text+=t; if(inSchema) schema+=t;},onclosetag(tag) {if(tag==='script')inSchema=false;}}).end(html);
  assert.ok(headings > 0, 'Rendered H1 '+route);
  assert.ok(text.length > 500, 'Rendered content '+route);
  const graph=JSON.parse(schema)['@graph'];
  assert.equal(graph.find((n: Record<string,string>)=>n['@type']==='WebPage').url, publicOrigin+route);
  assert.ok(!html.includes('/@fs/'));
  for (const planned of plannedDestinations) assert.ok(!html.includes(`href="${planned}"`), 'No links to planned pages');
  for (const asset of assets) await fs.access('dist'+decodeURIComponent(new URL(asset,publicOrigin).pathname));
}
const missing = await get('/seo-verification-missing-page', '404.html', 404);
assert.match(missing, /404 Page Not Found/);
assert.match(missing, /name="robots" content="noindex, nofollow"/);
assert.ok(!missing.includes('rel="canonical"'));
const privateHtml = await get('/audit/results/seo-test', 'audit-private.html');
assert.ok(!privateHtml.includes('page-structured-data'));
assert.ok(!privateHtml.includes('seo-test'));
if (base) {
  for (const route of ['/robots.txt', '/sitemap.xml']) {
    const r = await fetch(base+route);
    assert.match(r.headers.get('content-type')??'', route.endsWith('.txt') ? /text\/plain/ : /(?:application|text)\/xml/);
  }
  const r = await fetch(base+'/marketing-clarity-audit?source=seo-check', {redirect:'manual'});
  assert.ok([301,308].includes(r.status));
  assert.ok(r.headers.get('location')?.includes('/marketing-clarity-assesment?source=seo-check'));
  const privateResponse=await fetch(base+'/audit/results/seo-test');
  assert.match(privateResponse.headers.get('x-robots-tag')??'', /noindex/);
  assert.match(privateResponse.headers.get('cache-control')??'', /no-store/);
}
console.log(`PASS: ${indexablePagePaths.length} rendered pages, assets, structured data, sitemap, robots, routes, 404 and private exclusions${base ? ' over HTTP' : ''}`);
