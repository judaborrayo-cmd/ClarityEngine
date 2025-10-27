import { useMemo } from "react";

type KPIItem = {
  metric: string;        // e.g., "10× ROAS"
  context?: string;      // e.g., "Prospecting · Meta"
  client: string;        // e.g., "Hapi Art"
  href: string;          // case study route
  type?: "Metric" | "Outcome";
};

export function KPIChipsLinks({
  items,
  title = "Verified Results → See the full story",
  subtitle = "Click any metric to open the case study.",
}: {
  items: KPIItem[];
  title?: string;
  subtitle?: string;
}) {
  const id = useMemo(() => `kpi-links-${Math.random().toString(36).slice(2)}`, []);
  
  // Color variants for visual interest
  const colorVariants = [
    "border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50/50 to-white hover:from-purple-50 hover:to-purple-25",
    "border-l-4 border-l-pink-500 bg-gradient-to-br from-pink-50/50 to-white hover:from-pink-50 hover:to-pink-25",
    "border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50/50 to-white hover:from-emerald-50 hover:to-emerald-25",
    "border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50/50 to-white hover:from-blue-50 hover:to-blue-25",
    "border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50/50 to-white hover:from-amber-50 hover:to-amber-25",
  ];

  return (
    <section aria-labelledby={id} className="my-12" data-testid="section-kpi-links">
      <div className="mb-3">
        <h2 id={id} className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2" data-testid="carousel-kpi-links">
        {items.map((k, i) => {
          const colorClass = colorVariants[i % colorVariants.length];
          return (
            <a
              key={`${k.metric}-${i}`}
              href={k.href}
              aria-label={`See case study: ${k.client} — ${k.metric}${k.context ? ` (${k.context})` : ""}`}
              data-testid={`link-kpi-${i}`}
              className={[
                "snap-start shrink-0 w-[280px] rounded-2xl border-t border-r border-b border-gray-200",
                "px-4 py-3 shadow-sm hover:shadow-lg transition-all duration-200",
                "hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40",
                colorClass,
              ].join(" ")}
            >
              <div className="text-[15px] font-semibold text-gray-900" data-testid={`text-metric-${i}`}>{k.metric}</div>
              {k.context && <div className="mt-0.5 text-xs text-gray-600" data-testid={`text-context-${i}`}>{k.context}</div>}

              <div className="mt-2 inline-flex items-center gap-2">
                <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-700" data-testid={`badge-client-${i}`}>
                  {k.client}
                </span>
                {k.type && (
                  <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-600" data-testid={`badge-type-${i}`}>
                    {k.type}
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-[12px] font-medium text-gray-800">See case study</span>
                <span aria-hidden className="text-[12px]">→</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
