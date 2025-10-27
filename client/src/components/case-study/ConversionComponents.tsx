import { Link } from "wouter";

const bookUrl = "/book-a-strategic-intro-call";

export function CTAButton({
  children,
  href = bookUrl,
  ariaLabel = "Book a Strategic Intro Call",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <Link
      to={href}
      aria-label={ariaLabel}
      className={[
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold",
        "shadow-sm hover:shadow-md transition",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      ].join(" ")}
      data-testid="cta-button"
    >
      {children}
      <span className="ml-2" aria-hidden="true">→</span>
    </Link>
  );
}

export function AtAGlance() {
  const items = [
    { k: "$70K+", v: "Monthly ad spend across portfolios" },
    { k: "10+", v: "Industries served" },
    { k: "Consistent", v: "CPL performance at scale" },
    { k: "Frameworks", v: "Multi-account & clear attribution" },
  ];
  return (
    <section aria-labelledby="at-a-glance" className="mt-10">
      <h2 id="at-a-glance" className="sr-only">At a glance</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.k}
            className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm"
            data-testid={`at-a-glance-${it.k.toLowerCase()}`}
          >
            <div className="text-2xl font-bold text-foreground">{it.k}</div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MidPageCTA() {
  return (
    <section
      aria-labelledby="mid-cta"
      className="my-16 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 shadow-sm"
      data-testid="mid-page-cta"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="mid-cta" className="text-xl font-semibold text-foreground">
          Curious what this could look like for you?
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Book a Strategic Intro Call — we'll review your current setup and outline the quickest wins.
        </p>
        <div className="mt-4">
          <CTAButton>Book a Strategic Intro Call</CTAButton>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  const rows = [
    {
      before: "Fragmented reporting across industries",
      after: "Unified frameworks and portfolio-level reporting",
    },
    {
      before: "Manual, one-off campaign adjustments",
      after: "Templatized + automated optimizations across accounts",
    },
    {
      before: "Inconsistent CPL across verticals",
      after: "Stabilized CPL with industry-specific benchmarks",
    },
    {
      before: "Unclear attribution & budget allocation",
      after: "Precise attribution and scalable budgeting protocols",
    },
  ];
  return (
    <section aria-labelledby="before-after" className="my-12" data-testid="before-after-section">
      <h2 id="before-after" className="text-lg font-semibold text-foreground">
        Before vs After (Agency-Side Portfolio)
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 dark:bg-gray-800">
          <div className="p-3 text-sm font-medium text-gray-700 dark:text-gray-300">Before</div>
          <div className="p-3 text-sm font-medium text-gray-700 dark:text-gray-300 md:border-l md:border-gray-200 dark:md:border-gray-700">
            After
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {rows.map((r, idx) => (
            <li key={idx} className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-4 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">{r.before}</div>
              <div className="p-4 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 md:border-l md:border-gray-100 dark:md:border-gray-800">{r.after}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BottomCTA() {
  return (
    <section
      aria-labelledby="bottom-cta"
      className="my-16 rounded-3xl bg-black dark:bg-gray-950 p-8 text-white"
      data-testid="bottom-cta"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="bottom-cta" className="text-xl font-semibold">
          Ready to see your version of "After"?
        </h2>
        <p className="mt-2 text-gray-200 dark:text-gray-300">
          Let's review your PPC structure and find the next 2–3 efficiency wins across your funnel.
        </p>
        <div className="mt-4">
          <CTAButton>
            Book a Strategic Intro Call
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
