import { useEffect, useMemo, useRef, useState } from "react";

type QA = {
  id: string;
  q: string;
  a: string;
  popular?: boolean;
};

type Category = {
  id: string;
  title: string;
  items: QA[];
};

const CATEGORIES: Category[] = [
  {
    id: "budget-fit",
    title: "Budget & Fit",
    items: [
      {
        id: "budgets",
        q: "What budgets do you work with?",
        a: "Most clients invest $4k–$30k+/mo across Google, Meta, or YouTube. Below ~$4k, test cycles are slow and insights take longer. If you're not there yet, we'll give you a foundational plan until you're ready to scale.",
        popular: true,
      },
      {
        id: "brands",
        q: "What types of brands do you usually work with?",
        a: "Purpose-driven teams in health, wellness, travel, education, and lifestyle. We work best with brands that value iteration, KPIs, and long-term growth over quick hacks.",
      },
      {
        id: "good-fit",
        q: "How do I know if we're a good fit?",
        a: "If you value transparency, learning, and data-backed advertising—and you're ready to invest for compounding returns—we'll get along. If you want set-and-forget ads or overnight results, we're not the right partner.",
      },
    ],
  },
  {
    id: "process-collab",
    title: "Process & Collaboration",
    items: [
      {
        id: "with-team",
        q: "Will you work with our team?",
        a: "Yes. We plug in as partners or fractional CMOs and collaborate with your SEO, design, web, or analytics teams to keep tracking, creative, and funnel strategy aligned.",
      },
      {
        id: "platform-choice",
        q: "How do you decide which platforms to focus on?",
        a: "We start with an audit of funnel, audience, and goals. Then we recommend Google, Meta, YouTube—or a mix—based on intent, creative assets, and available data.",
      },
      {
        id: "after-audit",
        q: "What happens after the initial audit?",
        a: "You get a roadmap with quick wins, longer-term plays, and a measurement plan. Implement in-house or keep us on to execute and optimize with you.",
      },
      {
        id: "collab-agencies",
        q: "Can you collaborate with my existing agency or freelancers?",
        a: "Absolutely. We bridge creative, web, and ads to ensure tracking and messaging stay tight. Need extra hands? We can refer trusted partners for video, design, or analytics.",
      },
    ],
  },
  {
    id: "outcomes-philosophy",
    title: "Outcomes & Philosophy",
    items: [
      {
        id: "speed",
        q: "How fast can I see results?",
        a: "Audits deliver clarity in days or weeks—not months. Most clients see meaningful movement in 30–60 days once tracking and structure are fixed.",
        popular: true,
      },
      {
        id: "measure-success",
        q: "How do you measure success?",
        a: "We optimize to revenue-linked KPIs: ROAS, CPL/CPA, lead quality, bookings, and payback—never vanity metrics.",
      },
      {
        id: "different",
        q: "What makes your approach different?",
        a: "You get strategy, execution, and optimization in one loop. Every test compounds into a system that scales profitably and predictably.",
      },
      {
        id: "guarantee",
        q: "Can you guarantee results?",
        a: "No hype. We don't sell miracles—we build repeatable systems. Expect clear direction in 30–60 days, then compounding ROI with consistent execution.",
      },
    ],
  },
  {
    id: "validation-expansion",
    title: "Validation & Expansion",
    items: [
      {
        id: "pmf",
        q: "Can you help validate product-market fit before scaling?",
        a: "Yes. We run distributed tests across platforms to validate messaging, audiences, and offers before you commit to bigger budgets.",
      },
      {
        id: "one-vs-multi",
        q: "Do you offer single- or multi-platform support?",
        a: "Both. We can go deep on one channel (e.g., Google-only) or orchestrate an integrated plan across Google, Meta, and YouTube.",
      },
    ],
  },
  {
    id: "nonprofit-grants",
    title: "Nonprofit & Grants",
    items: [
      {
        id: "grants",
        q: "Do you work with nonprofits or Google Grant accounts?",
        a: "Yes. We help you qualify, structure, and optimize Google Ad Grants to drive awareness, donations, and program demand with clear tracking.",
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics & Engagement",
    items: [
      {
        id: "contracts",
        q: "Do you require long-term contracts?",
        a: "No annual lock-in. We begin with a 90-day plan and iterate based on results.",
      },
      {
        id: "deposit",
        q: "Why is there a $75 deposit?",
        a: "It keeps the calendar focused on serious conversations, covers prep time, and ensures we're both invested. If we proceed, it's credited toward your first audit or retainer.",
      },
      {
        id: "intro-length",
        q: "How long is the Strategic Intro Call?",
        a: "Plan for 20–30 minutes. We surface your biggest ROI blockers, align on goals, and outline next steps.",
      },
    ],
  },
];

function findItemByHash(hash: string) {
  const id = hash.replace(/^#/, "");
  for (const cat of CATEGORIES) {
    for (const item of cat.items) {
      if (`faq-${item.id}` === id) {
        return { catId: cat.id, itemId: item.id };
      }
    }
  }
  return null;
}

export default function FaqPodium() {
  const [openMap, setOpenMap] = useState<Record<string, string | null>>(() => {
    const init: Record<string, string | null> = {};
    CATEGORIES.forEach((c) => (init[c.id] = null));
    return init;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleHash() {
      const hit = findItemByHash(window.location.hash);
      if (hit) {
        setOpenMap((m) => ({ ...m, [hit.catId]: hit.itemId }));
        setTimeout(() => {
          const el = document.getElementById(`faq-${hit.itemId}`);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      }
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const onToggle = (catId: string, itemId: string) => {
    setOpenMap((m) => ({ ...m, [catId]: m[catId] === itemId ? null : itemId }));
    history.replaceState(null, "", `#faq-${itemId}`);
  };

  return (
    <section ref={containerRef} className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold sm:text-4xl text-gray-900" data-testid="faq-heading">FAQs</h2>
        <p className="mt-4 text-xl text-gray-600" data-testid="faq-subheading">
          Quick answers by category. Click a question to expand.
        </p>
      </div>

      <div className="space-y-8">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900" data-testid={`category-${cat.id}`}>{cat.title}</h3>

            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm">
              {cat.items.map((it) => {
                const open = openMap[cat.id] === it.id;
                return (
                  <div key={it.id} id={`faq-${it.id}`} className="p-0">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`panel-${it.id}`}
                      onClick={() => onToggle(cat.id, it.id)}
                      data-testid={`button-faq-${it.id}`}
                      className={[
                        "w-full px-5 py-4 text-left flex items-center justify-between gap-4",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 rounded-2xl",
                        "hover:bg-gray-50/50 transition-colors duration-150",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2">
                        {it.popular && (
                          <span
                            className="inline-flex items-center justify-center text-amber-600"
                            aria-label="Popular question"
                            title="Popular"
                            data-testid={`star-${it.id}`}
                          >
                            ★
                          </span>
                        )}
                        <span className="font-medium text-slate-900" data-testid={`question-${it.id}`}>{it.q}</span>
                      </div>
                      <svg
                        className={[
                          "h-5 w-5 shrink-0 transition-transform duration-200",
                          open ? "rotate-180" : "",
                        ].join(" ")}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.107l3.71-3.877a.75.75 0 111.08 1.04l-4.24 4.43a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                      </svg>
                    </button>

                    <div
                      id={`panel-${it.id}`}
                      role="region"
                      aria-labelledby={`faq-${it.id}`}
                      data-testid={`answer-${it.id}`}
                      className={[
                        "px-5 pt-0 pb-4 overflow-hidden transition-all duration-200",
                        open ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0",
                      ].join(" ")}
                    >
                      <p className="text-slate-700 text-sm sm:text-[15px] leading-6">
                        {it.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
