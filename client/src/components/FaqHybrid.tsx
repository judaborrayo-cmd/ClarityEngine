import { useState, useMemo } from "react";

type QA = { id: string; q: string; a: string; popular?: boolean };
type Category = { id: string; title: string; items: QA[] };

const CATEGORIES: Category[] = [
  {
    id: "budget-fit",
    title: "Budget & Fit",
    items: [
      {
        id: "budgets",
        q: "What budgets do you work with?",
        a: "Most clients invest $4k–$30k+/mo across Google, Meta, or YouTube. Below ~$4k, testing cycles slow down. Not there yet? We'll map a foundation until you're ready to scale.",
      },
      {
        id: "brands",
        q: "What types of brands do you usually work with?",
        a: "Purpose-driven teams in health, wellness, travel, education, lifestyle. Best fit = brands that value iteration, KPIs, and long-term growth.",
      },
      {
        id: "good-fit",
        q: "How do I know if we're a good fit?",
        a: "You value transparency, learning, and data-backed advertising—and you're ready to invest for compounding returns.",
      },
      {
        id: "one-vs-multi",
        q: "Do you offer single- or multi-platform support?",
        a: "Both. We can go deep on one channel (e.g., Google-only) or orchestrate an integrated plan across Google, Meta, and YouTube.",
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
        a: "Yes—partners or fractional CMO. We align with SEO, design, web, analytics to keep tracking, creative, and funnel strategy tight.",
      },
      {
        id: "platform-choice",
        q: "How do you decide which platforms to focus on?",
        a: "We start with an audit of funnel, audience, and goals. Then we recommend Google, Meta, YouTube—or a mix—based on intent, creative assets, and available data.",
      },
      {
        id: "after-audit",
        q: "What happens after the initial audit?",
        a: "You get a roadmap: quick wins + longer plays + measurement plan. Implement with your team or keep us on to execute/optimize.",
      },
      {
        id: "collab-agencies",
        q: "Can you collaborate with my existing agency or freelancers?",
        a: "Absolutely. We bridge creative, web, and ads; and can refer trusted partners for video, design, or analytics.",
      },
    ],
  },
  {
    id: "outcomes",
    title: "Outcomes & Philosophy",
    items: [
      {
        id: "speed",
        q: "How fast can I see results?",
        a: "Audits deliver clarity in days/weeks. Most see movement in 30–60 days once tracking and structure are fixed.",
      },
      {
        id: "measure-success",
        q: "How do you measure success?",
        a: "We optimize to revenue-linked KPIs: ROAS, CPL/CPA, lead quality, bookings, and payback—never vanity metrics.",
      },
      {
        id: "different",
        q: "What makes your approach different?",
        a: "Strategy + execution + optimization in one loop. Every test compounds into a system that scales profitably.",
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
        id: "seo-collab",
        q: "Do you collaborate with SEO teams?",
        a: "Yes. We work alongside your SEO strategy to ensure paid and organic efforts reinforce each other for maximum visibility and conversion.",
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
        a: "No annual lock-in. We start with a 90-day plan and iterate based on results.",
      },
      {
        id: "deposit",
        q: "Why is there a $75 deposit?",
        a: "It focuses calendars on serious calls, covers prep, and is credited to your first audit or retainer if we proceed.",
      },
      {
        id: "intro-length",
        q: "How long is the Strategic Intro Call?",
        a: "Plan for 30 minutes. We surface your biggest ROI blockers, align on goals, and outline next steps.",
      },
    ],
  },
];

type Props = {
  defaultVisibleCategories?: number;
  defaultVisibleQuestionsPerCategory?: number;
};

export default function FaqHybrid({
  defaultVisibleCategories = 2,
  defaultVisibleQuestionsPerCategory = 3,
}: Props) {
  const [openMap, setOpenMap] = useState<Record<string, string | null>>({});
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggle = (catId: string, itemId: string) => {
    setOpenMap((prev) => ({
      ...prev,
      [catId]: prev[catId] === itemId ? null : itemId,
    }));
  };

  const toggleCategoryExpansion = (catId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) {
        next.delete(catId);
      } else {
        next.add(catId);
      }
      return next;
    });
  };

  const visibleCats = useMemo(
    () => (showAllCategories ? CATEGORIES : CATEGORIES.slice(0, defaultVisibleCategories)),
    [showAllCategories, defaultVisibleCategories]
  );

  return (
    <section id="faq-compact" className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900" data-testid="faq-hybrid-heading">
          FAQs
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600" data-testid="faq-hybrid-subheading">
          Quick answers to help you decide with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleCats.map((cat) => {
          const isExpanded = expandedCategories.has(cat.id);
          const visibleItems = isExpanded
            ? cat.items
            : cat.items.slice(0, defaultVisibleQuestionsPerCategory);
          const hasMore = cat.items.length > defaultVisibleQuestionsPerCategory;

          return (
            <div
              key={cat.id}
              className="space-y-2 border border-slate-200 p-3 rounded-xl bg-white/70 backdrop-blur shadow-sm"
              data-testid={`category-${cat.id}`}
            >
              <h3 className="font-semibold text-base text-slate-900 pb-1.5 border-b border-slate-100">
                {cat.title}
              </h3>
              <div className="space-y-1">
                {visibleItems.map((it) => {
                  const open = openMap[cat.id] === it.id;
                  return (
                    <div key={it.id}>
                      <button
                        onClick={() => toggle(cat.id, it.id)}
                        aria-expanded={open}
                        aria-controls={`faq-${it.id}`}
                        data-testid={`button-faq-${it.id}`}
                        className="w-full text-left text-sm font-medium text-slate-900 py-1.5 px-2 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 rounded hover:bg-slate-50/50 transition-colors duration-150"
                      >
                        <span>{it.q}</span>
                        <svg
                          className={`h-4 w-4 shrink-0 ml-2 transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.107l3.71-3.877a.75.75 0 111.08 1.04l-4.24 4.43a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                        </svg>
                      </button>
                      <div
                        id={`faq-${it.id}`}
                        role="region"
                        aria-labelledby={`faq-${it.id}`}
                        data-testid={`answer-${it.id}`}
                        className={`text-slate-700 text-xs sm:text-sm px-2 overflow-y-auto transition-all duration-200 ${
                          open ? "max-h-[200px] opacity-100 pb-2 pt-1" : "max-h-0 opacity-0"
                        }`}
                      >
                        {it.a}
                      </div>
                    </div>
                  );
                })}
              </div>
              {hasMore && (
                <button
                  onClick={() => toggleCategoryExpansion(cat.id)}
                  data-testid={`toggle-category-${cat.id}`}
                  className="text-xs text-violet-600 hover:text-violet-700 font-medium py-1 px-2"
                >
                  {isExpanded ? "Show less" : `Show all ${cat.items.length} questions`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {CATEGORIES.length > defaultVisibleCategories && (
        <div className="mt-5 text-center">
          <button
            onClick={() => setShowAllCategories((v) => !v)}
            data-testid="button-toggle-all-categories"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:border-violet-400 hover:text-violet-700 transition-colors duration-200"
          >
            {showAllCategories ? "Show less" : "View all FAQs"}
          </button>
        </div>
      )}
    </section>
  );
}
