import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsContext, readAnalyticsConsent, saveAnalyticsConsent, updateAnalytics } from '@/lib/website-analytics';

export default function WebsiteAnalytics() {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { setConsent(readAnalyticsConsent()); setReady(true); }, []);
  useLayoutEffect(() => { updateAnalytics(pathname, ready && consent === 'granted'); }, [pathname, consent, ready]);
  if (!ready || !analyticsContext(pathname)) return null;
  const choose = (value: 'granted' | 'denied') => { saveAnalyticsConsent(value); setConsent(value); setOpen(false); };
  if (consent !== null && !open) return <button type="button" onClick={() => setOpen(true)} className="fixed bottom-2 left-2 z-40 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">Cookie settings</button>;
  return <section aria-label="Analytics cookie preferences" className="fixed bottom-3 left-3 right-3 z-[70] mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-5 text-slate-800 shadow-xl">
    <h2 className="mb-2 text-base font-semibold">Help us understand what’s useful</h2>
    <p className="text-sm leading-relaxed">With your permission, we use Google Analytics cookies to measure public-page visits, completed forms, resource downloads, and purchases (including products and revenue). Your browser and device information is shared with Google. We don’t include assessment answers, private report links, or form contents. You can change your choice in Cookie settings.</p>
    <div className="mt-4 flex flex-wrap gap-3">
      <button type="button" onClick={() => choose('denied')} className="rounded-lg border border-slate-400 px-4 py-2 text-sm font-medium">Decline analytics</button>
      <button type="button" onClick={() => choose('granted')} className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white">Allow analytics</button>
    </div>
  </section>;
}
