import { useMemo, useRef, useState, useId } from "react";

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
            <div key={i} className="shrink-0 p-6">
              <img
                src={logo.src}
                alt={logo.alt}
                className="ce-readable-logo h-8 w-auto opacity-90 hover:opacity-100"
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
export type CS = {
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
  const headingId = useId();
  const [position,setPosition] = useState({start:1,end:Math.min(2,items.length),atStart:true,atEnd:false});
  const [dragging,setDragging] = useState(false);
  const drag = useRef<{pointerId:number;x:number;left:number;moved:boolean}|null>(null);
  const suppressClick = useRef(false);
  const updatePosition = () => {
    const el=scroller.current;
    const first=el?.firstElementChild as HTMLElement|null;
    if(!el || !first)return;
    const step=first.getBoundingClientRect().width+16;
    setPosition({start:Math.min(items.length,Math.round(el.scrollLeft/step)+1),end:Math.min(items.length,Math.ceil((el.scrollLeft+el.clientWidth)/step)),atStart:el.scrollLeft<2,atEnd:el.scrollLeft+el.clientWidth>=el.scrollWidth-2});
  };
  const scrollBy = (dir: "prev" | "next") => {
    const el = scroller.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).getBoundingClientRect().width+16 : 336;
    el.scrollBy({ left: dir === "next" ? cardWidth : -cardWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "auto" : "smooth" });
  };
  const endDrag = () => { drag.current=null;setDragging(false); };

  return (
    <section aria-labelledby={headingId} className="mt-6 case-study-rail">
      <div className="mb-3 flex items-center justify-between">
        <div><h2 id={headingId} className="text-base font-semibold text-gray-800">{title}</h2><p className="mt-1 text-xs text-gray-500">{items.length} stories · Swipe, drag, or use the arrows</p></div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={`Previous case study in ${title}`}
            disabled={position.atStart}
            onClick={() => scrollBy("prev")}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 disabled:opacity-35 disabled:cursor-not-allowed"
            data-testid="button-carousel-prev"
          >
            ←
          </button>
          <button
            type="button"
            aria-label={`Next case study in ${title}`}
            disabled={position.atEnd}
            onClick={() => scrollBy("next")}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 disabled:opacity-35 disabled:cursor-not-allowed"
            data-testid="button-carousel-next"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 case-study-rail-track ${dragging ? "is-dragging" : ""}`}
        tabIndex={0}
        aria-label={`${title}: ${position.start}–${position.end} of ${items.length}`}
        onScroll={updatePosition}
        onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();scrollBy(event.key==="ArrowRight"?"next":"prev");}}}
        onDragStart={event=>event.preventDefault()}
        onPointerDown={event=>{if(event.pointerType!=="mouse" || event.button!==0)return;suppressClick.current=false;drag.current={pointerId:event.pointerId,x:event.clientX,left:event.currentTarget.scrollLeft,moved:false};}}
        onPointerMove={event=>{const start=drag.current;if(!start || start.pointerId!==event.pointerId)return;const delta=event.clientX-start.x;if(!start.moved && Math.abs(delta)<6)return;if(!start.moved){start.moved=true;suppressClick.current=true;setDragging(true);event.currentTarget.setPointerCapture(event.pointerId);}event.preventDefault();event.currentTarget.scrollLeft=start.left-delta;}}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onPointerLeave={()=>{if(!drag.current?.moved)endDrag();}}
        onClickCapture={event=>{if(suppressClick.current){event.preventDefault();event.stopPropagation();suppressClick.current=false;}}}
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

export function CaseStudyCollection({items}:{items:CS[]}) {
  const firstRow=items.slice(0,Math.ceil(items.length/2));
  const secondRow=items.slice(firstRow.length);
  return <div className="case-study-collection">
    <div className="hidden md:block"><CaseStudyCarousel items={firstRow} title="Featured case studies"/><div className="case-study-second-row"><CaseStudyCarousel items={secondRow} title="More client stories"/></div></div>
    <div className="md:hidden"><CaseStudyCarousel items={items} title="Featured case studies"/><details className="case-study-directory"><summary>View all {items.length} case studies <span aria-hidden="true">↓</span></summary><div className="case-study-directory-grid">{items.map(item=><a href={item.slug} key={item.slug}><img src={item.image} alt="" loading="lazy"/><h3>{item.title}</h3><p>{item.impact}</p><span>Read case study →</span></a>)}</div></details></div>
  </div>;
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
