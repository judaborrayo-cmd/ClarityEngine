import React, { useMemo, useState } from "react";

/**
 * ProblemsTicker – Ultra-minimal, category-toggle ticker
 * - React + Tailwind only (no external libs)
 * - One-line, subdued ticker with a tiny segmented toggle
 * - Uses CSS keyframes (injected <style>) for smooth, continuous scrolling
 */
export default function ProblemsTicker() {
  type Cat = "revenue" | "growth" | "conversion";
  const [cat, setCat] = useState<Cat>("revenue");

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

  // Duplicate array so the marquee loops seamlessly
  const items = useMemo(() => [...data[cat], ...data[cat]], [cat]);

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
            <div className="relative w-full overflow-hidden">
              <div className={`ticker-track whitespace-nowrap text-sm sm:text-[0.95rem] transition-colors duration-300`}>
                {/* We render the sequence twice; CSS moves it left to create an infinite loop */}
                <span className="inline-block pr-8">
                  {items.map((text, i) => (
                    <span key={i} className="mx-3">
                      <span className={`font-medium ${colors[cat].text} transition-colors duration-300`}>{text}</span>
                      <span className={`mx-3 ${colors[cat].arrow} transition-colors duration-300`}>→</span>
                    </span>
                  ))}
                </span>
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

      {/* Inline styles for keyframes (scoped via class names) */}
      <style>{`
        @keyframes ce-ticker-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* The track is exactly 2x the content width (duplicated). We shift left by 50% to loop. */
        .ticker-track {
          display: inline-block;
          min-width: 200%;
          animation: ce-ticker-left 28s linear infinite;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </section>
  );
}