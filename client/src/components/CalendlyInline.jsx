import { useEffect, useRef, useState } from "react";

const CALENDLY_URL =
  "https://calendly.com/juda-borrayo/strategic-intro-call-10-20-min";

export default function CalendlyInline({ height = 720 }) {
  const containerRef = useRef(null);
  const [fallback, setFallback] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    let timeoutId;
    let script = document.getElementById("calendly-script");

    function init() {
      if (initializedRef.current) return true;
      
      if (window.Calendly && containerRef.current) {
        try {
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: containerRef.current,
          });
          initializedRef.current = true;
          return true;
        } catch (_) {
          // fall through to retry or fallback
        }
      }
      return false;
    }

    const onLoad = () => {
      init();
    };

    // Try immediately
    init();

    // Always attach load listener in case script loads later
    if (script) {
      script.addEventListener("load", onLoad);
    }

    // Give it 2s, then fallback to iframe if not initialized
    timeoutId = window.setTimeout(() => {
      if (!initializedRef.current) {
        setFallback(true);
      }
    }, 2000);

    // Cleanup function always runs on unmount
    return () => {
      if (script) {
        script.removeEventListener("load", onLoad);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
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
