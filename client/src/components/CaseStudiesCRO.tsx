import { useMemo, useRef } from "react";

/* =========================
   1) LOGO TICKER (SOCIAL PROOF)
   ========================= */
export function LogoTicker({
  logos,
  speed = 35,
  ariaLabel = "Client logos",
}: {
  logos: { src: string; alt: string }[];
  speed?: number;
  ariaLabel?: string;
}) {
  return (
    <section aria-label={ariaLabel} className="my-8">
      <p className="mb-3 text-center text-sm text-gray-600">
        <span className="font-medium text-gray-800">
          Serving ambitious brands across verticals for 12+ years.
        </span>
      </p>
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div
          className="flex items-center"
          style={{
            animation: `ticker ${Math.max(10, (logos.length * 140) / speed)}s linear infinite`,
          }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="shrink-0 p-4">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto opacity-90 hover:opacity-100 transition"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        section:hover > div > div[style*="animation"] { animation-play-state: paused; }
      `}</style>
    </section>
  );
}

/* =========================
   2) CASE STUDY CAROUSEL (HERO)
   ========================= */
type CS = {
  slug: string;
  title: string;
  impact: string;
  image: string;
  imageAlt: string;
  problem?: string;
  solution?: string;
};

export function CaseStudyCarousel({
  items,
  title = "Featured Case Studies",
}: {
  items: CS[];
  title?: string;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: "prev" | "next") => {
    const el = scroller.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).getBoundingClientRect().width
      : 320;
    el.scrollBy({ left: dir === "next" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  return (
    <section aria-label={title} className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={() => scrollBy("prev")}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
            data-testid="button-carousel-prev"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next case study"
            onClick={() => scrollBy("next")}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
            data-testid="button-carousel-next"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        role="group"
        aria-roledescription="Horizontal case study carousel"
        data-testid="carousel-case-studies"
      >
        {items.map((c) => (
          <article
            key={c.slug}
            className="flex snap-start shrink-0 w-[88%] sm:w-[520px] flex-col self-stretch rounded-2xl border border-gray-200 bg-white shadow-sm"
            data-testid={`card-case-study-${c.slug.split('/').pop()}`}
          >
            <a 
              href={c.slug} 
              aria-label={`Read case study: ${c.title}`}
              data-testid={`link-image-${c.slug.split('/').pop()}`}
            >
              <img
                src={c.image}
                alt={c.imageAlt}
                aria-label={`Case study image for ${c.title}`}
                loading="lazy"
                className="h-72 sm:h-80 object-cover rounded-t-2xl w-full"
              />
            </a>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="min-h-[1.75rem] text-lg font-semibold leading-snug sm:min-h-[3.25rem]" data-testid={`text-title-${c.slug.split('/').pop()}`}>{c.title}</h3>
              <p className="mt-1 min-h-[2.5rem] text-sm font-medium leading-snug text-emerald-700 sm:min-h-[2.75rem]" data-testid={`text-impact-${c.slug.split('/').pop()}`}>{c.impact}</p>

              {(c.problem || c.solution) && (
                <div className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-sm leading-relaxed">
                  {c.problem && (
                    <p className="text-gray-800">
                      <span className="font-semibold text-pink-600">Problem:</span>{" "}
                      <span className="text-gray-800">{c.problem}</span>
                    </p>
                  )}
                  {c.solution && (
                    <p className="text-gray-800">
                      <span className="font-semibold text-emerald-600">Solution:</span>{" "}
                      <span className="text-gray-800">{c.solution}</span>
                    </p>
                  )}
                </div>
              )}

              <div className="mt-auto pt-5">
                <a
                  href={c.slug}
                  className="inline-flex items-center rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition hover:-translate-y-[1px] hover:bg-black/90 hover:shadow-lg"
                  data-testid={`link-read-case-${c.slug.split('/').pop()}`}
                >
                  Read case study <span aria-hidden className="ml-2">→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================
   3) KPI CHIPS CAROUSEL
   ========================= */
type KPI = {
  label: string;
  sub?: string;
  type?: "Metric" | "Outcome";
};

export function KPIChipsCarousel({
  items,
  title = "Client Results",
}: {
  items: KPI[];
  title?: string;
}) {
  const id = useMemo(() => `kpi-${Math.random().toString(36).slice(2)}`, []);
  return (
    <section aria-labelledby={id} className="my-12" data-testid="section-kpi-carousel">
      <h2 id={id} className="mb-3 text-base font-semibold text-gray-800">
        {title}
      </h2>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2" data-testid="carousel-kpi-chips">
        {items.map((k, i) => (
          <div
            key={i}
            className="snap-start shrink-0 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
            data-testid={`chip-kpi-${i}`}
          >
            <div className="text-sm font-semibold">{k.label}</div>
            {k.sub && <div className="text-xs text-gray-600">{k.sub}</div>}
            {k.type && (
              <div className="mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] text-gray-600">
                {k.type}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
