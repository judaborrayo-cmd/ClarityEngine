/**
 * HowWeBuildFasterSection.jsx
 * Place these images in /public/images/ (adjust names if needed):
 * chatgpt.png
 * Midjourney-Logo.png
 * Replit_logo.png
 * vmake.png
 * Photoshop.png
 * Figma-Logo.png
 * YouTube-logo.png
 * Google Ads Logo.jpg
 * Logo_Google_Analytics.png
 * Shopify Logo.png
 * Google_Drive_-_New_Logo.png
 * Dropbox_(service)-Logo.wine.png
 * Microsoft-Teams-Symbol.png
 * gemini-logo.png
 * Reddit-Logo.png
 * Instagram_logo_2016.svg.png
 */

import chatgptLogo from '@assets/Chat GPT Logo_1759865076284.png';
import midjourneyLogo from '@assets/Midjourney-Logo_1759865050220.png';
import replitLogo from '@assets/Replit_logo_1759865058011.png';
import vmakeLogo from '@assets/vmake_1759865086289.png';

const items = [
  // Tools
  {
    type: "tool",
    name: "ChatGPT",
    desc: "Strategy generation & prompt engineering",
    main: { img: chatgptLogo },
    poweredBy: [
      { name: "Replit", img: replitLogo },
      { name: "Gemini", img: "/images/gemini-logo.png" },
    ],
    accent: "from-purple-500/15 to-blue-400/10",
  },
  {
    type: "tool",
    name: "MidJourney",
    desc: "Concept visuals & brand imagery",
    main: { img: midjourneyLogo },
    poweredBy: [
      { name: "Photoshop", img: "/images/Photoshop.png" },
      { name: "Figma", img: "/images/Figma-Logo.png" },
    ],
    accent: "from-pink-500/15 to-rose-400/10",
  },
  {
    type: "tool",
    name: "Replit",
    desc: "Rapid code & web builds",
    main: { img: replitLogo },
    poweredBy: [
      { name: "Replit", img: replitLogo },
      { name: "YouTube", img: "/images/YouTube-logo.png" },
    ],
    accent: "from-indigo-500/15 to-cyan-400/10",
  },
  {
    type: "tool",
    name: "VMake",
    desc: "AI image enhancement & upscaling",
    main: { img: vmakeLogo },
    poweredBy: [
      { name: "Photoshop", img: "/images/Photoshop.png" },
      { name: "MidJourney", img: midjourneyLogo },
    ],
    accent: "from-emerald-500/15 to-green-400/10",
  },

  // Solutions
  {
    type: "solution",
    name: "Conversion Rate Optimization",
    desc: "Friction fixes, proof, speed, clearer CTAs.",
    main: { emoji: "⚡️" },
    poweredBy: [
      { name: "Google Ads", img: "/images/Google Ads Logo.jpg" },
      { name: "Google Analytics", img: "/images/Logo_Google_Analytics.png" },
      { name: "Shopify", img: "/images/Shopify Logo.png" },
    ],
    accent: "from-purple-500/12 to-purple-400/8",
  },
  {
    type: "solution",
    name: "Content Creation",
    desc: "On-brand assets for ads, social, landing pages.",
    main: { emoji: "✍️" },
    poweredBy: [
      { name: "Photoshop", img: "/images/Photoshop.png" },
      { name: "MidJourney", img: midjourneyLogo },
      { name: "Instagram", img: "/images/Instagram_logo_2016.svg.png" },
      { name: "YouTube", img: "/images/YouTube-logo.png" },
    ],
    accent: "from-pink-500/12 to-rose-400/8",
  },
  {
    type: "solution",
    name: "Collaboration & Workflows",
    desc: "Tight feedback loops with async + weekly cadence.",
    main: { emoji: "🤝" },
    poweredBy: [
      { name: "Google Drive", img: "/images/Google_Drive_-_New_Logo.png" },
      { name: "Dropbox", img: "/images/Dropbox_(service)-Logo.wine.png" },
      { name: "Microsoft Teams", img: "/images/Microsoft-Teams-Symbol.png" },
    ],
    accent: "from-blue-500/12 to-cyan-400/8",
  },
  {
    type: "solution",
    name: "Ideation & Strategy",
    desc: "Offer angles, testing plans, priorities.",
    main: { emoji: "💡" },
    poweredBy: [
      { name: "ChatGPT", img: chatgptLogo },
      { name: "Gemini", img: "/images/gemini-logo.png" },
      { name: "Replit", img: replitLogo },
      { name: "Reddit", img: "/images/Reddit-Logo.png" },
    ],
    accent: "from-amber-500/12 to-lime-400/8",
  },
  {
    type: "solution",
    name: "Performance Analysis",
    desc: "Benchmarks, cohorts, ROI clarity.",
    main: { emoji: "📊" },
    poweredBy: [
      { name: "Google Analytics", img: "/images/Logo_Google_Analytics.png" },
      { name: "Google Ads", img: "/images/Google Ads Logo.jpg" },
      { name: "Shopify", img: "/images/Shopify Logo.png" },
    ],
    accent: "from-green-500/12 to-emerald-400/8",
  },
];

function MiniLogo({ name, img }) {
  return (
    <div className="relative group/mini">
      <img
        src={img}
        alt={name}
        className="h-4 w-4 sm:h-5 sm:w-5 object-contain opacity-85 hover:opacity-100 transition"
        data-testid={`mini-logo-${name.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <span
        className="
          pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50
          whitespace-nowrap rounded-md bg-black text-white text-[10px] px-2 py-1
          opacity-0 group-hover/mini:opacity-100 transition-opacity duration-200
        "
      >
        {name}
      </span>
    </div>
  );
}

export default function HowWeBuildFasterSection() {
  return (
    <section className="container mx-auto px-4 py-14 text-center" aria-label="How We Build Faster" data-testid="section-how-we-build-faster">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">How We Build Faster</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
        We're a strategic partner (fractional CMO energy) blending human insight with AI-accelerated execution —
        so you get strategy, design, and delivery at 10× speed.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {items.map((it) => (
          <div
            key={it.name}
            className="
              group relative rounded-2xl border border-gray-200 bg-white shadow-sm
              transition-transform duration-300 ease-in-out hover:shadow-md hover:scale-105
            "
            data-testid={`${it.type}-tile-${it.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div
              className={`
                pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br
                ${it.accent ?? "from-transparent to-transparent"}
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
              `}
            />

            <div className="relative p-5 flex flex-col items-center text-center">
              {it.main?.img ? (
                <img
                  src={it.main.img}
                  alt={it.name}
                  className="h-12 w-auto mb-2 object-contain"
                  data-testid={`img-${it.name.toLowerCase().replace(/\s+/g, '-')}`}
                />
              ) : (
                <div className="h-12 w-12 mb-2 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <span className="text-xl">{it.main?.emoji ?? "★"}</span>
                </div>
              )}

              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{it.name}</h3>
              <p className="text-[12px] text-gray-600 leading-snug mt-1">{it.desc}</p>

              {it.poweredBy && it.poweredBy.length > 0 && (
                <div className="mt-3 flex items-center gap-2 overflow-visible">
                  {it.poweredBy.map((m) => (
                    <MiniLogo key={m.name} name={m.name} img={m.img} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
