import { test, expect } from './local-fonts';
import { readFileSync } from 'node:fs';
const questions=JSON.parse(readFileSync(new URL('../shared/marketing-clarity-audit/questionnaire.json',import.meta.url),'utf8')).questions as {id:string}[];
test('company identity remains readable with valid logo and text-only fallback',async({page},info)=>{
 // Existing isolated test server only; no real purchase or customer record.
 await page.goto('/marketing-clarity-assesment');
 await page.getByRole('button',{name:'Get My Clarity Assessment — $27'}).first().click();
 await expect(page.getByRole('heading',{name:'Start with your business. Find your next growth opportunity.'})).toBeVisible();
 const token=page.url().split('/').at(-1)!;
 const headers={origin:'http://127.0.0.1:4307'};
 await page.request.put(`/api/audit/${token}/context`,{headers,data:{name:'Logo QA',email:'qa@example.com',companyName:'Fixture Brand',websiteUrl:'https://example.com',businessType:'professional_services',primaryMarketingGoal:'leads'}});
 for(const q of questions)await page.request.put(`/api/audit/${token}/answer`,{headers,data:{questionId:q.id,answer:'A'}});
 const report=(await (await page.request.post(`/api/audit/${token}/complete`,{headers})).json()).report;
 let valid=false;
 await page.route('**/api/audit/**',route=>{
  const path=new URL(route.request().url()).pathname;
  if(path.endsWith('/company-logo'))return valid?route.fulfill({contentType:'image/png',body:readFileSync(new URL('../server/audit/pdf-assets/logo.png',import.meta.url))}):route.fulfill({status:204});
  if(path.endsWith('/report'))return route.fulfill({json:{report,frozenAnswers:{},localQa:true,runNumber:1,activeRun:1,completedReports:[1],retakeAvailable:false}});
  return route.fulfill({json:{entries:{},saved:true}});
 });
 for(const mode of ['fallback','valid']){
  valid=mode==='valid';await page.goto('/audit/results/local-logo-fixture');
  await expect(page.locator('.growth-report-hero')).toContainText('Fixture Brand');
  await page.locator('.growth-prepared summary').click();
  await expect(page.locator('.growth-prepared')).toContainText('https://example.com');
  if(valid)await expect(page.locator('.company-logo-asset')).toBeVisible();
  else await expect(page.locator('.company-logo-asset')).not.toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`tmp/logo-final-qa/${info.project.name}-${mode}-web.png`,fullPage:true});
 }
});
