import { useMemo, useRef, useState, useEffect, forwardRef } from "react";
import { MousePointer2, Video, Camera, Mic, Lightbulb, Palette, PanelsTopLeft, ChartNoAxesCombined, Users } from "lucide-react";
import { useContinuousTicker } from "./use-continuous-ticker";

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
  const tickerRef = useRef(null);
  useContinuousTicker(tickerRef);
  const sectionRef = useRef(null);
  const wasInViewRef = useRef(false);
  const activeRef = useRef(0);
  const scrollSyncFrameRef = useRef(null);
  const [pulseNextButton, setPulseNextButton] = useState(false);
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
        title: "Turn insights into testable ideas",
        subtitle: "Use customer feedback, campaign data, and research to develop sharper messages and decide what’s worth testing.",
        Illustration: Lightbulb,
        iconLabel: "Step 1",
        gradientFrom: "from-violet-50",
        gradientTo: "to-white",
      },
      {
        title: "Make creative direction tangible",
        subtitle: "Explore advertising concepts and variations your team can see, discuss, and refine before production moves further.",
        Illustration: Palette,
        iconLabel: "Step 2",
        gradientFrom: "from-pink-50",
        gradientTo: "to-white",
      },
      {
        title: "Get landing-page improvements ready sooner",
        subtitle: "Develop copy, layouts, and page variations faster, with a clear purpose for each change.",
        Illustration: PanelsTopLeft,
        iconLabel: "Step 3",
        gradientFrom: "from-indigo-50",
        gradientTo: "to-white",
      },
      {
        title: "Turn analysis into decisions",
        subtitle: "Examine performance across campaigns and customer touchpoints to identify patterns, investigate problems, and choose the next action.",
        Illustration: ChartNoAxesCombined,
        iconLabel: "Step 4",
        gradientFrom: "from-emerald-50",
        gradientTo: "to-white",
      },
      {
        title: "Give your team more capacity",
        subtitle: "Work alongside your marketers, designers, and developers—or let us handle agreed execution—so progress doesn’t depend on someone finding spare time.",
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
          Your next good idea shouldn’t sit in a backlog.
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          We combine experienced marketing judgment with the latest AI tools to shorten the work between an idea and a live test.
        </p>
        <p className="mt-1 text-sm text-gray-500 text-center" data-testid="trust-indicator">
          More capacity to build, evaluate, and improve—with your audience, brand, and business goals at the center.
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
          Experienced people directing the work. AI helping move it forward.
        </p>
        
        <div ref={tickerRef} role="region" aria-label="Tools we work with" className="overflow-hidden bg-gradient-to-r from-violet-50 via-white to-violet-50 rounded-xl py-6">
          <div data-continuous-track className="tools-ticker-track flex w-max items-center">
            {[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-12 pr-12">
              {tools.map(tool => <div key={tool.name} className="inline-flex shrink-0 items-center gap-2">
                {tool.logo ? <img draggable={false} src={tool.logo} alt={tool.name} className="ce-readable-logo h-8 w-auto object-contain opacity-80" /> : <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                  {tool.icon && <tool.icon aria-hidden="true" className="h-5 w-5 text-violet-600" />}
                  <span className="text-sm font-medium text-gray-700">{tool.name}</span>
                </div>}
              </div>)}
            </div>)}
          </div>
        </div>

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
            animation: tools-ticker-scroll var(--ticker-duration, 60s) linear infinite;
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .tools-ticker-track { animation: none; width: auto; }
            .tools-ticker-track > div { flex-wrap: wrap; padding: 0 16px; gap: 24px; }
            .tools-ticker-track > div[aria-hidden="true"] { display: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
