import { indexablePagePaths, publicOrigin } from '../../../shared/page-metadata';
export const attributionKey = 'ce-campaign-attribution-v1';
const lifetime = 30 * 24 * 60 * 60 * 1000;
const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id'];
const clickKeys = ['gclid','gbraid','wbraid','fbclid'];
type Touch = { at: number; landing: string; referrer: string; parameters: Record<string,string> };
type Attribution = { first: Touch; latest: Touch };
export function campaignParameters(search: string, advertising: boolean) {
  const query = new URLSearchParams(search), result: Record<string,string> = {};
  for (const key of [...utmKeys, ...(advertising ? clickKeys : [])]) {
    const value = query.get(key);
    // Only campaign labels/IDs; exclude arbitrary query values, email and private tokens.
    if (value && /^[a-zA-Z0-9_.~ +\-]{1,256}$/.test(value)) result[key] = value;
  }
  return result;
}
function publicPage(url: URL) {
  const path = url.pathname.replace(/\/$/,'') || '/';
  return url.origin === publicOrigin && indexablePagePaths.includes(path) ? publicOrigin + path : '';
}
export function captureAttribution(url: URL, referrer: string, analytics: boolean, advertising: boolean, storage: Storage, now=Date.now()): Attribution | null {
  try {
    if (!analytics) { storage.removeItem(attributionKey); return null; }
    let saved: Attribution | null = JSON.parse(storage.getItem(attributionKey) || 'null');
    if (!saved?.first?.parameters || !saved?.latest?.parameters || !Number.isFinite(saved.first.at) || now-saved.first.at < 0 || now-saved.first.at > lifetime) saved=null;
    if (saved && !advertising) for (const touch of [saved.first,saved.latest]) for (const key of clickKeys) delete touch.parameters[key];
    const landing=publicPage(url);
    if (landing) {
      const parameters=campaignParameters(url.search,advertising);
      let ref=''; try { const r=new URL(referrer); if (/^https?:$/.test(r.protocol) && r.origin!==publicOrigin) ref=r.origin+'/'; } catch {}
      const touch={at:now,landing,referrer:ref,parameters};
      if (!saved) saved={first:touch,latest:touch};
      else if (Object.keys(parameters).length && (saved.latest.landing!==landing || JSON.stringify(saved.latest.parameters)!==JSON.stringify(parameters))) saved.latest=touch;
    }
    if (saved) storage.setItem(attributionKey,JSON.stringify(saved));
    return saved;
  } catch { return null; }
}
export function inquiryAttributionFields() {
  const empty = {ce_utm_source:'',ce_utm_medium:'',ce_utm_campaign:'',ce_first_attribution:'',ce_latest_attribution:'',ce_submission_page:''};
  try {
    const saved=captureAttribution(new URL(location.href),document.referrer,localStorage.getItem('ce-analytics-consent-v2')==='granted',localStorage.getItem('ce-meta-consent-v1')==='granted',localStorage);
    if (!saved) return empty;
    const describe=(touch:Touch)=>JSON.stringify({...touch,at:new Date(touch.at).toISOString()});
    return {ce_utm_source:saved.latest.parameters.utm_source||'',ce_utm_medium:saved.latest.parameters.utm_medium||'',ce_utm_campaign:saved.latest.parameters.utm_campaign||'',ce_first_attribution:describe(saved.first),ce_latest_attribution:describe(saved.latest),ce_submission_page:publicPage(new URL(location.href))};
  } catch {return empty;}
}
