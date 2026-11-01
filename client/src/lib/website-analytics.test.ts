import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyticsPage, safeReferrer, updateAnalytics, measurementId } from './website-analytics';

test('only registered public paths are measurable; tokens and queries never become page locations', () => {
  for (const path of ['/audit/results/secret', '/audit/resume/secret', '/audit/start', '/checkout/strategy-sprint/thank-you', '/unknown', '/about?email=private@example.com']) assert.equal(analyticsPage(path), null);
  assert.equal(analyticsPage('/about/')?.page_location, 'https://www.clarity-engine.org/about');
  assert.equal(safeReferrer('https://www.clarity-engine.org/audit/results/secret?email=private@example.com'), 'https://www.clarity-engine.org/');
});

test('requires consent and production, deduplicates views, disables collection on private routes', () => {
  const scripts: unknown[] = [];
  const w: any = {};
  Object.assign(globalThis, { window: w, location: { hostname: 'www.clarity-engine.org' }, document: { referrer: '', createElement: () => ({}), head: { appendChild: (script: unknown) => scripts.push(script) } } });
  updateAnalytics('/', false);
  assert.equal(scripts.length, 0);
  updateAnalytics('/', true);
  updateAnalytics('/', true);
  assert.equal(scripts.length, 1);
  const views = () => w.dataLayer.filter((args: any) => args[0] === 'event' && args[1] === 'page_view');
  assert.equal(views().length, 1);
  updateAnalytics('/about', true);
  assert.equal(views().length, 2);
  updateAnalytics('/audit/results/secret', true);
  assert.equal(w[`ga-disable-${measurementId}`], true);
  assert.equal(JSON.stringify(w.dataLayer).includes('secret'), false);
  updateAnalytics('/about', false);
  assert.equal(views().length, 2);
});
