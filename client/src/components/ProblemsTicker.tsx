import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ProblemsTicker – Ultra-minimal, category-toggle ticker
 * - React + Tailwind only (no external libs)
 * - One-line, subdued ticker with a tiny segmented toggle
 * - Uses CSS keyframes (injected <style>) for smooth, continuous scrolling
 */
export default function ProblemsTicker() {
  type Cat = "revenue" | "growth" | "conversion";
  const [cat, setCat] = useState<Cat>("revenue");
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<HTMLSpanElement | null>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startOffset: 0,
  });

  // Short, scannable problem phrases (keep to ~2–4 words each)
  const data: Record<Cat, string[]> = {
    revenue: [
      "Wasted ad spend",
      "Poor attribution",
      "Platform scattered",
      "Unclear ROAS",
      "Budget guesswork",
    ],
    growth: [
      "Revenue plateaus",
      "Limited reach",
      "Creative fatigue",
      "High CAC",
      "Scaling bottlenecks",
    ],
    conversion: [
      "Low conversion rates",
      "Leaky funnels",
      "Poor UX",
      "Slow pages",
      "Weak offer clarity",
    ],
  };

  // Color schemes for each category
  const colors: Record<Cat, { bg: string; bgActive: string; text: string; textLight: string; arrow: string }> = {
    revenue: {
      bg: "bg-blue-50",
      bgActive: "bg-blue-500",
      text: "text-blue-900",
      textLight: "text-blue-700",
      arrow: "text-blue-300"
    },
    growth: {
      bg: "bg-green-50",
      bgActive: "bg-green-500",
      text: "text-green-900",
      textLight: "text-green-700",
      arrow: "text-green-300"
    },
    conversion: {
      bg: "bg-purple-50",
      bgActive: "bg-purple-500",
      text: "text-purple-900",
      textLight: "text-purple-700",
      arrow: "text-purple-300"
    }
  };

  const items = useMemo(() => data[cat], [cat]);

  useEffect(() => {
    offsetRef.current = 0;
    setTranslateX(0);

    const measure = () => {
      loopWidthRef.current = loopRef.current?.scrollWidth ?? 0;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cat]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const speed = 32; // px per second

    const normalize = (value: number) => {
      const loopWidth = loopWidthRef.current;
      if (!loopWidth) return 0;
      return ((value % loopWidth) + loopWidth) % loopWidth;
    };

    const animate = (time: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = time;
      }

      const deltaSeconds = (time - lastFrameRef.current) / 1000;
      lastFrameRef.current = time;

      if (!dragRef.current.active && !reduceMotion.matches) {
        offsetRef.current = normalize(offsetRef.current + speed * deltaSeconds);
        setTranslateX(-offsetRef.current);
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!loopWidthRef.current) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startOffset: offsetRef.current,
    };
    lastFrameRef.current = null;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !loopWidthRef.current) return;

    const loopWidth = loopWidthRef.current;
    const delta = dragRef.current.startX - event.clientX;
    const nextOffset = ((dragRef.current.startOffset + delta) % loopWidth + loopWidth) % loopWidth;
    offsetRef.current = nextOffset;
    setTranslateX(-nextOffset);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    lastFrameRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const renderItems = (hidden = false) => (
    <span
      ref={hidden ? undefined : loopRef}
      aria-hidden={hidden}
      className="inline-flex shrink-0 items-center pr-8"
    >
      {items.map((text, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="mx-3">
            <span className={`font-medium ${colors[cat].text} transition-colors duration-300`}>{text}</span>
            <span className={`mx-3 ${colors[cat].arrow} transition-colors duration-300`}>→</span>
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section
      aria-label="Problems We Eliminate"
      className="relative isolate border-t border-slate-100/70"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-2 sm:pt-3">
          <p className="text-sm font-medium text-gray-600 mb-2">
            We find Solutions to Difficult problems for Growth-Minded Founders and Teams:
          </p>
        </div>
        <div className="flex flex-col gap-2 pb-2 sm:pb-3">
          {/* Tiny segmented toggle */}
          <div className="inline-flex self-start rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            {(["revenue", "growth", "conversion"] as Cat[]).map((key) => {
              const label =
                key === "revenue" ? "Revenue" : key === "growth" ? "Growth" : "Conversion";
              const active = cat === key;
              return (
                <button
                  key={key}
                  onClick={() => setCat(key)}
                  aria-pressed={active}
                  className={[
                    "px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg transition-all duration-300",
                    active 
                      ? `${colors[key].bgActive} text-white font-semibold shadow-sm` 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Ticker row */}
          <div className={`flex items-center justify-between gap-3 rounded-lg p-3 transition-colors duration-300 ${colors[cat].bg}`}>
            {/* Marquee container */}
            <div
              className="relative w-full cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
              aria-label={`${cat} problems ticker. Drag horizontally to browse faster.`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
            >
              <div
                ref={trackRef}
                className="ticker-track flex whitespace-nowrap text-sm transition-colors duration-300 sm:text-[0.95rem]"
                style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
              >
                {renderItems()}
                {renderItems(true)}
              </div>
            </div>

            {/* Quiet CTA (sticks on the right) */}
            <a
              href="#book-intro"
              className={`shrink-0 pl-3 text-sm font-medium ${colors[cat].textLight} hover:${colors[cat].text} transition-colors duration-300`}
            >
              Book a clarity call →
            </a>
          </div>
        </div>
      </div>

      {/* Inline styles for ticker interaction */}
      <style>{`
        .ticker-track {
          will-change: transform;
          user-select: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track { transform: translate3d(0, 0, 0) !important; }
        }
      `}</style>
    </section>
  );
}
