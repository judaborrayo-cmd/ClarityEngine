import { auditTerms } from './audit-terms';
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Provide the complete policy in the initial response, including without JavaScript.
export function auditTermsHtml(html: string, pathname: string) {
  if (pathname.replace(/\/$/, '') !== '/terms-of-service') return html;
  const content = `<main class="ce-terms"><header><p class="ce-terms-label">Invision Group Inc. · Operating as Clarity Engine</p><h1>Terms of Service</h1><p class="ce-terms-intro">Clear terms for the $3,725 Deep Dive Growth Audit.</p><p>Effective ${escape(auditTerms.effectiveDate)}</p><p>Contact: <a href="mailto:${auditTerms.email}">${auditTerms.email}</a></p></header><nav aria-label="Terms contents"><p><strong>On this page</strong></p><ul>${auditTerms.sections.map(s => `<li><a href="#${s.id}">${escape(s.title)}</a></li>`).join('')}</ul></nav>${auditTerms.sections.map(s => `<section id="${s.id}" aria-labelledby="${s.id}-title"><h2 id="${s.id}-title">${escape(s.title)}</h2>${s.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}</section>`).join('')}<p class="ce-terms-return"><a href="/checkout/deep-dive-growth-audit">Review the $3,725 Audit →</a></p></main>`;
  return html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
}
