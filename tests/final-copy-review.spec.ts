import { test, expect } from './local-fonts';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
const phase=process.env.REVIEW_PHASE ?? 'after';
test('existing completed QA reports: personalization and duplicate-layout review',async({page},info)=>{
 test.skip(!['offer','measurement','traffic'].every(name=>existsSync(`tmp/final-copy-review/${name}.json`)), 'Requires local read-only copies of existing completed QA reports.');
 test.setTimeout(120000);
 const out=`${process.env.REVIEW_ROOT ?? "tmp/final-copy-review"}/${phase}`;mkdirSync(out,{recursive:true});
 const findings=[];
 for(const name of ['offer','measurement','traffic']){
  const raw=readFileSync(`tmp/final-copy-review/${name}.json`,'utf8');const report=JSON.parse(raw);
  await page.route('**/api/audit/**',async route=>{
   const path=new URL(route.request().url()).pathname;
   if(path.endsWith('/report')) return route.fulfill({json:{report,frozenAnswers:{},localQa:true,runNumber:1,activeRun:1,completedReports:[1],retakeAvailable:false}});
   if(path.endsWith('/company-logo')) return route.fulfill({status:204});
   return route.fulfill({json:{entries:{},saved:true}});
  });
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/audit/results/local-read-only-qa-review');
  await expect(page.locator('.growth-report-hero')).toBeVisible();await page.evaluate(()=>document.fonts.ready);
  const moves=page.locator('#first-growth-moves'),example=page.locator('.case-module');
  await expect(moves).toHaveCount(1);await expect(example).toHaveCount(1);
  await expect(moves.locator('.recommendation')).toHaveCount(3);
  const rects=await page.evaluate(()=>{
   const rect=(s:string)=>{const el=document.querySelector(s)!;const r=el.getBoundingClientRect();return {top:r.top+scrollY,bottom:r.bottom+scrollY,position:getComputedStyle(el).position,overflow:getComputedStyle(el).overflow}};
   return {moves:rect('#first-growth-moves'),example:rect('.case-module'),width:innerWidth,scrollWidth:document.documentElement.scrollWidth};
  });
  expect(rects.example.top).toBeGreaterThanOrEqual(rects.moves.bottom-1);expect(rects.scrollWidth).toBeLessThanOrEqual(rects.width);
  if(phase==='after'){
   if(name==='measurement') await expect(moves.locator('.recommendation').nth(2)).toContainText('source → lead → qualified lead → sale → revenue');
   if(report.diagnosis.secondary){
    const next=await page.locator('.growth-roadmap-companion section').filter({hasText:'Your Next Opportunity'}).locator('p').last().innerText();
    await expect(page.locator(`.snapshot-clarity-stack [data-layer-id="${report.diagnosis.secondary.sectionId}"]`)).toHaveAttribute('data-state','supporting');
    for(const selector of ['.constraint-grid','#clarity-work-session']) {await expect(page.locator(selector)).not.toContainText(next); await expect(page.locator(selector)).toContainText(await page.locator('.growth-roadmap-companion section').filter({hasText:'Your Next Opportunity'}).locator('h2').innerText());}
    if(name==='offer') expect(next).toContain("First, validate demand with intended customers; clearer wording alone isn't demand evidence.");
    if(name==='measurement') expect(next).toBe("Once you can trust your numbers, you'll be in a much better position to identify which channels deserve more investment and which ones need another look.");
   }
   await expect(moves).toContainText('Three moves. One clear priority.');
   if(name==='offer') await expect(page.locator('.growth-roadmap-companion')).toContainText('Get Sharper About Your Best Customers');
   if(name==='measurement') await expect(page.locator('.growth-roadmap-companion')).toContainText('Build a Smarter Traffic Engine');
   if(name==='traffic'){await expect(page.locator('.growth-roadmap-companion')).not.toContainText('Your Next Opportunity');await expect(page.locator('.growth-report-hero')).toContainText('One clear priority');}
  }
  await page.screenshot({path:`${out}/${info.project.name}-${name}-full.png`,fullPage:true,animations:'disabled'});
  for(const [label,selector] of Object.entries({hero:'.growth-report-hero',snapshot:'.clarity-snapshot',moves:'#first-growth-moves',example:'.case-module',work:'#clarity-work-session'})){
   await page.locator(selector).screenshot({path:`${out}/${info.project.name}-${name}-${label}.png`,animations:'disabled',style:'nav[aria-label="Main navigation"] { visibility: hidden; }'});
  }
  await page.evaluate(()=>{const r=document.querySelector('.case-module')!.getBoundingClientRect();window.scrollTo({top:scrollY+r.top-innerHeight/2,behavior:'instant'});});
  await page.screenshot({path:`${out}/${info.project.name}-${name}-boundary.png`,animations:'disabled'});
  findings.push({scenario:name,...rects,moveModules:await moves.count(),caseModules:await example.count(),frozenUnchanged:readFileSync(`tmp/final-copy-review/${name}.json`,'utf8')===raw});
  await page.unroute('**/api/audit/**');
 }
 writeFileSync(`${out}/${info.project.name}-dom-checks.json`,JSON.stringify(findings,null,2));
});
