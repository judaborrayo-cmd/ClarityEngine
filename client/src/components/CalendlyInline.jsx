import { useEffect, useRef, useState } from "react";

const CALENDLY_URL =
  "https://calendly.com/juda-borrayo/strategic-intro-call-10-20-min";

export default function CalendlyInline({ height = 720 }) {
  const containerRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let timeoutId;

    function init() {
      if (window.Calendly && containerRef.current) {
        try {
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: containerRef.current,
          });
          return true;
        } catch (_) {
          // fall through to fallback
        }
      }
      return false;
    }

    // Try immediately
    if (!init()) {
      // Try again when the script loads
      const onLoad = () => init();
      const script = document.getElementById("calendly-script");
      if (script) script.addEventListener("load", onLoad);

      // Give it 2s, then fallback to iframe
      timeoutId = window.setTimeout(() => {
        if (!init()) setFallback(true);
      }, 2000);

      return () => {
        if (script) script.removeEventListener("load", onLoad);
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }
  }, []);

  // Fallback iframe (works even if Calendly JS fails). Needs embed_domain.
  if (fallback) {
    const embedDomain =
      typeof window !== "undefined" ? window.location.hostname : "replit.dev";
    const src = `${CALENDLY_URL}?embed_domain=${embedDomain}&embed_type=Inline&hide_gdpr_banner=1`;
    return (
      <iframe
        title="Calendly"
        src={src}
        style={{ width: "100%", height }}
        frameBorder="0"
        className="rounded-2xl border border-gray-200"
        data-testid="calendly-iframe-fallback"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget rounded-2xl border border-gray-200"
      style={{ minWidth: 320, height }}
      aria-label="Calendly inline scheduler"
      data-testid="calendly-inline-widget"
    />
  );
}
