import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { Parser } from 'htmlparser2';
import sharp from 'sharp';
import { getPageMetadata, metadataTags, pageHtmlFile, pageMetadataRegistry, publicPagePaths } from '../shared/page-metadata';
const base=process.env.METADATA_BASE;
async function resource(path:string){if(base){const r=await fetch(base+path);assert.equal(r.status,200,path);return {bytes:Buffer.from(await r.arrayBuffer()),type:r.headers.get('content-type')??''};}return {bytes:await fs.readFile('dist'+path),type:''};}
const titles=new Set<string>();
for(const path of publicPagePaths){
 const response=await resource(base?path:'/'+pageHtmlFile(path));
 if(base)assert.match(response.type,/text\/html/);
 const html=response.bytes.toString();const tags=new Map<string,string[]>();let title='';let inTitle=false;let canonical:string[]=[];
 new Parser({onopentag(name,a){if(name==='title')inTitle=true;if(name==='meta'){const key=a.property??a.name;if(key)tags.set(key,[...(tags.get(key)??[]),a.content]);}if(name==='link'&&a.rel==='canonical')canonical.push(a.href);},ontext(t){if(inTitle)title+=t;},onclosetag(n){if(n==='title')inTitle=false;}}).end(html);
 const m=getPageMetadata(path);assert.equal(title,m.title,path);assert.ok(!titles.has(title),'Unique title '+path);titles.add(title);
 assert.deepEqual(canonical,[m.canonical],path);
 for(const [key,value] of Object.entries(metadataTags(m)))assert.deepEqual(tags.get(key),[value],path+' '+key);
 assert.equal((html.match(/<title\b/g)??[]).length,1);
 if(!m.noindex)assert.equal(tags.has('robots'),false);
 const image=await resource(new URL(m.image).pathname);if(base)assert.match(image.type,/image\/jpeg/);const info=await sharp(image.bytes).metadata();assert.equal(info.format,'jpeg');assert.equal(info.width,1200);assert.equal(info.height,630);
 if(base && path!=='/'){const trailing=await resource(path+'/');assert.ok(trailing.bytes.toString().includes(`<title>${m.title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}</title>`),'Trailing slash '+path);}
 console.log('PASS',path);
}
for(const path of ['/images/clarity-engine-favicon.png','/images/apple-touch-icon.png']){const r=await resource(path);assert.equal((await sharp(r.bytes).metadata()).format,'png');if(base)assert.match(r.type,/image\/png/);}
const privateHtml=(await resource(base?'/audit/results/metadata-test':'/audit-private.html')).bytes.toString();assert.match(privateHtml,/Private Get Clarity Assessment/);assert.equal((privateHtml.match(/name="robots"/g)??[]).length,1);assert.ok(!privateHtml.includes('metadata-test'));assert.ok(!privateHtml.includes('rel="canonical"'));
if(base){const r=await fetch(base+'/audit/results/metadata-test');assert.match(r.headers.get('x-robots-tag')??'',/noindex/);assert.match(r.headers.get('cache-control')??'',/no-store/);}
assert.equal(pageMetadataRegistry['/ways-to-work-together'].draft,true);assert.ok(!publicPagePaths.includes('/ways-to-work-together'));await assert.rejects(fs.access('dist/'+pageHtmlFile('/ways-to-work-together')));
console.log('PASS icons, generic private HTML, draft exclusion');
