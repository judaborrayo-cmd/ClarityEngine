import { test, expect } from "./local-fonts";
import { readFileSync, mkdirSync } from "node:fs";
const questions = JSON.parse(readFileSync(new URL("../shared/marketing-clarity-audit/questionnaire.json", import.meta.url), "utf8")).questions as { id: string; sectionId: number }[];
test("Stage A immediate roadmap, ranked stack, reduced motion and clipboard preserve frozen results", async ({ page }, info) => {
  mkdirSync("tmp/stage-a-review", { recursive: true });
  for (const scenario of ["healthy", "offer", "foundation"]) {
    await page.goto("/marketing-clarity-assesment");
    await page.getByRole("button", { name: "Get My Clarity Assessment — $27" }).first().click();
    await expect(page.getByRole("heading", { name: "Start with your business. Find your next growth opportunity." })).toBeVisible();
    const token=page.url().split("/").at(-1)!;
    const headers={origin:"http://127.0.0.1:4307"};
    await page.request.put(`/api/audit/${token}/context`,{headers,data:{name:"Fictional Review Customer",email:"review@example.com",companyName:"Clarity Review Studio",websiteUrl:"https://example.com",businessType:"professional_services",primaryMarketingGoal:"leads"}});
    const overrides: Record<string,string> = scenario === "foundation" ? {T1:"D",T2:"D",T3:"C",T4:"D",T5:"C",T6:"C",ML1:"B",ML2:"C",ML3:"C",ML4:"D",ML5:"C",ML6:"B"} : {};
    for(const q of questions) await page.request.put(`/api/audit/${token}/answer`,{headers,data:{questionId:q.id,answer:overrides[q.id]??(scenario==="offer"&&q.sectionId===1?"D":"A")}});
    const frozen=(await (await page.request.post(`/api/audit/${token}/complete`,{headers})).json()).report;
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.goto(`/audit/results/${token}`);
    await expect(page.getByRole("heading",{name:"Your High Growth Opportunities",level:1,exact:true})).toBeVisible();
    await expect(page.locator(".growth-seed").first()).toHaveCSS("animation-name","none");
    await expect(page.locator(".not-yet-module")).toHaveCount(0);
    if(scenario==="foundation") {
      expect(frozen.diagnosis.primary.sectionId).toBe(6);
      expect(frozen.diagnosis.sectionScores[5]).toBeLessThan(frozen.diagnosis.sectionScores[6]);
      await expect(page.locator(".growth-precedence summary")).toBeVisible();
      await expect(page.locator(".growth-report-hero")).toContainText("Your Next Opportunity");
    } else await expect(page.locator(".growth-roadmap-companion")).not.toContainText("Your Next Opportunity");
    const ids=await page.locator(".snapshot-clarity-stack li").evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute("data-layer-id"))));
    expect(ids).toEqual(Object.keys(frozen.diagnosis.sectionScores).map(Number).sort((a,b)=>frozen.diagnosis.sectionScores[b]-frozen.diagnosis.sectionScores[a]||a-b));
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
    await page.screenshot({path:`tmp/stage-a-review/${info.project.name}-${scenario}-hero.png`,fullPage:false});
    await page.locator(".clarity-snapshot").screenshot({path:`tmp/stage-a-review/${info.project.name}-${scenario}-stack.png`,style:'nav[aria-label="Main navigation"] { visibility:hidden; }'});
    await page.context().grantPermissions(["clipboard-read","clipboard-write"]);
    await page.getByRole("button",{name:"Copy Private Link",exact:true}).click();
    await expect(page.getByRole("status").filter({hasText:"Private link copied"})).toBeVisible();
    expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe(page.url());
    expect((await (await page.request.get(`/api/audit/${token}/report`)).json()).report).toEqual(frozen);
  }
});
