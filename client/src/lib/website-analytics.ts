import { getPageMetadata, indexablePagePaths, publicOrigin } from '../../../shared/page-metadata';

export const measurementId = 'G-T4SMFB5CTF';
export const containerId = 'GTM-N4JXQLWJ';
export const consentKey = 'ce-analytics-consent-v2';
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: any[]) => void; 'ga-disable-G-T4SMFB5CTF'?: boolean };
let initialized = false;
let previousPage = '';
const sentPurchases = new Set<string>();
let pendingReceipt: Receipt | null = null;
export type Receipt = { transaction_id: string; currency: 'USD'; value: number; items: { item_id: string; item_name: string; price: number; quantity: number }[] };
export const assessmentItem = { item_id: 'clarity-assessment', item_name: 'Get Clarity Assessment', price: 27, quantity: 1 };
export const sprintItem = { item_id: 'strategy-sprint', item_name: '30-Day Growth Strategy Sprint', price: 697, quantity: 1 };

export function analyticsPage(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/';
  return indexablePagePaths.includes(path) ? { page_location: publicOrigin + path, page_title: getPageMetadata(path).title } : null;
}
// Private workflow events use the public offer as context; never expose tokens or query strings.
export function analyticsContext(pathname: string) {
  return analyticsPage(pathname) || (/^\/audit\/(start|resume\/[^/?]+|results\/[^/?]+)$/.test(pathname)
    ? analyticsPage('/marketing-clarity-assesment')
    : /^\/checkout\/strategy-sprint(?:\/thank-you)?$/.test(pathname) ? analyticsPage('/strategy-sprint') : null);
}
export function readAnalyticsConsent(): 'granted' | 'denied' | null {
  try { const value = localStorage.getItem(consentKey); return value === 'granted' || value === 'denied' ? value : null; } catch { return null; }
}
export function safeReferrer(value: string) {
  try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.origin + '/' : ''; } catch { return ''; }
}
function enable(pathname: string, consent: boolean) {
  const w = window as AnalyticsWindow;
  const page = analyticsContext(pathname);
  const enabled = consent && !!page && location.hostname === 'www.clarity-engine.org';
  w[`ga-disable-${measurementId}`] = !enabled;
  if (!enabled || !page) return null;
  initializeTagManager(true);
  return page;
}
export function initializeTagManager(analyticsConsent: boolean) {
  if (location.hostname !== 'www.clarity-engine.org') return;
  const w = window as AnalyticsWindow;
  if (!initialized) {
    initialized = true;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer!.push(arguments); };
    // Google advertising stays denied; Meta has its own explicit consent gate.
    w.gtag('consent', 'default', { analytics_storage: analyticsConsent ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
    document.head.appendChild(script);
  }
  w.gtag?.('consent', 'update', { analytics_storage: analyticsConsent ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
}
export function updateAnalytics(pathname: string, consent: boolean) {
  const page = enable(pathname, consent);
  if (page && pendingReceipt) trackPurchase(pendingReceipt);
  if (!page || !analyticsPage(pathname)) { previousPage = ''; return; }
  if (previousPage === page.page_location) return;
  pushEvent('page_view', page, { page_referrer: previousPage || safeReferrer(document.referrer) });
  previousPage = page.page_location;
}
function pushEvent(name: string, page: NonNullable<ReturnType<typeof analyticsPage>>, params: Record<string, unknown>) {
  (window as AnalyticsWindow).dataLayer!.push({ ce_params: null });
  (window as AnalyticsWindow).dataLayer!.push({ event: 'ce_analytics', ce_event_name: name, ce_params: { ...page, page_referrer: safeReferrer(document.referrer), ...params } });
}
export function trackWebsiteEvent(name: 'form_submit' | 'assessment_complete' | 'file_download' | 'begin_checkout' | 'purchase', params: Record<string, unknown>) {
  try {
    const page = enable(location.pathname, readAnalyticsConsent() === 'granted');
    if (!page) return false;
    pushEvent(name, page, params);
    return true;
  } catch { return false; }
}
// Give GTM time to dispatch before navigating to Stripe; never block checkout on analytics.
export function trackAssessmentCheckout(): Promise<void> {
  return new Promise(resolve => {
    try {
      const page = enable(location.pathname, readAnalyticsConsent() === 'granted');
      if (!page) { resolve(); return; }
      const timer = setTimeout(resolve, 1200);
      const layer = (window as AnalyticsWindow).dataLayer!;
      layer.push({ ce_params: null });
      layer.push({ event: 'ce_analytics', ce_event_name: 'begin_checkout', ce_params: { ...page, page_referrer: safeReferrer(document.referrer), currency: 'USD', value: 27, items: [assessmentItem] }, eventCallback: () => { clearTimeout(timer); resolve(); }, eventTimeout: 1000 });
    } catch { resolve(); }
  });
}
export function trackPurchase(receipt: Receipt) {
  if (!receipt || !/^ce_[a-f0-9]{64}$/.test(receipt.transaction_id) || receipt.currency !== 'USD' || !Number.isFinite(receipt.value) || receipt.value < 0) return;
  const key = `ce-purchase-${receipt.transaction_id}`;
  try { if (sentPurchases.has(key) || localStorage.getItem(key)) return; } catch { if (sentPurchases.has(key)) return; }
  if (!trackWebsiteEvent('purchase', receipt)) { pendingReceipt = receipt; return; }
  pendingReceipt = null;
  sentPurchases.add(key);
  try { localStorage.setItem(key, '1'); } catch { /* GA also deduplicates transaction IDs. */ }
}
export function saveAnalyticsConsent(value: 'granted' | 'denied') {
  try { localStorage.setItem(consentKey, value); } catch { /* Storage may be unavailable. */ }
  if (value === 'denied') {
    pendingReceipt = null;
    (window as AnalyticsWindow)[`ga-disable-${measurementId}`] = true;
    (window as AnalyticsWindow).gtag?.('consent', 'update', { analytics_storage: 'denied' });
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (name === '_ga' || name.startsWith('_ga_')) for (const domain of ['', '; domain=www.clarity-engine.org', '; domain=.clarity-engine.org']) document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
    }
  }
  window.dispatchEvent(new Event('ce-consent-change'));
}
