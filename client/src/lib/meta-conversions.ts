import type { Receipt } from './website-analytics';
let pending: Receipt | null = null;
let sending = false;
let attempts = 0;
let listening = false;
const granted = () => { try { return localStorage.getItem('ce-meta-consent-v1') === 'granted'; } catch { return false; } };
function cookie(name:string) { return document.cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='))?.slice(name.length+1); }
async function flush() {
  if (sending || !pending?.meta_proof || !granted() || location.hostname !== 'www.clarity-engine.org') return;
  const receipt = pending, key = 'ce-meta-purchase-'+receipt.transaction_id;
  try { if (localStorage.getItem(key)) { pending=null; return; } } catch { /* Server also deduplicates. */ }
  const fbp = cookie('_fbp'), fbc = cookie('_fbc');
  attempts++;
  if (!fbp) { if(attempts<3) setTimeout(()=>void flush(),3000); return; }
  sending=true;
  try {
    const response = await fetch('/api/audit/meta-purchase',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({proof:receipt.meta_proof,consent:true,fbp,...(fbc?{fbc}:{})}),signal:AbortSignal.timeout(12000)});
    if (!response.ok) throw new Error('Conversion unavailable');
    pending=null;
    try { localStorage.setItem(key,'1'); } catch { /* Server deduplication remains authoritative. */ }
  } catch { if (attempts<3) setTimeout(()=>void flush(),5000); }
  finally { sending=false; }
}
export function queueMetaPurchase(receipt:Receipt) {
  if (!receipt.meta_proof) return;
  pending=receipt; attempts=0;
  if (!listening) { listening=true; window.addEventListener('ce-advertising-consent-change',()=> { if(granted()) void flush(); else pending=null; }); }
  void flush();
}
