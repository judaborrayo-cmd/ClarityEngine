import { useMemo, useRef, useState, useEffect, forwardRef } from "react";
import { MousePointer2, Video, Camera, Mic, Lightbulb, Palette, PanelsTopLeft, ChartNoAxesCombined, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import chatgptLogo from '@assets/Chat GPT Logo_1759865417145.png';
import geminiLogo from '@assets/gemini-logo_brandlogos.net_fwajr-512x512_1759865458230.png';
import midjourneyLogo from '@assets/Midjourney-Logo_1759865050220.png';
import photoshopLogo from '@assets/Photoshop_1759870952584.png';
import figmaLogo from '@assets/Figma-Logo-New-Oct-21_1761057022426.png';
import replitLogo from '@assets/Replit_logo_1759865452229.png';
import googleAnalyticsLogo from '@assets/Logo_Google_Analytics_1759865466930.png';
import googleDriveLogo from '@assets/Google_Drive_-_New_Logo_1759865428146.png';
import microsoftTeamsLogo from '@assets/Microsoft-Teams-Symbol_1759865428146.png';
import dropboxLogo from '@assets/Dropbox_(service)-Logo.wine_1759865428146.png';

const Arrow = ({ direction = "right", className = "" }) => (
  <svg
    className={"h-5 w-5 " + className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {direction === "right" ? (
      <path
        d="M5 12h14m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M19 12H5m0 0 5 5m-5-5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

const StepCard = forwardRef(({
  index,
  active,
  onSelect,
  title,
  subtitle,
  Illustration,
  gradientFrom,
  gradientTo,
  iconLabel,
}, ref) => {
  return (
    <button
      ref={ref}
      onClick={onSelect}
      data-testid={`step-card-${index + 1}`}
      className={`group snap-center w-[82vw] sm:w-[420px] lg:w-[520px] shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-b ${gradientFrom} ${gradientTo} p-6 text-left shadow-[0_6px_24px_-8px_rgba(0,0,0,0.15)] transition transform duration-300 ease-out hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] ${
        active ? "ring-2 ring-violet-500 scale-[1.02]" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`grid h-12 w-12 place-items-center rounded-xl bg-white/80 text-gray-800 shadow-sm ${
            active ? "ring-1 ring-black/5" : ""
          }`}
        >
          <span className="text-xs font-semibold leading-none">{iconLabel}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-700/90 leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-5 flex h-24 items-center justify-center rounded-xl border border-white/80 bg-white/60 text-violet-600" aria-hidden="true"><Illustration size={64} strokeWidth={1.3}/><span className="ml-4 h-px w-10 bg-emerald-300"/><span className="ml-3 grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Arrow/></span></div>
        </div>
      </div>
    </button>
  );
});

export default function HowWeBuildFasterSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const tickerRef = useRef(null);
  const dragRef = useRef(null);
  const draggedRef = useRef(false);
  const pauseRef = useRef(false);
  const sectionRef = useRef(null);
  const wasInViewRef = useRef(false);
  const activeRef = useRef(0);
  const scrollSyncFrameRef = useRef(null);
  const [pulseNextButton, setPulseNextButton] = useState(false);
  useEffect(() => { pauseRef.current = tickerPaused || isDragging; }, [tickerPaused, isDragging]);
  useEffect(() => {
    const el = tickerRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame, last = 0;
    function tick(now) {
      if (last && !pauseRef.current && !reduce.matches && !document.hidden && el) {
        el.scrollLeft += Math.min(now-last,50) * .035;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      last = now; frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  const startDrag = e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    draggedRef.current = false;
    dragRef.current = { x:e.clientX, left:e.currentTarget.scrollLeft, wasPaused:pauseRef.current };
    pauseRef.current = true; setTickerPaused(true); setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const moveDrag = e => {
    if (!dragRef.current) return;
    const delta = e.clientX - dragRef.current.x;
    if (Math.abs(delta)>4) draggedRef.current=true;
    e.currentTarget.scrollLeft = dragRef.current.left-delta;
  };
  const endDrag = () => { const drag=dragRef.current; if(drag && !draggedRef.current) setTickerPaused(!drag.wasPaused); dragRef.current=null; setIsDragging(false); };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasInViewRef.current && !reduceMotion.matches) {
          wasInViewRef.current = true;
          setPulseNextButton(true);
          window.setTimeout(() => setPulseNextButton(false), 1000);
          return;
        }

        if (!entry.isIntersecting) {
          wasInViewRef.current = false;
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const steps = useMemo(
    () => [
      {
        title: "Ideation & Strategy",
        subtitle:
          "Start with clarity. AI-assisted frameworks to define angles, priorities, and goals — fast.",
        Illustration: Lightbulb,
        iconLabel: "Step 1",
        gradientFrom: "from-violet-50",
        gradientTo: "to-white",
      },
      {
        title: "Visual Concepts",
        subtitle:
          "Make the direction visible. Explore creative concepts that help your team discuss, refine, and choose the strongest ideas.",
        Illustration: Palette,
        iconLabel: "Step 2",
        gradientFrom: "from-pink-50",
        gradientTo: "to-white",
      },
      {
        title: "Landing Page & CRO Concepts",
        subtitle:
          "Turn your message into a clear page experience. Develop flows, copy, and layouts your team can build, test, and improve.",
        Illustration: PanelsTopLeft,
        iconLabel: "Step 3",
        gradientFrom: "from-indigo-50",
        gradientTo: "to-white",
      },
      {
        title: "Performance Analysis",
        subtitle:
          "Measure what matters. AI-assisted insights on ROI, cohorts, and experiments to guide the next move.",
        Illustration: ChartNoAxesCombined,
        iconLabel: "Step 4",
        gradientFrom: "from-emerald-50",
        gradientTo: "to-white",
      },
      {
        title: "Collaboration & Workflows",
        subtitle:
          "Keep momentum. Tight async loops and weekly cadence across the tools your team already uses.",
        Illustration: Users,
        iconLabel: "Step 5",
        gradientFrom: "from-slate-50",
        gradientTo: "to-white",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const viewportRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const scrollToStep = (index, behavior = "smooth") => {
    const viewport = viewportRef.current;
    const item = itemRefs.current[index];
    if (!viewport || !item) return;

    const nextLeft =
      item.offsetLeft - (viewport.clientWidth - item.clientWidth) / 2;

    viewport.scrollTo({
      left: Math.max(0, nextLeft),
      behavior,
    });
  };

  useEffect(() => {
    scrollToStep(active);
  }, [active]);

  const go = (dir) =>
    setActive((i) => {
      const next = Math.min(Math.max(i + dir, 0), steps.length - 1);
      scrollToStep(next);
      return next;
    });

  const syncActiveFromScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport || scrollSyncFrameRef.current !== null) return;

    scrollSyncFrameRef.current = window.requestAnimationFrame(() => {
      scrollSyncFrameRef.current = null;
      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.left + viewportRect.width / 2;

      let closestIndex = activeRef.current;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(itemCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeRef.current) {
        setActive(closestIndex);
      }
    });
  };

  const progress = (active / (steps.length - 1)) * 100;

  return (
    <section
      ref={sectionRef}
      id="how-we-build-faster"
      data-testid="section-how-we-build-faster"
      className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
          How We Get to Winning Results Faster
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Analysis → Strategy → Planning → Execution → Optimization
        </p>
        <p className="mt-1 text-sm text-gray-500 text-center" data-testid="trust-indicator">
          Used by founders and marketing teams managing $5k–$70k per month in ad spend.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          data-testid="button-timeline-prev"
          className="rounded-full bg-violet-600 text-white p-3 shadow hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-40"
          disabled={active === 0}
        >
          <Arrow direction="left" />
        </button>

        <div className="relative w-full" data-testid="timeline-progress-bar">
          <div className="h-1 w-full rounded-full bg-gray-200" />
          <div
            className="absolute left-0 top-0 h-1 rounded-full bg-violet-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          data-testid="button-timeline-next"
          className={`rounded-full bg-violet-600 text-white p-3 shadow hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-40 ${
            pulseNextButton ? "timeline-next-flash" : ""
          }`}
          disabled={active === steps.length - 1}
        >
          <Arrow direction="right" />
        </button>
      </div>

      <div
        ref={viewportRef}
        onScroll={syncActiveFromScroll}
        className="mt-8 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory overscroll-y-contain"
        style={{ touchAction: "pan-x pan-y" }}
      >
        <div className="flex items-stretch gap-6 pr-6">
          {steps.map((s, i) => (
            <StepCard
              key={i}
              index={i}
              active={i === active}
              onSelect={() => setActive(i)}
              title={s.title}
              subtitle={s.subtitle}
              Illustration={s.Illustration}
              gradientFrom={s.gradientFrom}
              gradientTo={s.gradientTo}
              iconLabel={s.iconLabel}
              ref={(el) => (itemRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none mt-8 hidden justify-center gap-10 md:flex">
        {steps.map((_, i) => (
          <div key={i} className="flex items-center gap-2 opacity-70">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            {i < steps.length - 1 && <Arrow className="text-violet-500" />}
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-black/5 pt-8">
        <p className="text-center text-sm font-medium text-gray-500 mb-6">
          Built using your favorite tools — powered by ours.
        </p>
        
        {/* Animated Tools Ticker */}
        <TooltipProvider delayDuration={200}>
          <div 
            ref={tickerRef}
            role="region" aria-label="Tools: tap to pause or resume; drag to explore" tabIndex={0}
            onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
            onClickCapture={e=>{if(draggedRef.current){e.preventDefault();e.stopPropagation();}}}
            onKeyDown={e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();setTickerPaused(v=>!v);}if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();setTickerPaused(true);e.currentTarget.scrollLeft+=e.key==="ArrowRight"?180:-180;}}}
            className="relative overflow-x-auto bg-gradient-to-r from-violet-50 via-white to-violet-50 rounded-xl py-6 px-4 select-none"
            style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y', scrollbarWidth:'none' }}
          >
            <div 
              className="tools-ticker-track whitespace-nowrap flex w-max items-center gap-12"

            >
              {/* Tool descriptions mapping */}
              {(() => {
                const toolDescriptions = {
                  "Photoshop": "Polish creatives for conversion.",
                  "ChatGPT": "Draft, iterate, decide faster.",
                  "Gemini": "Cross-check strategy with AI.",
                  "Mouseflow": "See friction. Fix flow.",
                  "CapCut": "Edit fast. Test faster.",
                  "Midjourney": "Concept visuals in hours.",
                  "Zoom": "Meet, align, move forward.",
                  "Krisp.ai": "Clean audio, clearer calls.",
                  "Figma": "Prototype, share, get approval.",
                  "Replit": "Ship pages at sprint speed.",
                  "GA4": "All others bring data.",
                  "Google Drive": "We work in your drive.",
                  "Microsoft Teams": "We plug into Teams.",
                  "Teams": "We plug into Teams.",
                  "Dropbox": "Assets ready when needed.",
                };

                const tools = [
                  { name: "ChatGPT", logo: chatgptLogo },
                  { name: "Gemini", logo: geminiLogo },
                  { name: "Mouseflow", icon: MousePointer2 },
                  { name: "CapCut", icon: Video },
                  { name: "Midjourney", logo: midjourneyLogo },
                  { name: "Photoshop", logo: photoshopLogo },
                  { name: "Zoom", icon: Camera },
                  { name: "Krisp.ai", icon: Mic },
                  { name: "Figma", logo: figmaLogo },
                  { name: "Replit", logo: replitLogo },
                  { name: "GA4", logo: googleAnalyticsLogo },
                  { name: "Google Drive", logo: googleDriveLogo },
                  { name: "Teams", logo: microsoftTeamsLogo },
                  { name: "Dropbox", logo: dropboxLogo },
                ];

                return (
                  <>
                    {/* First set of tools */}
                    {tools.map((tool) => (
                      <Tooltip key={`${tool.name}-1`}>
                        <TooltipTrigger asChild>
                          <div className="inline-flex items-center gap-2 shrink-0 cursor-pointer">
                            {tool.logo ? (
                              <img
                                draggable={false}
                                src={tool.logo}
                                alt={tool.name}
                                className="ce-readable-logo h-8 w-auto object-contain opacity-70 hover:opacity-100"
                              />
                            ) : (
                              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200 hover:border-violet-400 transition-colors">
                                {tool.icon && <tool.icon className="h-5 w-5 text-violet-600" />}
                                <span className="text-sm font-medium text-gray-700">{tool.name}</span>
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-medium">{tool.name}</p>
                          <p className="text-xs text-muted-foreground">{toolDescriptions[tool.name]}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {tools.map((tool) => (
                      <Tooltip key={`${tool.name}-2`}>
                        <TooltipTrigger asChild>
                          <div className="inline-flex items-center gap-2 shrink-0 cursor-pointer">
                            {tool.logo ? (
                              <img
                                draggable={false}
                                src={tool.logo}
                                alt={tool.name}
                                className="ce-readable-logo h-8 w-auto object-contain opacity-70 hover:opacity-100"
                              />
                            ) : (
                              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200 hover:border-violet-400 transition-colors">
                                {tool.icon && <tool.icon className="h-5 w-5 text-violet-600" />}
                                <span className="text-sm font-medium text-gray-700">{tool.name}</span>
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-medium">{tool.name}</p>
                          <p className="text-xs text-muted-foreground">{toolDescriptions[tool.name]}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        </TooltipProvider>

        {/* Inline styles for ticker animation */}
        <style>{`
          @keyframes tools-ticker-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes timeline-next-flash {
            0%, 100% { background-color: rgb(124 58 237); }
            50% { background-color: rgb(34 197 94); }
          }
          .timeline-next-flash {
            animation: timeline-next-flash 1000ms ease-in-out 1;
          }
          .tools-ticker-track {
            animation: none;
          }
          @media (prefers-reduced-motion: reduce) {
            .tools-ticker-track { animation: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
