import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsContext, readAnalyticsConsent, saveAnalyticsConsent, updateAnalytics } from '@/lib/website-analytics';
import { readAdvertisingConsent, saveAdvertisingConsent, updateAdvertising } from '@/lib/website-advertising';

type Choice = 'granted' | 'denied' | null;
export default function WebsiteAnalytics() {
  const { pathname, search, hash } = useLocation();
  const [consent, setConsent] = useState<Choice>(null);
  const [ads, setAds] = useState<Choice>(null);
  const [analyticsSelected, setAnalyticsSelected] = useState(false);
  const [adsSelected, setAdsSelected] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const analytics = readAnalyticsConsent(); const advertising = readAdvertisingConsent();
    setConsent(analytics); setAds(advertising);
    setAnalyticsSelected(analytics === 'granted'); setAdsSelected(advertising === 'granted'); setReady(true);
  }, []);
  useLayoutEffect(() => { updateAnalytics(pathname, ready && consent === 'granted'); }, [pathname, consent, ready]);
  useLayoutEffect(() => { updateAdvertising(pathname, ready && ads === 'granted'); }, [pathname, search, hash, consent, ads, ready]);
  if (!ready || !analyticsContext(pathname)) return null;
  const choose = (analytics: boolean, advertising: boolean) => {
    const a = analytics ? 'granted' : 'denied'; const m = advertising ? 'granted' : 'denied';
    saveAnalyticsConsent(a); saveAdvertisingConsent(m); setConsent(a); setAds(m);
    setAnalyticsSelected(analytics); setAdsSelected(advertising); setOpen(false);
  };
  if (consent !== null && ads !== null && !open) return <button type="button" onClick={() => setOpen(true)} className="fixed bottom-2 left-2 z-40 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">Cookie settings</button>;
  return <section aria-label="Cookie preferences" className="fixed bottom-3 left-3 right-3 z-[70] mx-auto max-h-[85vh] max-w-xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 text-slate-800 shadow-xl">
    <h2 className="mb-2 text-base font-semibold">Choose how we use cookies</h2>
    <p className="text-sm leading-relaxed">Optional cookies help us understand visits and measure advertising. You can choose each purpose separately and change your choices in Cookie settings.</p>
    <label className="mt-3 flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1" checked={analyticsSelected} onChange={e => setAnalyticsSelected(e.target.checked)} /><span><strong>Analytics</strong> — Google Analytics measures visits, completed forms, downloads, and purchases, including products and revenue. Browser and device information is shared with Google; assessment answers, form contents, and private report links are excluded.</span></label>
    <label className="mt-3 flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1" checked={adsSelected} onChange={e => setAdsSelected(e.target.checked)} /><span><strong>Advertising</strong> — Google Ads, Meta Pixel, and server-side conversion tracking use eligible public-page visits, successful inquiries, confirmed purchases (product, value and currency), browser information, and cookie identifiers to measure ads and support relevant advertising. Inquiry messages and contact details are excluded from conversion reports. Private assessment and report pages are excluded.</span></label>
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" onClick={() => choose(false, false)} className="rounded-lg border border-slate-400 px-4 py-2 text-sm font-medium">Reject optional</button>
      <button type="button" onClick={() => choose(analyticsSelected, adsSelected)} className="rounded-lg border border-slate-400 px-4 py-2 text-sm font-medium">Save choices</button>
      <button type="button" onClick={() => choose(true, true)} className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white">Allow all</button>
    </div>
  </section>;
}
