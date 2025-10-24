import { useMemo, useRef, useState, useEffect, forwardRef } from "react";
import { MousePointer2, Video, Camera, Mic } from "lucide-react";

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

const Pill = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur transition-colors hover:bg-white">
    {label}
  </span>
);

const StepCard = forwardRef(({
  index,
  active,
  onSelect,
  title,
  subtitle,
  tools,
  gradientFrom,
  gradientTo,
  iconLabel,
}, ref) => {
  return (
    <button
      ref={ref}
      onClick={onSelect}
      data-testid={`step-card-${index + 1}`}
      className={`group snap-center w-[82vw] sm:w-[420px] lg:w-[520px] shrink-0 rounded-2xl border border-black/5 bg-gradient-to-b ${gradientFrom} ${gradientTo} p-6 text-left shadow-[0_6px_24px_-8px_rgba(0,0,0,0.15)] transition transform duration-300 ease-out hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] ${
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
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
});

export default function HowWeBuildFasterSection() {
  const steps = useMemo(
    () => [
      {
        title: "Ideation & Strategy",
        subtitle:
          "Start with clarity. AI-assisted frameworks to define angles, priorities, and goals — fast.",
        tools: ["ChatGPT", "Gemini", "Figma", "Replit"],
        iconLabel: "Step 1",
        gradientFrom: "from-violet-50",
        gradientTo: "to-white",
      },
      {
        title: "Visual Concepts",
        subtitle:
          "Collaborate with developers and designers faster. Midjourney concepts refined in Figma/Photoshop and keep everyone on the same page.",
        tools: ["Midjourney", "Photoshop", "Figma"],
        iconLabel: "Step 2",
        gradientFrom: "from-pink-50",
        gradientTo: "to-white",
      },
      {
        title: "Landing Page & CRO Concepts",
        subtitle:
          "Prototype flows, copy, and look & feel in Replit to hand off clearly to your developers. Then iterate together.",
        tools: ["Replit", "Figma", "YouTube"],
        iconLabel: "Step 3",
        gradientFrom: "from-indigo-50",
        gradientTo: "to-white",
      },
      {
        title: "Performance Analysis",
        subtitle:
          "Measure what matters. AI-assisted insights on ROI, cohorts, and experiments to guide the next move.",
        tools: ["GA4", "Gemini", "ChatGPT"],
        iconLabel: "Step 4",
        gradientFrom: "from-emerald-50",
        gradientTo: "to-white",
      },
      {
        title: "Collaboration & Workflows",
        subtitle:
          "Keep momentum. Tight async loops and weekly cadence across the tools your team already uses.",
        tools: ["Google Drive", "Slack", "Teams", "Dropbox"],
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
    const el = itemRefs.current[active];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const go = (dir) =>
    setActive((i) => Math.min(Math.max(i + dir, 0), steps.length - 1));

  const progress = (active / (steps.length - 1)) * 100;

  return (
    <section
      id="how-we-build-faster"
      data-testid="section-how-we-build-faster"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
          How We Get to Winning Results Faster
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Strategy → visuals → prototypes → data → collaboration. We blend
          people, process, and AI tools so your team ships faster.
        </p>
        <p className="mt-1 text-sm text-gray-500 text-center" data-testid="trust-indicator">
          Used by founders and marketing teams managing $5k–$70k per month in ad spend.
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between gap-6">
        <button
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
          aria-label="Next"
          onClick={() => go(1)}
          data-testid="button-timeline-next"
          className="rounded-full bg-violet-600 text-white p-3 shadow hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-40"
          disabled={active === steps.length - 1}
        >
          <Arrow direction="right" />
        </button>
      </div>

      <div
        ref={viewportRef}
        className="mt-10 overflow-x-auto scroll-smooth snap-x snap-mandatory"
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
              tools={s.tools}
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
        <div className="ticker relative overflow-hidden rounded-xl border border-gray-200 bg-white/60">
          <div className="ticker-track flex items-center gap-10 whitespace-nowrap px-6 py-5">
            {/* First set of tools */}
            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={photoshopLogo} alt="Photoshop" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Polish creatives for conversion.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={chatgptLogo} alt="ChatGPT" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Draft, iterate, decide faster.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={geminiLogo} alt="Gemini" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Cross-check strategy with AI.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                <MousePointer2 className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">Mouseflow</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                See friction. Fix flow.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                <Video className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">CapCut</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Edit fast. Test faster.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={midjourneyLogo} alt="Midjourney" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Concept visuals in hours.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                <Camera className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">Zoom</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Meet, align, move forward.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                <Mic className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">Krisp.ai</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Clean audio, clearer calls.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={figmaLogo} alt="Figma" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Prototype, share, get approval.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={replitLogo} alt="Replit" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Ship pages at sprint speed.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={googleAnalyticsLogo} alt="Google Analytics" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                All others bring data.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={googleDriveLogo} alt="Google Drive" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                We work in your drive.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={microsoftTeamsLogo} alt="Microsoft Teams" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                We plug into Teams.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={dropboxLogo} alt="Dropbox" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Assets ready when needed.
              </div>
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={photoshopLogo} alt="Photoshop" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Polish creatives for conversion.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={chatgptLogo} alt="ChatGPT" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Draft, iterate, decide faster.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={geminiLogo} alt="Gemini" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Cross-check strategy with AI.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                <MousePointer2 className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">Mouseflow</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                See friction. Fix flow.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                <Video className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">CapCut</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Edit fast. Test faster.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={midjourneyLogo} alt="Midjourney" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Concept visuals in hours.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                <Camera className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">Zoom</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Meet, align, move forward.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-violet-200">
                <Mic className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium text-gray-700">Krisp.ai</span>
              </div>
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Clean audio, clearer calls.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={figmaLogo} alt="Figma" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Prototype, share, get approval.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={replitLogo} alt="Replit" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Ship pages at sprint speed.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={googleAnalyticsLogo} alt="Google Analytics" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                All others bring data.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={googleDriveLogo} alt="Google Drive" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                We work in your drive.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={microsoftTeamsLogo} alt="Microsoft Teams" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                We plug into Teams.
              </div>
            </div>

            <div className="tool group relative h-12 w-28 flex items-center justify-center opacity-80 hover:opacity-100">
              <img src={dropboxLogo} alt="Dropbox" className="h-7 object-contain" />
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition whitespace-nowrap">
                Assets ready when needed.
              </div>
            </div>
          </div>
        </div>

        {/* Inline styles for ticker animation */}
        <style>{`
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            animation: ticker-scroll 30s linear infinite;
            will-change: transform;
          }
          .ticker:hover .ticker-track {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .ticker-track { animation: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
