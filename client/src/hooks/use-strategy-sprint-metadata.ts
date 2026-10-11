import { useLayoutEffect } from "react";
import { defaultMetadata, getStrategySprintMetadata } from "@shared/strategy-sprint-metadata";

// Also reset the static Sprint metadata when navigating to another route in the SPA.
export function useStrategySprintMetadata(pathname: string) {
  useLayoutEffect(() => {
    const salesPage = pathname === '/marketing-clarity-assesment';
    const salesTitle = 'Get Clarity Assessment — $27 | Clarity Engine';
    const salesDescription = 'Examine six marketing areas and identify where to focus next with Get Clarity Assessment by Clarity Engine. $27, one-time payment.';
    const metadata = salesPage ? {
      ...defaultMetadata,
      title: salesTitle,
      canonical: 'https://www.clarity-engine.org/marketing-clarity-assesment',
      tags: { ...defaultMetadata.tags, description: salesDescription, 'og:title': salesTitle, 'og:description': salesDescription, 'twitter:title': salesTitle, 'twitter:description': salesDescription, 'og:url': 'https://www.clarity-engine.org/marketing-clarity-assesment' },
    } : getStrategySprintMetadata(pathname) ?? defaultMetadata;
    const privateAudit = pathname.startsWith('/audit/');
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (privateAudit) {
      if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots); }
      robots.content = 'noindex, nofollow';
      let referrer = document.head.querySelector<HTMLMetaElement>('meta[name="referrer"]');
      if (!referrer) { referrer = document.createElement('meta'); referrer.name = 'referrer'; document.head.appendChild(referrer); }
      referrer.content = 'no-referrer';
    } else {
      robots?.remove();
      document.head.querySelector('meta[name="referrer"]')?.remove();
    }
    document.title = metadata.title;
    if (privateAudit) document.title = 'Private Get Clarity Assessment | Clarity Engine';
    for (const [key, value] of Object.entries(metadata.tags)) {
      const attribute = key.startsWith("og:") ? "property" : "name";
      document.head.querySelector(`meta[${attribute}="${key}"]`)?.setAttribute("content", value);
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (metadata.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = metadata.canonical;
    } else {
      canonical?.remove();
    }
  }, [pathname]);
}
