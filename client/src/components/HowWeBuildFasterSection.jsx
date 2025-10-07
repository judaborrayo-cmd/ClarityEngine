/**
 * HowWeBuildFasterSection.jsx
 * ---------------------------------------------------------------------------
 * DROP-IN HOMEPAGE SECTION ONLY.
 * This component is fully self-contained and styles only itself using Tailwind.
 * Do NOT modify global styles, Tailwind config, routes, or other files.
 *
 * If your project doesn't have Framer Motion:
 *   npm i framer-motion
 *
 * Usage:
 *   import HowWeBuildFasterSection from "@/components/HowWeBuildFasterSection";
 *   // Inside your homepage component:
 *   <HowWeBuildFasterSection />
 */

import { useState } from "react";
import { motion } from "framer-motion";

// ---- Configurable tool data -------------------------------------------------
const TOOLS = [
  {
    name: "ChatGPT",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <circle cx="12" cy="12" r="10" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[10px] font-semibold">
          GPT
        </text>
      </svg>
    ),
    benefit: "Turns data & ideas into strategy, creative, and clarity—fast.",
  },
  {
    name: "Midjourney",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="6" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[9px] font-semibold">
          MJ
        </text>
      </svg>
    ),
    benefit: "Brings visual concepts to life in minutes, not days.",
  },
  {
    name: "Replit",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <circle cx="12" cy="12" r="10" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[9px] font-semibold">
          REPL
        </text>
      </svg>
    ),
    benefit: "Turns strategy into live tools, dashboards & prototypes.",
  },
  {
    name: "GA4 / Google Ads",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="3" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[8px] font-semibold">
          GA4
        </text>
      </svg>
    ),
    benefit: "Turns numbers into insights & action for paid growth.",
  },
  {
    name: "Meta Ads Manager",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <circle cx="12" cy="12" r="10" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[8px] font-semibold">
          META
        </text>
      </svg>
    ),
    benefit: "Accelerates creative testing & audience learnings.",
  },
  {
    name: "Klaviyo",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="6" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[8px] font-semibold">
          KLAV
        </text>
      </svg>
    ),
    benefit: "Designs automated emails that personalize & convert.",
  },
  {
    name: "DataFeedWatch",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <circle cx="12" cy="12" r="10" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[7.5px] font-semibold">
          DFW
        </text>
      </svg>
    ),
    benefit: "Cleans & enriches product feeds to boost ROAS.",
  },
  {
    name: "Figma / Canva",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="3" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[8px] font-semibold">
          UX
        </text>
      </svg>
    ),
    benefit: "Turns brand ideas into clear, conversion-first visuals.",
  },
  {
    name: "Claude / Vision",
    logo: () => (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden>
        <circle cx="12" cy="12" r="10" className="fill-white/90" />
        <text x="12" y="16" textAnchor="middle" className="fill-black text-[8px] font-semibold">
          AI+
        </text>
      </svg>
    ),
    benefit: "Synthesizes messy inputs into crisp direction & briefs.",
  },
];

// ---- Tile component ----------------------------------------------------------
function ToolTile({ name, logo: Logo, benefit }) {
  const [active, setActive] = useState(false);

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative isolate w-full aspect-square rounded-2xl p-4 overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40"
      aria-label={`${name}: ${benefit}`}
      data-testid={`tool-tile-${name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`}
    >
      <div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden
      >
        <div className="absolute -inset-24 bg-[conic-gradient(at_50%_50%,#8E2DE2,#4A00E0,#06b6d4,#8E2DE2)] blur-2xl opacity-40" />
      </div>

      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center text-white">
          <Logo />
          <span className="mt-3 text-base font-medium tracking-wide opacity-90">{name}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-center text-sm text-white/95 bg-black/30 backdrop-blur-sm"
      >
        {benefit}
      </motion.div>
    </motion.button>
  );
}

export default function HowWeBuildFasterSection() {
  return (
    <section className="relative w-full" data-testid="section-how-we-build-faster">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0f1020] via-[#0b0e1a] to-[#070910]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {TOOLS.map((t) => (
                <ToolTile key={t.name} name={t.name} logo={t.logo} benefit={t.benefit} />
              ))}
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">How We Build Faster</h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/80">
              We blend human strategy with AI acceleration. From page redesigns to CRO experiments
              and ad creative — we use modern tools to turn ideas into execution at{" "}
              <span className="font-semibold text-white">10× speed</span>. You get strategy,
              design, and direction — all synthesized through data and experience.
            </p>

            <div className="mt-8">
              <a
                href="/how-we-work"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 bg-white/10 hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-white/40"
                data-testid="link-explore-tools"
              >
                Explore Our Tools
                <svg
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
