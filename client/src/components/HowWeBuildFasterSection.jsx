import chatgptLogo from '@assets/Chat GPT Logo_1759865417145.png';
import midjourneyLogo from '@assets/Midjourney-Logo_1759865050220.png';
import replitLogo from '@assets/Replit_logo_1759865452229.png';
import vmakeLogo from '@assets/vmake_1759865086289.png';
import googleDriveLogo from '@assets/Google_Drive_-_New_Logo_1759865428146.png';
import microsoftTeamsLogo from '@assets/Microsoft-Teams-Symbol_1759865428146.png';
import dropboxLogo from '@assets/Dropbox_(service)-Logo.wine_1759865428146.png';
import figmaLogo from '@assets/Figma-Logo_1759865443714.png';
import geminiLogo from '@assets/gemini-logo_brandlogos.net_fwajr-512x512_1759865458230.png';
import googleAnalyticsLogo from '@assets/Logo_Google_Analytics_1759865466930.png';
import canvaLogo from '@assets/stock_images/canva_logo_design_to_253db32b.jpg';

const items = [
  // Tools
  {
    type: "tool",
    name: "ChatGPT",
    desc: "Strategy generation & prompt engineering",
    main: { img: chatgptLogo },
    stack: [
      { name: "Replit", img: replitLogo },
      { name: "Gemini", img: geminiLogo },
    ],
    accent: "from-purple-500/14 to-blue-400/10",
  },
  {
    type: "tool",
    name: "MidJourney",
    desc: "Concept visuals & brand imagery",
    main: { img: midjourneyLogo },
    stack: [
      { name: "Photoshop", img: "/images/Photoshop.png" },
      { name: "Figma", img: figmaLogo },
    ],
    accent: "from-pink-500/14 to-rose-400/10",
  },
  {
    type: "tool",
    name: "Replit",
    desc: "Rapid code & web builds",
    main: { img: replitLogo },
    stack: [
      { name: "Replit", img: replitLogo },
      { name: "YouTube", img: "/images/YouTube-logo.png" },
    ],
    accent: "from-indigo-500/14 to-cyan-400/10",
  },
  {
    type: "tool",
    name: "VMake",
    desc: "AI image enhancement & upscaling",
    main: { img: vmakeLogo },
    stack: [
      { name: "Photoshop", img: "/images/Photoshop.png" },
      { name: "MidJourney", img: midjourneyLogo },
    ],
    accent: "from-emerald-500/14 to-green-400/10",
  },

  // Solutions
  {
    type: "solution",
    name: "Conversion Rate Optimization",
    desc: "Friction fixes, proof, speed, clearer CTAs.",
    main: { emoji: "⚡️" },
    stack: [
      { name: "Figma", img: figmaLogo },
      { name: "Replit", img: replitLogo },
      { name: "MidJourney", img: midjourneyLogo },
    ],
    accent: "from-purple-500/10 to-purple-400/6",
  },
  {
    type: "solution",
    name: "Content Creation",
    desc: "On-brand assets for ads, social, landing pages.",
    main: { emoji: "✍️" },
    stack: [
      { name: "Canva", img: canvaLogo },
      { name: "MidJourney", img: midjourneyLogo },
      { name: "ChatGPT", img: chatgptLogo },
      { name: "Google Drive", img: googleDriveLogo },
    ],
    accent: "from-pink-500/10 to-rose-400/6",
  },
  {
    type: "solution",
    name: "Collaboration & Workflows",
    desc: "Tight feedback loops with async + weekly cadence.",
    main: { emoji: "🤝" },
    stack: [
      { name: "Teams", img: microsoftTeamsLogo },
      { name: "Drive", img: googleDriveLogo },
      { name: "Dropbox", img: dropboxLogo },
    ],
    accent: "from-blue-500/10 to-cyan-400/6",
  },
  {
    type: "solution",
    name: "Ideation & Strategy",
    desc: "Offer angles, testing plans, priorities.",
    main: { emoji: "💡" },
    stack: [
      { name: "MidJourney", img: midjourneyLogo },
      { name: "Replit", img: replitLogo },
      { name: "Figma", img: figmaLogo },
      { name: "ChatGPT", img: chatgptLogo },
    ],
    accent: "from-amber-500/10 to-lime-400/6",
  },
  {
    type: "solution",
    name: "Performance Analysis",
    desc: "Benchmarks, cohorts, ROI clarity.",
    main: { emoji: "📊" },
    stack: [
      { name: "GA4", img: googleAnalyticsLogo },
      { name: "ChatGPT", img: chatgptLogo },
      { name: "Gemini", img: geminiLogo },
    ],
    accent: "from-green-500/10 to-emerald-400/6",
  },
];

function StackChip({ name, img }) {
  return (
    <div className="relative group">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] leading-none shadow-sm hover:shadow transition-shadow">
        <img src={img} alt={name} className="h-5 w-5 object-contain" data-testid={`chip-logo-${name.toLowerCase().replace(/\s+/g, '-')}`} />
        <span className="text-gray-800 font-medium">{name}</span>
      </div>
      <span 
        role="tooltip"
        className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
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
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-in-out hover:shadow-md hover:scale-105"
            data-testid={`${it.type}-tile-${it.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${it.accent ?? "from-transparent to-transparent"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative p-5 flex flex-col items-center text-center">
              {it.main?.img ? (
                <img src={it.main.img} alt={it.name} className="h-12 w-auto mb-2 object-contain" data-testid={`img-${it.name.toLowerCase().replace(/\s+/g, '-')}`} />
              ) : (
                <div className="h-12 w-12 mb-2 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <span className="text-xl">{it.main?.emoji ?? "★"}</span>
                </div>
              )}

              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{it.name}</h3>
              <p className="text-[12px] text-gray-600 leading-snug mt-1">{it.desc}</p>

              {it.stack && it.stack.length > 0 && (
                <div className="mt-3 flex flex-wrap justify-center gap-2 max-w-[260px]">
                  {it.stack.slice(0, 4).map((m) => (
                    <StackChip key={m.name} name={m.name} img={m.img} />
                  ))}
                  {it.stack.length > 4 && (
                    <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] leading-none shadow-sm font-medium text-gray-800">
                      +{it.stack.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
