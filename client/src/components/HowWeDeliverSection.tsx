import { useMemo, useState } from "react";
import { Search, Target, Users, Crown, Heart, BarChart3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

export default function HowWeDeliverSection() {
  // Tool tooltip mapping
  const toolTooltips: Record<string, string> = {
    "GA4": "In God we trust, all others bring data.",
    "Hotjar": "See friction. Fix flow.",
    "CRO": "See friction. Fix flow.",
    "AB Testing": "Test smarter. Scale faster.",
    "Search": "Show up when they search.",
    "PMax": "Omnipresence without chaos.",
    "Meta": "Scale what works across platforms.",
    "Instagram": "Visual storytelling that converts.",
    "Retargeting": "Don't waste warm attention.",
    "Looker": "Answers, not dashboards.",
    "Sheets": "Fast models, clear numbers.",
    "Attribution": "Know what drives revenue.",
    "$10k Grant": "Free budget for impact.",
    "Compliance": "Keep the free money flowing.",
    "Landing Pages": "Convert more visitors.",
    "Offers": "Test what sells best.",
    "Funnels": "Optimize every step.",
  };

  const services = useMemo(
    () => [
      {
        id: "growth-audit",
        topTitle: "Growth Clarity Audit",
        bottomTitle: "Uncover Hidden Leaks & Wasted Spend",
        icon: Search,
        iconColor: "text-blue-600",
        iconBg: "from-blue-50 to-cyan-50",
        media: { src: "/media/google-ads-demo.mp4", alt: "Growth audit demo" },
        gradient: { from: "from-blue-50", to: "to-cyan-50" },
        paragraph:
          "Uncover hidden leaks and wasted spend so every dollar is working harder. Leave with a clear roadmap that connects strategy to ROI. We audit your campaigns, tracking, and funnel to identify quick wins and long-term opportunities.",
        bullets: [
          "Deep-dive into current campaign structure",
          "Identify wasted spend and optimization opportunities",
          "Clear roadmap with prioritized action items",
          "30-60 min strategy call + PDF/video walkthrough"
        ],
        tools: ["GA4", "Hotjar", "CRO", "AB Testing"],
      },
      {
        id: "google-ads",
        topTitle: "Google Ads Management",
        bottomTitle: "Campaigns Structured for Revenue",
        icon: Target,
        iconColor: "text-green-600",
        iconBg: "from-green-50 to-emerald-50",
        media: { src: "/media/google-ads-demo.mp4", alt: "Google Ads demo" },
        gradient: { from: "from-green-50", to: "to-emerald-50" },
        paragraph:
          "Campaigns structured for measurable revenue—not just clicks. Custom strategies that serve profitable without burning budget on vanity metrics. We build scalable systems that capture demand and convert consistently.",
        bullets: [
          "High-intent search campaigns that convert",
          "Performance Max for omnipresence",
          "Ongoing optimization and testing",
          "Clear KPI tracking and reporting"
        ],
        tools: ["Search", "PMax", "GA4"],
      },
      {
        id: "paid-social",
        topTitle: "Paid Social Media Growth",
        bottomTitle: "Full-Funnel Campaigns That Convert",
        icon: Users,
        iconColor: "text-purple-600",
        iconBg: "from-purple-50 to-fuchsia-50",
        media: { src: "/media/meta-campaigns.gif", alt: "Social media ads" },
        gradient: { from: "from-purple-50", to: "to-fuchsia-50" },
        paragraph:
          "Meta, Instagram, and beyond. Full-funnel campaigns that build awareness, trust, and conversions—no cookie-cutter approaches. We create creative systems and remarketing funnels designed for profitable customer acquisition.",
        bullets: [
          "Creative frameworks for faster testing",
          "Tiered remarketing that builds momentum",
          "Proven strategies across Meta ecosystem",
          "Real insights that drive predictable growth"
        ],
        tools: ["Meta", "Instagram", "Retargeting"],
      },
      {
        id: "fractional-cmo",
        topTitle: "Fractional CMO",
        bottomTitle: "Strategic Leadership Without Full-Time Cost",
        icon: Crown,
        iconColor: "text-yellow-600",
        iconBg: "from-yellow-50 to-amber-50",
        media: { src: "/media/attribution.gif", alt: "Strategic planning" },
        gradient: { from: "from-yellow-50", to: "to-amber-50" },
        paragraph:
          "Hands-on leadership to unify strategy, creative, and paid media execution—unlocking value across your marketing stack. We align teams, prioritize initiatives, and ensure every dollar flows toward measurable outcomes.",
        bullets: [
          "Unified strategy across all channels",
          "Leadership for internal and agency teams",
          "Data-driven decision making frameworks",
          "Scalable systems for sustainable growth"
        ],
        tools: ["Looker", "Sheets", "Attribution"],
      },
      {
        id: "nonprofit-grant",
        topTitle: "Non-Profit Google Grant",
        bottomTitle: "Maximize Your $10k/Month Free Budget",
        icon: Heart,
        iconColor: "text-red-600",
        iconBg: "from-red-50 to-pink-50",
        media: { src: "/media/google-ads-demo.mp4", alt: "Google Grant setup" },
        gradient: { from: "from-red-50", to: "to-pink-50" },
        paragraph:
          "Unlock up to $10k/month in free ad spend for conversions, not just impressions. Grant best-practices to maximize impact while staying compliant. We help nonprofits drive donations, volunteers, and awareness without wasting the grant.",
        bullets: [
          "Full grant setup and compliance",
          "Campaigns optimized for conversions",
          "Monthly management and optimization",
          "Reporting that shows real impact"
        ],
        tools: ["$10k Grant", "Search", "Compliance"],
      },
      {
        id: "cro-funnel",
        topTitle: "CRO & Funnel Optimization",
        bottomTitle: "Scale Revenue Without Scaling Ad Spend",
        icon: BarChart3,
        iconColor: "text-indigo-600",
        iconBg: "from-indigo-50 to-violet-50",
        media: { src: "/media/cro-demo.mp4", alt: "CRO optimization" },
        gradient: { from: "from-indigo-50", to: "to-violet-50" },
        paragraph:
          "Iterative testing across landing pages, offers, and funnels. Scale bookings and revenue without scaling acquisition costs. We find friction, fix tracking, and test solutions that lift performance at every funnel stage.",
        bullets: [
          "Data-driven funnel analysis",
          "A/B testing on high-impact elements",
          "UX and copy optimizations",
          "Compounding returns through iteration"
        ],
        tools: ["CRO", "Hotjar", "Landing Pages", "Offers", "Funnels"],
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>(services[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const displayedId = hoveredId || activeId;
  const active = services.find((s) => s.id === displayedId)!;

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900" data-testid="how-we-deliver-title">
          How We Deliver
        </h2>
        <p className="mt-4 text-lg text-gray-600" data-testid="how-we-deliver-subtitle">
          Choose your entry point or build a plan across channels.
        </p>
      </div>

      {/* TOP: Service cards */}
      <div role="tablist" aria-label="Service delivery tabs" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const selected = s.id === activeId;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              id={`tab-${s.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`delivery-panel-${s.id}`}
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
              <div className={`flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-xl bg-gradient-to-br ${s.iconBg} ring-1 ring-violet-200`}>
                <Icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${s.iconColor}`} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900" data-testid={`tab-title-${s.id}`}>
                {s.topTitle}
              </h3>
            </button>
          );
        })}
      </div>

      {/* BOTTOM: Detailed panel */}
      <div
        id={`delivery-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        data-testid="delivery-panel"
        className={`mt-10 rounded-3xl bg-gradient-to-br ${active.gradient.from} ${active.gradient.to} p-6 sm:p-8 lg:p-10 shadow-[0_12px_50px_-20px_rgba(0,0,0,0.3)]`}
      >
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Media */}
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-white/40 ring-1 ring-black/5">
            <Media src={active.media.src} alt={active.media.alt} />
          </div>

          {/* Copy */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900" data-testid="delivery-panel-title">
              {active.bottomTitle}
            </h3>
            <p className="mt-3 text-gray-800/90" data-testid="delivery-panel-description">
              {active.paragraph}
            </p>
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
