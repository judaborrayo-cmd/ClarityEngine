import { test, expect } from './local-fonts';

test('homepage initializes the scheduler once without missing-URL auto initialization', async ({ page }) => {
  await page.route('https://assets.calendly.com/assets/external/widget.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `
      if (document.querySelector('.calendly-inline-widget:not([data-url])')) throw new Error('Scheduler auto initialization has no URL');
      window.Calendly = { initInlineWidget({url, parentElement}) {
        parentElement.dataset.schedulerUrl = url;
        const iframe = document.createElement('iframe'); iframe.title = 'Scheduler fixture';
        iframe.src = 'about:blank'; parentElement.appendChild(iframe);
      }};
    `,
  }));
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  const widget = page.getByTestId('calendly-inline-widget');
  await expect(widget.locator('iframe')).toHaveCount(1);
  await expect(widget).toHaveAttribute('data-scheduler-url', 'https://calendly.com/juda-borrayo/strategic-intro-call-10-20-min');
  await expect(page.locator('.calendly-inline-widget')).toHaveCount(0);
  expect(errors).toEqual([]);
  const script = await page.request.get('/ux-enhancements.js');
  expect(script.ok()).toBe(true);
  expect(script.headers()['content-type']).toContain('javascript');
  await page.setViewportSize({width:320,height:640});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
