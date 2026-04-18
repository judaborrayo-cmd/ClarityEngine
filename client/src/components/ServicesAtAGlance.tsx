import { Fragment, useMemo, useState } from "react";
import { Target, BarChart3, FlaskConical } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Import brand logos
import googleAdsLogo from '@assets/Google-Ads-Logo-Trans_1761062080038.png';
import metaLogo from '@assets/Meta Logo_1761062070889.png';
import youtubeLogo from '@assets/YouTube-logo-video-platform-social-media-transparent-PNG-image_1761062130515.png';

/**
 * ServicesAtAGlance.tsx
 * Top row = big pressable buttons (single large logo + new title)
 * Bottom panel = detailed gradient view that swaps per selection
 */

function Media({ src, alt = "" }: { src: string; alt?: string }) {
  const isVideo = src?.endsWith(".mp4") || src?.endsWith(".webm");
  if (isVideo) {
    return (
      <video
        className="h-full w-full rounded-xl object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        data-testid="media-video"
      />
    );
  }
  return <img className="h-full w-full rounded-xl object-cover" src={src} alt={alt} data-testid="media-image" />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-800 ring-1 ring-black/10 backdrop-blur">
      {children}
    </span>
  );
}

interface ServiceLogo {
  type: 'image' | 'icon';
  src?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

type Service = {
  id: string;
  topTitle: string;
  bottomTitle: string;
  logo: ServiceLogo;
  media: {
    src: string;
    alt: string;
  };
  gradient: {
    from: string;
    to: string;
  };
  paragraph: string;
  bullets: string[];
  tools: string[];
};

export default function ServicesAtAGlance() {
  // Tool tooltip mapping
  const toolTooltips: Record<string, string> = {
    "Figma": "Prototype, share, get approval.",
    "Replit (prototype)": "Ship pages at sprint speed.",
    "Prototype": "Quickly test real ideas.",
    "Dev handoff": "Clean specs, fewer revisions.",
    "GA4": "In God we trust, all others bring data.",
    "Hotjar": "See friction. Fix flow.",
    "Mouseflow": "See friction. Fix flow.",
    "Sheets": "Fast models, clear numbers.",
    "Looker": "Answers, not dashboards.",
    "Cohorts": "Retention tells the truth.",
    "In-Stream": "Tell the story mid-scroll.",
    "Discovery": "Meet buyers researching.",
    "Retargeting": "Don't waste warm attention.",
    "Catalog": "Dynamic creatives at scale.",
    "DCT": "Test creatives systematically.",
    "UGC": "Social proof that sells.",
    "Search": "Show up when they search.",
    "PMax": "Omnipresence without chaos.",
    "YouTube": "Turn attention into demand.",
    "Meta": "Scale what works across platforms.",
    "CRO": "See friction. Fix flow.",
    "AB": "Test smarter. Scale faster.",
  };

  const services = useMemo<Service[]>(
    () => [
      {
        id: "google-ads",
        topTitle: "Google Ads Advertising",
        bottomTitle: "Capture Demand. Convert Faster.",
        logo: { type: 'image' as const, src: googleAdsLogo },
        media: { src: "/media/google-ads-demo.mp4", alt: "Google Ads demo" },
        gradient: { from: "from-violet-50", to: "to-emerald-50" },
        paragraph:
          "We turn Google into your most reliable sales channel. From search to Performance Max, we refine structure, tracking, and creative so you capture the right traffic—not just clicks. You get a system that scales intelligently, cuts wasted spend, and surfaces the insights you need to make confident decisions faster.",
        bullets: [
          "Capture high-intent leads and buyers",
          "Eliminate wasted spend through better structure",
          "Build a scalable, data-driven foundation for growth",
          "See what's working faster with clear KPI visibility"
        ],
        tools: ["Search", "PMax", "YouTube", "GA4"],
      },
      {
        id: "meta",
        topTitle: "Meta Advertising",
        bottomTitle: "Scale What Works Across Meta's Ecosystem",
        logo: { type: 'image' as const, src: metaLogo },
        media: { src: "/media/meta-campaigns.gif", alt: "Meta ads examples" },
        gradient: { from: "from-fuchsia-50", to: "to-indigo-50" },
        paragraph:
          "We build creative systems and remarketing funnels that compound results. From prospecting to retargeting, every layer is designed to increase relevance, test faster, and drive profitable customer acquisition—without the chaos of constant guesswork.",
        bullets: [
          "Scalable creative frameworks for faster testing",
          "Tiered remarketing systems that build momentum",
          "Proven ad strategies that reach, convert, and retain",
          "Real insights that turn creative into predictable growth"
        ],
        tools: ["Meta", "Catalog", "DCT", "UGC"],
      },
      {
        id: "cro",
        topTitle: "Conversion Rate Optimization",
        bottomTitle: "Make Every Click Count",
        logo: { type: 'icon' as const, icon: Target },
        media: { src: "/media/cro-demo.mp4", alt: "CRO demo" },
        gradient: { from: "from-indigo-50", to: "to-sky-50" },
        paragraph:
          "We turn data into design decisions. Our CRO process finds friction, fixes tracking, and tests solutions that lift performance across every funnel stage. You'll know exactly where growth is hiding—and how to unlock it—without wasting months guessing.",
        bullets: [
          "Funnel testing that uncovers true growth levers",
          "Clearer tracking and attribution for faster insights",
          "UX and copy optimizations proven to convert",
          "Continuous iteration for compounding returns"
        ],
        tools: ["CRO", "Hotjar", "GA4", "AB"],
      },
      {
        id: "reporting",
        topTitle: "Strategic Reporting & KPI Optimization",
        bottomTitle: "See What's Actually Driving Growth",
        logo: { type: 'icon' as const, icon: BarChart3 },
        media: { src: "/media/attribution.gif", alt: "Attribution dashboard" },
        gradient: { from: "from-emerald-50", to: "to-violet-50" },
        paragraph:
          "We build unified dashboards that connect the dots between ad spend, funnel performance, and revenue. You'll know exactly which campaigns move the needle, so your team can focus on what's profitable—and stop wasting time on what's not.",
        bullets: [
          "Unified reporting across Google, Meta, and YouTube",
          "Clarity on what drives revenue (not vanity metrics)",
          "Faster decision cycles with data you can trust",
          "Scalable visibility for leadership and ops teams"
        ],
        tools: ["GA4", "Looker", "Sheets", "Cohorts"],
      },
      {
        id: "youtube",
        topTitle: "YouTube Advertising",
        bottomTitle: "Turn Attention Into Demand",
        logo: { type: 'image' as const, src: youtubeLogo },
        media: { src: "/media/youtube-demo.mp4", alt: "YouTube ads examples" },
        gradient: { from: "from-rose-50", to: "to-amber-50" },
        paragraph:
          "We design high-intent video campaigns that educate, engage, and convert. Using proven targeting and messaging frameworks, we help you build authority and capture attention at scale—so every view moves your audience closer to action.",
        bullets: [
          "High-intent video targeting to reach ready buyers",
          "Story-driven ads that build trust and desire",
          "Efficient testing for creative and audience alignment",
          "Combine awareness + conversion for measurable ROI"
        ],
        tools: ["In-Stream", "Discovery", "Retargeting"],
      },
      {
        id: "landing-pages",
        topTitle: "A/B Testing",
        bottomTitle: "Test Smarter. Scale Faster.",
        logo: { type: 'icon' as const, icon: FlaskConical },
        media: { src: "/media/landing-pages.gif", alt: "Landing page flows" },
        gradient: { from: "from-slate-50", to: "to-violet-50" },
        paragraph:
          "We use rapid, low-friction testing inside Replit to prototype messaging, UX, and funnel flow—then hand off to your team for implementation. This makes experimentation faster, cheaper, and easier to sustain, so you find winning ideas before competitors do.",
        bullets: [
          "Faster testing cycles → faster insights",
          "Validate creative and copy without heavy dev lift",
          "Collaborative iteration that blends speed with precision",
          "Make decisions based on proof, not opinion"
        ],
        tools: ["Figma", "Replit (prototype)", "Dev handoff"],
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>(services[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Show hovered service if hovering, otherwise show the locked/active selection
  const displayedId = hoveredId || activeId;
  const active = services.find((s) => s.id === displayedId)!;

  const renderServicePanel = (service: Service, variant: "mobile" | "desktop") => (
    <div
      id={`${variant}-service-panel-${service.id}`}
      role="region"
      aria-labelledby={`service-button-${service.id}`}
      data-testid={variant === "desktop" ? "service-panel" : `mobile-service-panel-${service.id}`}
      className={`rounded-lg bg-gradient-to-br ${service.gradient.from} ${service.gradient.to} p-5 sm:p-6 lg:p-10 shadow-[0_12px_50px_-20px_rgba(0,0,0,0.3)]`}
    >
      <div className="grid items-center gap-6 lg:grid-cols-2">
        <div className="order-2 hidden aspect-video w-full overflow-hidden rounded-lg bg-white/40 ring-1 ring-black/5 md:block lg:order-1">
          <Media src={service.media.src} alt={service.media.alt} />
        </div>

        <div className="order-1 lg:order-2">
          <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl" data-testid="panel-title">
            {service.bottomTitle}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-800/90 sm:text-base" data-testid="panel-description">
            {service.paragraph}
          </p>
          <ul className="mt-4 space-y-2 text-gray-800">
            {service.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" />
                <span className="text-sm leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <TooltipProvider delayDuration={200}>
            <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
              {service.tools.map((t, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div className="ce-logo group cursor-pointer">
                      <Pill>{t}</Pill>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[200px] rounded-lg bg-gray-900 px-3 py-2 text-center text-xs text-white shadow-lg"
                  >
                    {toolTooltips[t] || t}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );

  return (
    <section id="services" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4" data-testid="services-label">
          Services at a glance
        </p>
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl" data-testid="services-heading">
          Services Designed to Drive<br />Measurable Growth
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto" data-testid="services-subheading">
          Choose your entry point — from fast clarity audits to ongoing growth retainers. Each service is built to maximize ROI.
        </p>
        <p className="mt-3 text-sm text-gray-500 italic" data-testid="services-note">
          Strategies adjusted based on business needs & audit.
        </p>
      </div>

      {/* TOP: Pressable button cards (one big logo + title) */}
      <div aria-label="Services" className="mt-8 grid gap-3 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-4">
        {services.map((s) => {
          const selected = s.id === activeId;
          return (
            <Fragment key={s.id}>
              <button
                id={`service-button-${s.id}`}
                aria-pressed={selected}
                onClick={() => setActiveId(s.id)}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-testid={`tab-${s.id}`}
                className={`group flex min-h-[86px] items-center justify-between gap-4 rounded-lg border bg-white p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 lg:min-h-[132px] lg:flex-col lg:justify-center lg:gap-3 lg:p-5 lg:text-center ${
                  selected
                    ? "border-violet-300 ring-2 ring-violet-500/70 shadow-md"
                    : "border-black/10"
                }`}
              >
                <span className="flex min-w-0 items-center gap-4 lg:flex-col lg:gap-2">
                  {s.logo.type === 'image' && s.logo.src ? (
                    <img
                      src={s.logo.src}
                      alt={s.topTitle}
                      className="h-9 w-12 shrink-0 object-contain sm:h-10 lg:h-12 lg:w-auto"
                      data-testid={`logo-${s.id}`}
                    />
                  ) : s.logo.type === 'icon' && s.logo.icon ? (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-50 to-indigo-50 ring-1 ring-violet-200 lg:h-12 lg:w-12">
                      {(() => {
                        const Icon = s.logo.icon;
                        return <Icon className="h-5 w-5 text-violet-600 lg:h-6 lg:w-6" />;
                      })()}
                    </span>
                  ) : (
                    <span className="h-10 w-10 shrink-0 rounded-lg bg-white/80 ring-1 ring-black/10 lg:h-12 lg:w-12" />
                  )}
                  <span className="min-w-0 text-base font-semibold leading-snug text-gray-900 sm:text-lg lg:text-lg" data-testid={`tab-title-${s.id}`}>
                    {s.topTitle}
                  </span>
                </span>
                <span className="text-xl leading-none text-gray-400 lg:hidden" aria-hidden>
                  {selected ? "↓" : "→"}
                </span>
              </button>

              {selected && (
                <div className="md:col-span-2 lg:hidden">
                  {renderServicePanel(s, "mobile")}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* BOTTOM: Detailed gradient panel */}
      <div className="mt-8 hidden lg:block">
        {renderServicePanel(active, "desktop")}
      </div>

      {/* Tooltip hover effects */}
      <style>{`
        .ce-logo { position: relative; display: inline-flex; align-items: center; justify-content: center; }
        .ce-logo > * { transition: transform 0.18s ease, filter 0.18s ease; }
        .ce-logo:hover > * { transform: scale(1.06); filter: saturate(1.15); }
      `}</style>
    </section>
  );
}
