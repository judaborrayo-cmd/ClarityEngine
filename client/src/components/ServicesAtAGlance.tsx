import { useMemo, useState } from "react";
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

export default function ServicesAtAGlance() {
  // Tool tooltip mapping
  const toolTooltips: Record<string, string> = {
    "Figma": "Prototype, share, get approval.",
    "Replit (prototype)": "Ship pages at sprint speed.",
    "Prototype": "Quickly test real ideas.",
    "Dev handoff": "Clean specs, fewer revisions.",
    "GA4": "All others bring data.",
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

  const services = useMemo(
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

  return (
    <section id="services" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
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
      <div role="tablist" aria-label="Service tabs" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const selected = s.id === activeId;
          return (
            <button
              key={s.id}
              id={`tab-${s.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`service-panel-${s.id}`}
              onClick={() => setActiveId(s.id)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-testid={`tab-${s.id}`}
              className={`group flex flex-col items-center justify-center gap-4 rounded-2xl border bg-white p-8 text-center shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none ${
                selected
                  ? "border-violet-300 ring-2 ring-violet-500/70 shadow-lg scale-[1.01]"
                  : "border-black/10"
              }`}
            >
              {/* BIG logo */}
              {s.logo.type === 'image' && s.logo.src ? (
                <img
                  src={s.logo.src}
                  alt={s.topTitle}
                  className="h-12 w-auto sm:h-14 lg:h-16 object-contain"
                  data-testid={`logo-${s.id}`}
                />
              ) : s.logo.type === 'icon' && s.logo.icon ? (
                <div className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 ring-1 ring-violet-200">
                  {(() => {
                    const Icon = s.logo.icon;
                    return <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-violet-600" />;
                  })()}
                </div>
              ) : (
                <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-xl bg-white/80 ring-1 ring-black/10" />
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900" data-testid={`tab-title-${s.id}`}>{s.topTitle}</h3>
            </button>
          );
        })}
      </div>

      {/* BOTTOM: Detailed gradient panel */}
      <div
        id={`service-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        data-testid="service-panel"
        className={`mt-10 rounded-3xl bg-gradient-to-br ${active.gradient.from} ${active.gradient.to} p-6 sm:p-8 lg:p-10 shadow-[0_12px_50px_-20px_rgba(0,0,0,0.3)]`}
      >
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Media */}
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-white/40 ring-1 ring-black/5">
            <Media src={active.media.src} alt={active.media.alt} />
          </div>

          {/* Copy */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900" data-testid="panel-title">{active.bottomTitle}</h3>
            <p className="mt-3 text-gray-800/90" data-testid="panel-description">{active.paragraph}</p>
            <ul className="mt-4 space-y-2 text-gray-800">
              {active.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-violet-600" />
                  <span className="text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <TooltipProvider delayDuration={200}>
              <div className="mt-5 flex flex-wrap gap-3">
                {active.tools.map((t, i) => (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <div className="ce-logo group cursor-pointer">
                        <Pill>{t}</Pill>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-[200px] text-center"
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

      {/* Tooltip hover effects */}
      <style>{`
        .ce-logo { position: relative; display: inline-flex; align-items: center; justify-content: center; }
        .ce-logo > * { transition: transform 0.18s ease, filter 0.18s ease; }
        .ce-logo:hover > * { transform: scale(1.06); filter: saturate(1.15); }
      `}</style>
    </section>
  );
}
