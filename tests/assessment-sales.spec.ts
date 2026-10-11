import { test, expect } from '@playwright/test';

test('sales draft is responsive, respects reduced motion, and hands off to isolated checkout', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/marketing-clarity-audit');
  await expect(page).toHaveTitle('Get Clarity Assessment — $27 | Clarity Engine');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Know what to focus on next.');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.locator('video').evaluate((v: HTMLVideoElement) => v.paused && v.loop && v.muted)).toBe(true);
  const poster = await page.request.get('/videos/get-clarity-assessment-poster.webp');
  expect(poster.headers()['content-type']).toContain('image/webp');
  const clip = await page.request.get('/videos/get-clarity-assessment-ping-pong.mp4');
  expect(clip.headers()['content-type']).toContain('video/mp4');
  await page.screenshot({ path: testInfo.outputPath('sales-full.png'), fullPage: true });
  await page.getByRole('link', { name: 'See what you get' }).click();
  await expect(page).toHaveURL(/#what-you-get$/);
  await expect(page.getByRole('heading', { name: 'A report you can use to make a decision.' })).toBeInViewport();
  await expect(page.locator('.gca-video-panel button')).toHaveCount(0);
  await page.getByRole('button', { name: 'Play assessment animation' }).click();
  await expect(page.getByRole('button', { name: 'Pause assessment animation' })).toBeVisible();
  await page.getByRole('button', { name: 'Pause assessment animation' }).click();
  expect(await page.locator('video').evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await expect.poll(() => page.locator('video').evaluate((v: HTMLVideoElement) => v.duration)).toBeGreaterThan(0);
  const duration = await page.locator('video').evaluate((v: HTMLVideoElement) => v.duration);
  expect(duration).toBeGreaterThan(0);
  await page.locator('video').evaluate((v: HTMLVideoElement) => new Promise<void>(resolve => { v.addEventListener('seeked', () => resolve(), { once: true }); v.currentTime = Math.max(0, v.duration - 0.1); }));
  await page.locator('video').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('video-ending.png') });
  await page.getByRole('button', { name: 'Get My Clarity Assessment — $27' }).first().click();
  await expect(page.getByRole('heading', { name: 'Tell us about your business' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Get Clarity Assessment');
  await page.goto('/checkout/audit');
  await expect(page.getByRole('heading', { name: 'Deep Dive Audit', exact: true })).toBeVisible();
});


test('animation starts automatically and the video itself pauses and resumes playback', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/marketing-clarity-audit');
  await expect.poll(() => page.locator('video').evaluate((v: HTMLVideoElement) => !v.paused && v.currentTime > 0)).toBe(true);
  await expect(page.locator('.gca-video-panel button')).toHaveCount(0);
  await page.getByRole('button', { name: 'Pause assessment animation' }).click();
  await expect.poll(() => page.locator('video').evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await page.getByRole('button', { name: 'Play assessment animation' }).focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.locator('video').evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
});
