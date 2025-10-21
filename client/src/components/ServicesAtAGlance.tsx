import { useMemo, useState } from "react";
import { Target, BarChart3, FlaskConical } from "lucide-react";

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
  const services = useMemo(
    () => [
      {
        id: "google-ads",
        topTitle: "Google Ads Advertising",
        bottomTitle: "Google Ads Advertising",
        logo: { type: 'image' as const, src: googleAdsLogo },
        media: { src: "/media/google-ads-demo.mp4", alt: "Google Ads demo" },
        gradient: { from: "from-violet-50", to: "to-emerald-50" },
        paragraph:
          "Capture high-intent searches and eliminate wasted spend. We audit your account structure, refine targeting, and build scalable campaigns that convert.",
        bullets: ["Capture high-intent searches", "Cut CPL & eliminate waste"],
        tools: ["Search", "PMax", "YouTube", "GA4"],
      },
      {
        id: "meta",
        topTitle: "Meta Advertising",
        bottomTitle: "Meta Advertising",
        logo: { type: 'image' as const, src: metaLogo },
        media: { src: "/media/meta-campaigns.gif", alt: "Meta ads examples" },
        gradient: { from: "from-fuchsia-50", to: "to-indigo-50" },
        paragraph:
          "Build scalable creative systems and tiered remarketing funnels. We help you test, iterate, and scale what works across Meta's entire ecosystem.",
        bullets: ["Scalable creative systems", "Tiered remarketing"],
        tools: ["Meta", "Catalog", "DCT", "UGC"],
      },
      {
        id: "cro",
        topTitle: "Conversion Rate Optimization",
        bottomTitle: "Conversion Rate Optimization",
        logo: { type: 'icon' as const, icon: Target },
        media: { src: "/media/cro-demo.mp4", alt: "CRO demo" },
        gradient: { from: "from-indigo-50", to: "to-sky-50" },
        paragraph:
          "Turn traffic into revenue. We run structured tests on your funnels, fix tracking gaps, and optimize for real conversions—not vanity metrics.",
        bullets: ["Funnel testing & optimization", "Clearer tracking & attribution"],
        tools: ["CRO", "Hotjar", "GA4", "AB"],
      },
      {
        id: "reporting",
        topTitle: "Strategic Reporting & KPI Optimization",
        bottomTitle: "Strategic Reporting & KPI Optimization",
        logo: { type: 'icon' as const, icon: BarChart3 },
        media: { src: "/media/attribution.gif", alt: "Attribution dashboard" },
        gradient: { from: "from-emerald-50", to: "to-violet-50" },
        paragraph:
          "See what's actually driving revenue. We build unified dashboards that connect the dots between channels, campaigns, and conversions.",
        bullets: ["Unified metrics dashboard", "Decisions, not noise"],
        tools: ["GA4", "Looker", "Sheets", "Cohorts"],
      },
      {
        id: "youtube",
        topTitle: "YouTube Advertising",
        bottomTitle: "YouTube Advertising",
        logo: { type: 'image' as const, src: youtubeLogo },
        media: { src: "/media/youtube-demo.mp4", alt: "YouTube ads examples" },
        gradient: { from: "from-rose-50", to: "to-amber-50" },
        paragraph:
          "Educate, engage, and convert viewers at scale. We build high-intent video campaigns that capture attention and drive action.",
        bullets: ["Educate & capture viewers", "High-intent video targeting"],
        tools: ["In-Stream", "Discovery", "Retargeting"],
      },
      {
        id: "landing-pages",
        topTitle: "A/B Testing",
        bottomTitle: "A/B Testing",
        logo: { type: 'icon' as const, icon: FlaskConical },
        media: { src: "/media/landing-pages.gif", alt: "Landing page flows" },
        gradient: { from: "from-slate-50", to: "to-violet-50" },
        paragraph:
          "We prototype in Replit for look-and-feel, copy, and flow; your devs build the production pages. Then we iterate together.",
        bullets: ["Persuasive UX design", "Faster experiments"],
        tools: ["Figma", "Replit (prototype)", "Dev handoff"],
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>(services[0].id);
  const active = services.find((s) => s.id === activeId)!;

  return (
    <section id="services-at-a-glance" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900" data-testid="services-heading">Services at a glance</h2>
        <p className="mt-4 text-lg text-gray-700" data-testid="services-subheading">Strategies adjusted based on business needs & audit.</p>
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
            <div className="mt-5 flex flex-wrap gap-2">
              {active.tools.map((t, i) => (
                <Pill key={i}>{t}</Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
