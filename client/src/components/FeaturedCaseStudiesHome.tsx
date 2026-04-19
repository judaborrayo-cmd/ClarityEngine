import { useRef, type MouseEvent, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import mandaliImage from "@assets/Mandali 1600 by 1000_1761604910726.jpg";
import lisaNicholsImage from "@assets/Lisa Nichols Resized_1761604917835.png";
import lamarkImage from "@assets/Lamark Media 1600 by 1000_1761591605719.png";
import powersGymnasticsImage from "@assets/Rowland-Ballard-Case-Study-Image_1763648189223.png";

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
  const suppressClick = useRef(false);
  const dragState = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const shouldReduceMotion = useReducedMotion();

  const scrollByCard = (dir: "prev" | "next") => {
    const el = scroller.current;
    if (!el) return;
    const child = el.querySelector<HTMLElement>('[data-card]');
    const w = child ? child.getBoundingClientRect().width + 16 : 360;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || !dragState.current.active) return;

    const delta = event.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) {
      dragState.current.moved = true;
    }
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    if (dragState.current.moved) {
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 250);
    }

    dragState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
    dragState.current.moved = false;
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
      slug: "/case-study/powers-gymnastics",
      title: "Powers Gymnastics — Multi-location Growth",
      impact: "2–3× more leads, 50% cheaper Google CPL, record trials & enrollments",
      problem: "Fragmented accounts, seasonal focus, inconsistent CPL, lack of visibility from click → trial → enrollment",
      solution: "Rebuilt Google Search & PMAX, Meta lead-gen campaigns, multi-format creative system, funnel reporting across locations",
      image: powersGymnasticsImage,
      imageAlt: "Powers Gymnastics multi-location growth",
    },
    {
      slug: "/case-study/lamark-agency",
      title: "Growth Across Industries",
      impact: "Consistent CPL at scale across multi-account portfolios",
      problem: "Portfolio complexity across industries and accounts reduced clarity",
      solution: "Unified frameworks, reporting, and optimization protocols enabling scalable management",
      image: lamarkImage,
      imageAlt: "Lamark Media multi-industry portfolio showcase",
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
    <section className="my-8 sm:my-14">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="mb-8 flex flex-col items-center gap-4 text-center sm:mb-10"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Featured Case Studies</h2>
            <p className="mt-4 text-lg text-gray-600">Proof in one glance. Swipe to explore.</p>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-2">
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
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 z-10"
              data-testid="button-carousel-prev"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              aria-label="Next case study"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 z-10"
              data-testid="button-carousel-next"
            >
              →
            </button>
          </div>
        </motion.div>

        <div className="relative">
          <div
            ref={scroller}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-4 cursor-grab select-none active:cursor-grabbing overscroll-x-contain touch-pan-y"
            aria-label="Featured case studies"
            role="group"
            aria-roledescription="Horizontal case study carousel"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={handleClickCapture}
          >
            {items.map((c, idx) => (
              <motion.article
                key={c.slug}
                data-card
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                className="flex snap-start shrink-0 w-[88%] sm:w-[520px] lg:w-[620px] flex-col self-stretch rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <a href={c.slug} aria-label={`Read case study: ${c.title}`}>
                  <img
                    src={c.image}
                    alt={c.imageAlt}
                    loading="lazy"
                    className="h-64 sm:h-72 w-full rounded-t-lg object-cover"
                  />
                </a>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="min-h-[1.75rem] text-lg font-semibold leading-snug sm:min-h-[3.25rem]" data-testid={`case-study-title-${c.slug.split('/').pop()}`}>{c.title}</h3>
                  <p className="mt-1 min-h-[2.5rem] text-sm font-medium leading-snug text-emerald-700 sm:min-h-[2.75rem]" data-testid={`case-study-impact-${c.slug.split('/').pop()}`}>{c.impact}</p>

                  <div className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-sm leading-relaxed">
                    <p className="text-gray-800">
                      <span className="font-semibold text-pink-500">Problem:</span>{" "}
                      {c.problem}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold text-emerald-500">Solution:</span>{" "}
                      {c.solution}
                    </p>
                  </div>

                  <div className="mt-auto pt-5">
                    <a
                      href={c.slug}
                      className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 transition hover:bg-black/90 hover:shadow-lg"
                      aria-label={`Read case study: ${c.title}`}
                      data-testid={`button-read-case-study-${c.slug.split('/').pop()}`}
                    >
                      Read case study <span aria-hidden className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
