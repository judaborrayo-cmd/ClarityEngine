import { useLayoutEffect } from "react";
import { defaultMetadata, getStrategySprintMetadata } from "@shared/strategy-sprint-metadata";

// Also reset the static Sprint metadata when navigating to another route in the SPA.
export function useStrategySprintMetadata(pathname: string) {
  useLayoutEffect(() => {
    const metadata = getStrategySprintMetadata(pathname) ?? defaultMetadata;
    document.title = metadata.title;
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
