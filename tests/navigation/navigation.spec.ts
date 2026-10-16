import {test,expect} from '@playwright/test';
const widths=[320,390,768,820,899,900,901,960,1024,1099,1100,1280,1440];
test.beforeEach(async({context})=>{
 await context.addInitScript(()=>localStorage.setItem('ce_waitlist_modal_suppressed_until','2099-01-01'));
 await context.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
});
test('responsive header, complete mobile catalog and screenshots',async({page},info)=>{
 for(const width of widths){await page.setViewportSize({width,height:900});await page.goto('/services');const nav=page.getByRole('navigation',{name:'Main navigation'});await expect(nav).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const brand=nav.getByRole('link',{name:'Clarity Engine home'});await expect(brand).toBeInViewport();
 if(width<900){await nav.getByRole('button',{name:'Open navigation'}).click();const dialog=page.getByRole('dialog',{name:'Navigation'});await expect(dialog).toBeVisible();await dialog.getByRole('button',{name:'Tools & Kits',exact:true}).click();await expect(dialog.getByRole('link',{name:'Multi-location Creative Engine',exact:false})).toBeVisible();await expect(dialog.getByRole('link',{name:'Find Your Next Step',exact:false})).toBeVisible();if([320,390,768,1024].includes(width)){await page.screenshot({path:`output/navigation-review/${info.project.name}-${width}-tools.png`});}await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(nav.getByRole('button',{name:'Open navigation'})).toBeFocused();
 }else{await nav.getByRole('button',{name:'Solutions',exact:true}).click();await expect(nav.getByRole('link',{name:'Compare ways to work together',exact:false})).toBeVisible();await page.waitForTimeout(240);await page.screenshot({path:`output/navigation-review/${info.project.name}-${width}-solutions.png`});await page.keyboard.press('Escape');}
 }
});
test('desktop disclosure keyboard, outside click, focus exit, links and history',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/services');const nav=page.getByRole('navigation',{name:'Main navigation'}),solutions=nav.getByRole('button',{name:'Solutions',exact:true}),tools=nav.getByRole('button',{name:'Tools & Kits',exact:true});
 await solutions.focus();await page.keyboard.press('Enter');await expect(solutions).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Tab');await expect(tools).toBeFocused();await page.keyboard.press('Space');await expect(solutions).toHaveAttribute('aria-expanded','false');await expect(tools).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(tools).toBeFocused();
 await solutions.click();await page.mouse.click(24,800);await expect(solutions).toHaveAttribute('aria-expanded','false');await solutions.click();await page.locator('h1').evaluate(el=>{el.setAttribute('tabindex','-1');(el as HTMLElement).focus();});await expect(solutions).toHaveAttribute('aria-expanded','false');
 await solutions.click();await nav.getByRole('link',{name:'30-Day Growth Strategy Sprint',exact:false}).click();await expect(page).toHaveURL(/strategy-sprint$/);await expect(solutions).toHaveAttribute('aria-expanded','false');await page.goBack();await expect(page).toHaveURL(/services$/);
 await tools.click();const kit=nav.getByRole('link',{name:'The Anti-AI Slop Website Kit',exact:false});expect(await kit.getAttribute('href')).toBe('/tools/anti-ai-slop-website-kit');await expect(kit).toContainText('Coming soon');
});
test('mobile modal trap, scroll restoration, routing focus and resize cleanup',async({page})=>{
 await page.setViewportSize({width:390,height:640});await page.goto('/services');await page.waitForTimeout(250);await page.evaluate(()=>scrollTo({top:300,behavior:'instant'}));const before=await page.evaluate(()=>scrollY);const opener=page.getByRole('button',{name:'Open navigation'});await opener.click();const dialog=page.getByRole('dialog',{name:'Navigation'});await expect(page.locator('body')).toHaveAttribute('data-scroll-locked','1');
 for(let i=0;i<14;i++){await page.keyboard.press('Tab');expect(await dialog.evaluate(d=>d.contains(document.activeElement))).toBe(true);}
 await page.keyboard.press('Escape');await expect(opener).toBeFocused();expect(await page.evaluate(()=>scrollY)).toBe(before);await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
 await opener.click();await dialog.getByRole('link',{name:'About',exact:true}).click();await expect(page).toHaveURL(/about$/);await expect(dialog).not.toBeVisible();await expect(page.locator('h1')).toBeFocused();
 await opener.click();await page.setViewportSize({width:1440,height:900});await expect(dialog).not.toBeVisible();await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
});
test('short landscape, reflow and reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:844,height:390});await page.goto('/services');await page.getByRole('button',{name:'Open navigation'}).click();const dialog=page.getByRole('dialog',{name:'Navigation'});await dialog.getByRole('button',{name:'Solutions',exact:true}).click();await dialog.getByRole('link',{name:'Find Your Next Step',exact:false}).scrollIntoViewIfNeeded();await expect(dialog.getByRole('link',{name:'Find Your Next Step',exact:false})).toBeInViewport();expect(await dialog.evaluate(el=>getComputedStyle(el).animationName)).toBe('none');await page.keyboard.press('Escape');await page.setViewportSize({width:640,height:450});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('existing destination pages, intentional planned routes and unchanged focused header',async({page})=>{
 for(const path of ['/services','/case-studies','/about','/ways-to-work-together','/strategy-sprint','/growth-clarity-audit','/marketing-clarity-assesment']){await page.goto(path);await expect(page.locator('h1').first()).toBeVisible();await expect(page.getByText('404 Page Not Found',{exact:false})).not.toBeVisible();}
 for(const path of ['/checkout/strategy-sprint','/checkout/audit','/checkout/audit/new-next-steps','/audit/start']){await page.goto(path);await expect(page.locator('.ce-navigation')).toHaveCount(0);await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();}
 await page.goto('/ways-to-work-together');for(const id of ['intro','retainer'])await expect(page.locator('#'+id)).toHaveCount(1);
});
test('existing exit-intent popup takes precedence over mobile navigation',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Open navigation'}).click();await expect(page.getByRole('dialog',{name:'Navigation'})).toBeVisible();
 await page.evaluate(()=>{localStorage.removeItem('ce_waitlist_modal_suppressed_until');document.dispatchEvent(new MouseEvent('mouseout',{clientY:0,relatedTarget:null,bubbles:true}));});
 await expect(page.getByTestId('exit-intent-modal')).toBeVisible();await expect(page.getByRole('dialog',{name:'Navigation'})).not.toBeVisible();await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');await expect.poll(()=>page.getByTestId('exit-intent-modal').evaluate(el=>el.contains(document.activeElement))).toBe(true);
});
test('visible links have valid targets and navigation adds no runtime errors',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await page.setViewportSize({width:1440,height:900});await page.goto('/services');const nav=page.getByRole('navigation',{name:'Main navigation'});
 for(const name of ['Solutions','Tools & Kits','Resources']){await nav.getByRole('button',{name,exact:true}).click();const links=await nav.locator('.ce-nav-dropdown:visible a').evaluateAll(as=>as.map(a=>({href:a.getAttribute('href'),status:a.getAttribute('data-destination-status'),text:a.textContent})));expect(links.length).toBeGreaterThan(0);for(const link of links){expect(link.href).toMatch(/^\//);expect(link.href).not.toBe('/#');if(link.status==='planned')expect(link.text).toContain('Coming soon');}await page.keyboard.press('Escape');}
 expect(errors).toEqual([]);
});

test('verified hub section links clear the fixed header',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/services');await page.getByRole('button',{name:'Solutions',exact:true}).click();await page.getByRole('link',{name:'Growth Retainer',exact:false}).click();await expect(page).toHaveURL(/ways-to-work-together#retainer$/);await expect.poll(()=>page.locator('#retainer').evaluate(el=>el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(80);await expect(page.locator('#retainer')).toBeInViewport();
});
test('modified-click opens an information page in a new tab',async({page,context})=>{
 await page.setViewportSize({width:1100,height:900});await page.goto('/services');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);const nav=page.getByRole('navigation',{name:'Main navigation'});await nav.getByRole('button',{name:'Solutions',exact:true}).click();const opened=context.waitForEvent('page');await nav.getByRole('link',{name:'30-Day Growth Strategy Sprint',exact:false}).click({modifiers:['Meta']});const other=await opened;await other.waitForLoadState('domcontentloaded');expect(other.url()).toContain('/strategy-sprint');await expect(page).toHaveURL(/services$/);await other.close();
});
test('compact full navigation and every dropdown fit at boundary and short height',async({page})=>{
 for(const width of [900,901,960,1024,1099,1100]){
  await page.setViewportSize({width,height:540});await page.goto('/services');await page.evaluate(()=>document.fonts.ready);
  const nav=page.getByRole('navigation',{name:'Main navigation'});
  for(const name of ['Solutions','Tools & Kits','Resources'])await expect(nav.getByRole('button',{name,exact:true})).toBeInViewport();
  for(const name of ['Case Studies','About'])await expect(nav.getByRole('link',{name,exact:true})).toBeInViewport();
  for(const name of ['Solutions','Tools & Kits','Resources']){await nav.getByRole('button',{name,exact:true}).click();const panel=nav.locator('.ce-nav-dropdown:visible');expect(await panel.evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&el.scrollWidth<=el.clientWidth&&r.bottom<=innerHeight;})).toBe(true);await page.keyboard.press('Escape');}
 }
});
test('resize cleanup moves keyboard focus onto visible controls in both directions',async({page})=>{
 await page.setViewportSize({width:900,height:800});await page.goto('/services');const solutions=page.getByRole('button',{name:'Solutions',exact:true});await solutions.click();await page.setViewportSize({width:899,height:800});const opener=page.getByRole('button',{name:'Open navigation'});await expect(opener).toBeFocused();await opener.click();await expect(page.getByRole('dialog',{name:'Navigation'})).toBeVisible();await page.setViewportSize({width:900,height:800});await expect(page.getByRole('dialog',{name:'Navigation'})).not.toBeVisible();await expect(solutions).toBeFocused();await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');expect(await page.evaluate(()=>document.body.style.pointerEvents)).not.toBe('none');await expect(page.getByRole('navigation',{name:'Main navigation'})).not.toHaveAttribute('aria-hidden','true');
});
test('compact navigation works with touch rather than hover',async({browser})=>{
 const context=await browser.newContext({viewport:{width:960,height:800},hasTouch:true,isMobile:true});await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());const page=await context.newPage();await page.goto('http://127.0.0.1:4316/services');await page.getByRole('button',{name:'Tools & Kits',exact:true}).tap();await expect(page.getByRole('link',{name:'Multi-location Creative Engine',exact:false})).toBeVisible();await page.getByRole('button',{name:'Tools & Kits',exact:true}).tap();await expect(page.getByRole('button',{name:'Tools & Kits',exact:true})).toHaveAttribute('aria-expanded','false');await context.close();
});
