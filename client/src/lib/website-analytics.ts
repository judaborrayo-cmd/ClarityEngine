import { getPageMetadata, indexablePagePaths, publicOrigin } from '../../../shared/page-metadata';

export const measurementId = 'G-T4SMFB5CTF';
export const consentKey = 'ce-analytics-consent-v1';
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: any[]) => void; 'ga-disable-G-T4SMFB5CTF'?: boolean };
let initialized = false;
let previousPage = '';

export function analyticsPage(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/';
  return indexablePagePaths.includes(path) ? { page_location: publicOrigin + path, page_title: getPageMetadata(path).title } : null;
}

export function readAnalyticsConsent(): 'granted' | 'denied' | null {
  try {
    const value = localStorage.getItem(consentKey);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch { return null; }
}

export function updateAnalytics(pathname: string, consent: boolean) {
  const w = window as AnalyticsWindow;
  const page = analyticsPage(pathname);
  const enabled = consent && !!page && location.hostname === 'www.clarity-engine.org';
  w[`ga-disable-${measurementId}`] = !enabled;
  if (!enabled || !page) { previousPage = ''; return; }
  if (!initialized) {
    initialized = true;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.gtag('js', new Date());
    // Automatic enhanced measurement is disabled on this web stream. Supply only
    // registered public URLs, never query strings, form answers, or private tokens.
    w.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, ...page, page_referrer: safeReferrer(document.referrer) });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
  if (previousPage === page.page_location) return;
  const referrer = previousPage || safeReferrer(document.referrer);
  w.gtag!('config', measurementId, { ...page, page_referrer: referrer, send_page_view: false });
  w.gtag!('event', 'page_view', { ...page, page_referrer: referrer, send_to: measurementId });
  previousPage = page.page_location;
}

export function safeReferrer(value: string) {
  try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.origin + '/' : ''; } catch { return ''; }
}

export function saveAnalyticsConsent(value: 'granted' | 'denied') {
  try { localStorage.setItem(consentKey, value); } catch { /* Choice still applies to this visit. */ }
  if (value === 'denied') {
    (window as AnalyticsWindow)[`ga-disable-${measurementId}`] = true;
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (name === '_ga' || name.startsWith('_ga_')) {
        for (const domain of ['', '; domain=www.clarity-engine.org', '; domain=.clarity-engine.org']) {
          document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
        }
      }
    }
  }
}
