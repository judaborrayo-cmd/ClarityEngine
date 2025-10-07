/**
 * HowWeBuildFasterSection.jsx
 * --------------------------------------------------------------
 * 3×3 mixed grid: AI tools (with logos) + Solutions (with icons)
 */

const items = [
  // --- AI Tools (logos) ---
  {
    kind: "tool",
    name: "ChatGPT",
    img: "/images/chatgpt.png",
    desc: "Strategy generation & prompt engineering",
    accent: "from-teal-500/15 to-cyan-400/10",
  },
  {
    kind: "tool",
    name: "MidJourney",
    img: "/images/midjourney.png",
    desc: "Concept visuals & brand imagery",
    accent: "from-violet-500/15 to-purple-400/10",
  },
  {
    kind: "tool",
    name: "Replit",
    img: "/images/replit.png",
    desc: "Rapid code & web builds",
    accent: "from-orange-500/15 to-amber-400/10",
  },
  {
    kind: "tool",
    name: "VMake",
    img: "/images/vmake.png",
    desc: "AI image enhancement & upscaling",
    accent: "from-sky-500/15 to-blue-400/10",
  },

  // --- Solutions (icons) ---
  {
    kind: "solution",
    name: "Conversion Rate Optimization",
    icon: "⚡️",
    desc: "Friction fixes, proof, speed, and clearer CTAs",
    accent: "from-purple-500/15 to-purple-400/10",
  },
  {
    kind: "solution",
    name: "Content Creation",
    icon: "✍️",
    desc: "On-brand assets for ads, social, and landing pages",
    accent: "from-pink-500/15 to-rose-400/10",
  },
  {
    kind: "solution",
    name: "Collaboration & Workflows",
    icon: "🤝",
    desc: "Tight feedback loops with async + weekly cadence",
    accent: "from-blue-500/15 to-cyan-400/10",
  },
  {
    kind: "solution",
    name: "Ideation & Strategy",
    icon: "💡",
    desc: "Offer angles, testing plans, and priorities",
    accent: "from-amber-500/15 to-lime-400/10",
  },
  {
    kind: "solution",
    name: "Performance Analysis",
    icon: "📊",
    desc: "Benchmarks, cohorts, and ROI clarity",
    accent: "from-green-500/15 to-emerald-400/10",
  },
];

export default function HowWeBuildFasterSection() {
  return (
    <section className="container mx-auto px-4 py-14 text-center" aria-label="How We Build Faster" data-testid="section-how-we-build-faster">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">How We Build Faster</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
        We're a strategic partner (fractional CMO energy) that blends human insight with AI-accelerated execution—so you get strategy, design, and delivery at 10× speed.
      </p>

      {/* Compact, single-row feel on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {items.map((it) => (
          <div
            key={it.name}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-in-out hover:shadow-md hover:scale-105"
            data-testid={`${it.kind}-tile-${it.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {/* Gradient glow on hover */}
            <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${it.accent ?? "from-transparent to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative p-6 flex flex-col items-center text-center">
              {/* Logo or icon */}
              {it.kind === "tool" ? (
                <img
                  src={it.img}
                  alt={it.name}
                  className="h-10 sm:h-12 mb-3 mx-auto animate-pulse-slow group-hover:animate-pulse-grow"
                  data-testid={`img-${it.name.toLowerCase()}`}
                />
              ) : (
                <div className="text-3xl sm:text-4xl mb-3 select-none" data-testid={`icon-${it.name.toLowerCase().replace(/\s+/g, '-')}`}>{it.icon}</div>
              )}
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{it.name}</h3>
              <p className="text-[12px] text-gray-600 leading-snug">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulseGrow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.12); opacity: 0.97; }
        }
        .animate-pulse-slow { animation: pulseGrow 3.8s ease-in-out infinite; }
        .group-hover\\:animate-pulse-grow:hover { animation: pulseGrow 2.2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
