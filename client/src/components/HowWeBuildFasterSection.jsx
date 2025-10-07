import { useMemo, useRef, useState, useEffect } from "react";

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
import canvaLogo from '@assets/Canva Logo_1759871045288.jpeg';
import photoshopLogo from '@assets/Photoshop_1759870952584.png';

const ITEMS = [
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
  },
  {
    type: "tool",
    name: "MidJourney",
    desc: "Concept visuals & brand imagery",
    main: { img: midjourneyLogo },
    stack: [
      { name: "Photoshop", img: photoshopLogo },
      { name: "Figma", img: figmaLogo },
    ],
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
  },
  {
    type: "tool",
    name: "VMake",
    desc: "AI image enhancement & upscaling",
    main: { img: vmakeLogo },
    stack: [
      { name: "Photoshop", img: photoshopLogo },
      { name: "MidJourney", img: midjourneyLogo },
    ],
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
  },
];

function StackChip({ name, img }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] leading-none shadow-sm hover:shadow transition">
      <img src={img} alt={name} className="h-[22px] w-[22px] object-contain" />
      <span className="text-gray-800">{name}</span>
    </div>
  );
}

function Tile({ item }) {
  return (
    <div
      className="
        snap-start shrink-0 basis-[85%] sm:basis-[48%] lg:basis-[31%]
        mr-4 lg:mr-6
      "
      data-card
      data-testid={`${item.type}-tile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm p-5 text-center">
        {item.main?.img ? (
          <img src={item.main.img} alt={item.name} className="h-12 w-auto mx-auto mb-2 object-contain" data-testid={`img-${item.name.toLowerCase().replace(/\s+/g, '-')}`} />
        ) : (
          <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
            <span className="text-xl">{item.main?.emoji ?? "★"}</span>
          </div>
        )}

        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h3>
        <p className="text-[12px] text-gray-600 leading-snug mt-1">{item.desc}</p>

        {item.stack && item.stack.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2 max-w-[320px] mx-auto">
            {item.stack.slice(0, 4).map((m) => (
              <StackChip key={m.name} name={m.name} img={m.img} />
            ))}
            {item.stack.length > 4 && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] leading-none shadow-sm">
                +{item.stack.length - 4}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function useSlider(containerRef) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2);
  };

  const scrollByCard = (dir) => {
    const el = containerRef.current;
    if (!el) return;
    const first = el.querySelector("[data-card]");
    const cardWidth = first ? first.offsetWidth + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "next" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => update();
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return { canPrev, canNext, scrollByCard };
}

export default function HowWeBuildFasterSection() {
  const containerRef = useRef(null);
  const { canPrev, canNext, scrollByCard } = useSlider(containerRef);
  const items = useMemo(() => ITEMS, []);

  return (
    <section className="container mx-auto px-4 py-14" aria-label="How We Build Faster" data-testid="section-how-we-build-faster">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">How We Build Faster</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
          We're a strategic partner (fractional CMO energy) blending human insight with AI-accelerated execution — so you get strategy, design, and delivery at 10× speed.
        </p>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCard("prev")}
          disabled={!canPrev}
          className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 shadow disabled:opacity-40"
          data-testid="button-slider-prev"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCard("next")}
          disabled={!canNext}
          className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 shadow disabled:opacity-40"
          data-testid="button-slider-next"
        >
          ›
        </button>

        <div
          ref={containerRef}
          className="
            overflow-x-auto scrollbar-hide
            flex snap-x snap-mandatory
            -ml-2 pr-2
          "
          style={{
            scrollBehavior: "smooth",
          }}
          data-testid="slider-container"
        >
          <div className="shrink-0 basis-[2%]" aria-hidden />
          {items.map((item, idx) => (
            <Tile key={item.name + idx} item={item} />
          ))}
          <div className="shrink-0 basis-[2%]" aria-hidden />
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
