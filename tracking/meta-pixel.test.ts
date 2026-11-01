import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const tag = JSON.parse(fs.readFileSync(new URL('./meta-pixel-gtm.json', import.meta.url),'utf8')).containerVersion.tag[0].parameter[0].value.replace(/^<script>\s*|\s*<\/script>$/g,'');
function run(consent: string, pathname='/', search='', referrer='') {
  const scripts:unknown[]=[]; const calls:unknown[][]=[];
  const context:any = { location:{hostname:'www.clarity-engine.org',pathname,search,hash:''},localStorage:{getItem:()=>consent},URL,URLSearchParams, document:{referrer,createElement:()=>({}),head:{appendChild:(s:unknown)=>scripts.push(s)}} };
  context.window=context;
  vm.runInNewContext(tag,context);
  return {scripts,calls:context.fbq?.queue?.map((a:any)=>Array.from(a))??calls};
}
test('published Meta tag blocks consent denial and private URL data',()=>{
  for (const args of [['denied'],['granted','/audit/results/secret'],['granted','/','?token=secret'],['granted','/','','https://www.clarity-engine.org/audit/results/secret']]) {
    const r=run(...args as [string,string?,string?,string?]); assert.equal(r.scripts.length,0); assert.equal(r.calls.length,0);
  }
});
test('published Meta tag sends only PageView to the intended pixel after advertising consent',()=>{
  const r=run('granted','/','?utm_source=facebook&fbclid=abc123');
  assert.equal(r.scripts.length,1);
  assert.deepEqual(r.calls.at(-1),['trackSingle','1726701150950329','PageView']);
  assert.deepEqual(r.calls[1],['set','autoConfig',false,'1726701150950329']);
});
