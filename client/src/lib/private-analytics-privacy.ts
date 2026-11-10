import {indexablePagePaths} from "../../../shared/page-metadata";
// Advertising libraries can read document.location even when analytics page fields
// are sanitized. Restrict their transport on private workflow documents as well.
export const privateWorkflowPolicy = "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com; img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com; frame-src 'self' blob:";
export function protectPrivateWorkflow() {
  if (!/^\/audit\/(?:start(?:\/|$)|resume\/|results\/)/.test(location.pathname)) {
    if (indexablePagePaths.includes(location.pathname) && document.querySelector('meta[data-private-workflow-privacy]') && typeof location.replace === 'function') location.replace(location.href);
    return;
  }
  if (document.querySelector('meta[data-private-workflow-privacy]')) return;
  const policy=document.createElement('meta');policy.httpEquiv='Content-Security-Policy';policy.content=privateWorkflowPolicy;policy.setAttribute('data-private-workflow-privacy','true');document.head.prepend(policy);
}
