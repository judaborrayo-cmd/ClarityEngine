import "./faq-budget.css";
import { useState, useMemo, type ReactNode } from "react";

type QA = { id: string; q: string; a: ReactNode; popular?: boolean };
type Category = { id: string; title: string; items: QA[] };

const CATEGORIES: Category[] = [
  {
    "id": "fit-support",
    "title": "Fit & support",
    "items": [
      {
        "id": "fit",
        "q": "Is Clarity Engine a fit for our business?",
        "a": "Our strongest fit is an established or growing retreat, travel, hospitality, wellness, or fitness business that wants to improve its marketing and has the capacity to act on what we learn. We’ll discuss your goals, resources, and current challenges before recommending an engagement."
      },
      {
        "id": "team",
        "q": "Can you work with our existing team or agency?",
        "a": "Yes. We can provide direction and collaborate with your team, take ownership of specific improvements, or handle a broader agreed scope. We’ll clarify responsibilities so everyone knows who is moving each piece forward."
      },
      {
        "id": "scope",
        "q": "Do you provide strategy, execution, or both?",
        "a": "Both are available. The assessment, Strategy Sprint, and Deep Dive Growth Audit offer different levels of diagnosis and direction. The Growth Partnership brings ongoing strategy and agreed execution together."
      },
      {
        "id": "ai",
        "q": "How do you use AI?",
        "a": "We use AI to accelerate research, analysis, creative development, and landing-page production. Clarity Engine directs the work, reviews the output, and connects it to your business priorities. The benefit is more capacity to move useful ideas into action and learn from them."
      }
    ]
  },
  {
    "id": "process-next-steps",
    "title": "Process & next steps",
    "items": [
      {
        "id": "speed",
        "q": "How soon can we start making improvements?",
        "a": "That depends on access, the work involved, and your team’s approval process. Early priorities often include tracking gaps, campaign issues, and landing-page opportunities. We agree on a practical sequence and distinguish changes we can make quickly from those that need more preparation."
      },
      {
        "id": "audit",
        "q": "What happens after an audit?",
        "a": "You receive findings, a prioritized roadmap, and a personal walkthrough. You can implement the recommendations internally, work with another provider, or discuss separately scoped support with Clarity Engine."
      },
      {
        "id": "measure",
        "q": "How do you measure progress?",
        "a": "We agree on measures that reflect your business goals. Those may include qualified inquiries, bookings, enrollment, acquisition costs, and advertising returns—alongside the data needed to understand what is influencing them."
      },
      {
        "id": "call",
        "q": "What happens on a Growth Call?",
        "a": "We discuss your business, what you’re trying to improve, and the support you need. You’ll have an opportunity to ask questions and explore whether working together makes sense."
      }
    ]
  }
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
          Before we work together.
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600" data-testid="faq-hybrid-subheading">
          Quick answers to help you decide with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
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
                    <div key={it.id} className={it.id === "budgets" ? `faq-budget-highlight${open ? " is-open" : ""}` : undefined}>
                      <button
                        id={`faq-question-${it.id}`}
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
                        aria-labelledby={`faq-question-${it.id}`}
                        data-testid={`answer-${it.id}`}
                        className={`text-slate-700 text-xs sm:text-sm px-2 overflow-y-auto transition-all duration-200 ${
                          open ? `${it.id === "budgets" ? "max-h-none" : "max-h-[200px]"} opacity-100 pb-2 pt-1` : "max-h-0 opacity-0"
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
