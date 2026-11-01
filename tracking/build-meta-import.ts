import fs from 'node:fs';
import { indexablePagePaths } from '../shared/page-metadata';
const html = `<script>
(function () {
  var paths = ${JSON.stringify(indexablePagePaths)};
  function publicPath(path) { return paths.indexOf(path.replace(/\\/$/, '') || '/') !== -1; }
  function allowed() {
    try {
      if (location.hostname !== 'www.clarity-engine.org' || localStorage.getItem('ce-meta-consent-v1') !== 'granted' || !publicPath(location.pathname) || location.hash) return false;
      var keys = new URLSearchParams(location.search); var invalid = false;
      keys.forEach(function(value, key) { if (!/^(gtm_debug|fbclid|gclid|gbraid|wbraid|utm_source|utm_medium|utm_campaign|utm_id|utm_content|utm_term)$/.test(key) || !/^[a-zA-Z0-9_.~ +\\-]{0,512}$/.test(value)) invalid = true; });
      if (invalid) return false;
      if (document.referrer) { var ref = new URL(document.referrer); if (ref.search || ref.hash || (ref.hostname === location.hostname && !publicPath(ref.pathname))) return false; }
      return true;
    } catch (e) { return false; }
  }
  if (!allowed()) return;
  if (!window.fbq) {
    var n = window.fbq = function() { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!window._fbq) window._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    var script = document.createElement('script'); script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'; document.head.appendChild(script);
  }
  fbq('consent', 'grant');
  if (!window.ceMetaInitialized) {
    fbq('set', 'autoConfig', false, '1726701150950329');
    fbq('init', '1726701150950329');
    window.ceMetaInitialized = true;
  }
  fbq('trackSingle', '1726701150950329', 'PageView');
})();
</script>`;
fs.writeFileSync('tracking/meta-pixel-gtm.json', JSON.stringify({ exportFormatVersion: 2, containerVersion: {
  accountId: '6401715849', containerId: '284715162',
  container: { accountId: '6401715849', containerId: '284715162', publicId: 'GTM-N4JXQLWJ', usageContext: ['WEB'] },
  tag: [{ accountId:'6401715849',containerId:'284715162',tagId:'1001',name:'CE - Meta Pixel - consented public page views',type:'html',parameter:[{type:'TEMPLATE',key:'html',value:html},{type:'BOOLEAN',key:'supportDocumentWrite',value:'false'}],firingTriggerId:['1002'],tagFiringOption:'ONCE_PER_EVENT'}],
  trigger:[{accountId:'6401715849',containerId:'284715162',triggerId:'1002',name:'CE - advertising-consented public page view',type:'CUSTOM_EVENT',customEventFilter:[{type:'EQUALS',parameter:[{type:'TEMPLATE',key:'arg0',value:'{{_event}}'},{type:'TEMPLATE',key:'arg1',value:'ce_meta_page_view'}]}]}]
}},null,2)+'\n');
