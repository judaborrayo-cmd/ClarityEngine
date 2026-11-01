import { test } from 'node:test';
import assert from 'node:assert/strict';
import { advertisingPageAllowed, readAdvertisingConsent, advertisingConsentKey, saveAdvertisingConsent, updateAdvertising } from './website-advertising';
test('Meta gate blocks private URLs, URL payloads and private referrers', () => {
  assert.equal(advertisingPageAllowed('/', '', '', ''), true);
  assert.equal(advertisingPageAllowed('/services', '?gtm_debug=123', '', ''), true);
  for (const args of [ ['/audit/results/private-token', '', '', ''], ['/', '?email=person@example.com', '', ''], ['/', '', '#secret', ''], ['/', '', '', 'https://www.clarity-engine.org/audit/results/private-token'], ['/', '', '', 'https://example.com/?secret=1'] ]) assert.equal(advertisingPageAllowed(...args as [string,string,string,string]), false);
});
test('Analytics consent alone cannot grant Meta consent; rejection revokes Meta', () => {
  const values = new Map([['ce-analytics-consent-v2','granted']]);
  const calls: unknown[][]=[];
  Object.assign(globalThis,{localStorage:{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v)},window:{fbq:(...args:unknown[])=>calls.push(args)},document:{cookie:'',referrer:''},location:{hostname:'www.clarity-engine.org',search:'',hash:''}});
  assert.equal(readAdvertisingConsent(),null);
  updateAdvertising('/',false);
  assert.deepEqual(calls.pop(),['consent','revoke']);
  saveAdvertisingConsent('denied');
  assert.equal(values.get(advertisingConsentKey),'denied');
  assert.deepEqual(calls.pop(),['consent','revoke']);
});
