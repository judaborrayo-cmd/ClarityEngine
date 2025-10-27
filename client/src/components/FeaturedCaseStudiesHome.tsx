import { useRef } from "react";
import mandaliImage from "@assets/Mandali 1600 by 1000_1761604910726.jpg";
import lisaNicholsImage from "@assets/Lisa Nichols Resized_1761604917835.png";

type HomeCS = {
  slug: string;
  title: string;
  impact: string;
  problem: string;
  solution: string;
  image: string;
  imageAlt: string;
};

export function FeaturedCaseStudiesHome() {
  const scroller = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: "prev" | "next") => {
    const el = scroller.current;
    if (!el) return;
    const child = el.querySelector<HTMLElement>('[data-card]');
    const w = child ? child.getBoundingClientRect().width + 16 : 360;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };

  const items: HomeCS[] = [
    {
      slug: "/case-study/mandali-retreats",
      title: "Mandali Retreats — Luxury Wellness",
      impact: "+16.5× ROAS across social; +29.06× ROAS on Search",
      problem: "Needed consistent ROAS & better offline conversion handoff",
      solution: "Geo-targeted campaigns, creative testing, CRM/booking handoff",
      image: mandaliImage,
      imageAlt: "Mandali lake and retreat setting",
    },
    {
      slug: "/case-study/lisa-nichols",
      title: "Lisa Nichols — Personal Brand Growth",
      impact: "Expanded reach & online revenue growth",
      problem: "Needed brand growth & global scaling",
      solution: "Paid media strategy + conversion refinement",
      image: lisaNicholsImage,
      imageAlt: "Lisa Nichols event creative",
    },
  ];

  return (
    <section className="my-16 sm:my-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Featured Case Studies</h2>
            <p className="text-sm text-gray-600">Proof in one glance. Swipe to explore.</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/case-studies"
              className="text-sm font-medium text-gray-800 hover:underline"
              aria-label="View all case studies"
              data-testid="link-all-case-studies"
            >
              View all case studies →
            </a>
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              aria-label="Previous case study"
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 z-10"
              data-testid="button-carousel-prev"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              aria-label="Next case study"
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 z-10"
              data-testid="button-carousel-next"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scroller}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            aria-label="Featured case studies"
          >
            {items.map((c) => (
              <article
                key={c.slug}
                data-card
                className="snap-start shrink-0 w-[92%] sm:w-[560px] rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-lg"
              >
                <a href={c.slug} aria-label={`Read case study: ${c.title}`}>
                  <img
                    src={c.image}
                    alt={c.imageAlt}
                    loading="lazy"
                    className="h-72 sm:h-80 w-full rounded-t-2xl object-cover"
                  />
                </a>
                <div className="p-4 sm:p-5 flex flex-col h-full">
                  <h3 className="text-lg font-semibold" data-testid={`case-study-title-${c.slug.split('/').pop()}`}>{c.title}</h3>
                  <p className="mt-1 text-sm font-medium text-emerald-700" data-testid={`case-study-impact-${c.slug.split('/').pop()}`}>{c.impact}</p>

                  <div className="mt-3 border-t border-gray-100 pt-3 space-y-1.5 text-sm min-h-[92px]">
                    <p className="text-gray-800">
                      <span className="font-semibold text-pink-500">Problem:</span>{" "}
                      {c.problem}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold text-emerald-500">Solution:</span>{" "}
                      {c.solution}
                    </p>
                  </div>

                  <div className="mt-4 mt-auto">
                    <a
                      href={c.slug}
                      className="inline-flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-black/10 hover:bg-gray-50"
                      aria-label={`Read case study: ${c.title}`}
                      data-testid={`button-read-case-study-${c.slug.split('/').pop()}`}
                    >
                      Read case study <span aria-hidden className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
