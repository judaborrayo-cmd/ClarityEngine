import { analyticsPage, initializeTagManager, readAnalyticsConsent } from './website-analytics';

export const advertisingConsentKey = 'ce-meta-consent-v1';
export const metaPixelId = '1726701150950329';
type MetaWindow = Window & { fbq?: (...args: unknown[]) => void; dataLayer?: unknown[] };
let previousPage = '';
export function readAdvertisingConsent(): 'granted' | 'denied' | null {
  try { const value = localStorage.getItem(advertisingConsentKey); return value === 'granted' || value === 'denied' ? value : null; } catch { return null; }
}
// Meta reads the browser URL itself. Block private paths and arbitrary URL payloads,
// including private links in the referrer, rather than trying to override those fields.
export function advertisingPageAllowed(pathname: string, search: string, hash: string, referrer: string) {
  if (!analyticsPage(pathname) || hash) return false;
  let unknownQuery = false;
  new URLSearchParams(search).forEach((value, key) => {
    if (!/^(gtm_debug|fbclid|gclid|gbraid|wbraid|utm_source|utm_medium|utm_campaign|utm_id|utm_content|utm_term)$/.test(key) || !/^[a-zA-Z0-9_.~ +\-]{0,512}$/.test(value)) unknownQuery = true;
  });
  if (unknownQuery) return false;
  if (referrer) {
    try {
      const ref = new URL(referrer);
      if (ref.search || ref.hash || (ref.hostname === 'www.clarity-engine.org' && !analyticsPage(ref.pathname))) return false;
    } catch { return false; }
  }
  return true;
}
export function updateAdvertising(pathname: string, consent: boolean) {
  const w = window as MetaWindow;
  const allowed = consent && location.hostname === 'www.clarity-engine.org' && advertisingPageAllowed(pathname, location.search, location.hash, document.referrer);
  if (!allowed) {
    w.fbq?.('consent', 'revoke');
    previousPage = '';
    return;
  }
  initializeTagManager(readAnalyticsConsent() === 'granted');
  if (previousPage === pathname) return;
  w.dataLayer!.push({ event: 'ce_meta_page_view', ce_meta_path: pathname });
  previousPage = pathname;
}
export function saveAdvertisingConsent(value: 'granted' | 'denied') {
  try { localStorage.setItem(advertisingConsentKey, value); } catch { /* Fail closed in the GTM tag if storage is unavailable. */ }
  if (value === 'denied') {
    (window as MetaWindow).fbq?.('consent', 'revoke');
    previousPage = '';
    for (const name of ['_fbp', '_fbc']) for (const domain of ['', '; domain=www.clarity-engine.org', '; domain=.clarity-engine.org']) document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
  }
}
