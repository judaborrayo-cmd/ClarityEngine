import { Link } from "wouter";
import profitableAdvertisingImage from "@assets/Profitable-Advertising-Image_1761579620763.png";

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
        "inline-flex items-center justify-center",
        "text-[15px] font-semibold rounded-2xl px-5 py-3",
        "shadow-sm ring-1 ring-black/10 hover:shadow-lg",
        "transition hover:-translate-y-[1px]",
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
    { k: "$25k-$70K+", v: "Monthly ad spend across portfolios" },
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

export function MidPageCTA({
  title = "Curious what this could look like for you?",
  body = "Book a Strategic Intro Call — we'll review your current setup and outline the quickest wins.",
}: {
  title?: string;
  body?: string;
} = {}) {
  return (
    <section
      aria-labelledby="mid-cta"
      className="my-16 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 shadow-sm"
      data-testid="mid-page-cta"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="mid-cta" className="text-xl font-semibold text-foreground">
          {title}
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {body}
        </p>
        <div className="mt-4">
          <CTAButton>Book a Strategic Intro Call</CTAButton>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter({
  rows,
  title = "Before vs After (Agency-Side Portfolio)",
}: {
  rows?: { before: string; after: string }[];
  title?: string;
} = {}) {
  const defaultRows = [
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
  const displayRows = rows || defaultRows;
  
  return (
    <section aria-labelledby="before-after" className="my-12" data-testid="before-after-section">
      <h2 id="before-after" className="text-lg font-semibold text-foreground">
        {title}
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 dark:bg-gray-800">
          <div className="p-3 text-sm font-medium text-gray-700 dark:text-gray-300">Before</div>
          <div className="p-3 text-sm font-medium text-gray-700 dark:text-gray-300 md:border-l md:border-gray-200 dark:md:border-gray-700">
            After
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {displayRows.map((r, idx) => (
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

export function StatStrip({
  items,
}: {
  items: { k: string; v: string }[];
}) {
  return (
    <section aria-labelledby="stat-strip" className="mt-10">
      <h2 id="stat-strip" className="sr-only">At a glance</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.k}
            className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm"
            data-testid={`stat-${it.k.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="text-2xl font-bold text-foreground">{it.k}</div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialIntro() {
  return (
    <p className="mx-auto max-w-3xl text-center text-gray-700 dark:text-gray-300 mb-4">
      These scalable systems were first proven in a multi-industry agency environment
      and continue to guide how Clarity Engine operates today.
    </p>
  );
}

export function TestimonialIntroLine() {
  return (
    <p className="mx-auto max-w-3xl text-center text-gray-700 dark:text-gray-300 mb-4">
      This systemized approach was validated on Hapi Art and continues to guide
      Clarity Engine's e-commerce playbook today.
    </p>
  );
}

export function BottomCTA({
  title = "Ready to apply proven multi-industry systems to your growth?",
  body = "Let's review your PPC structure and identify the next 2–3 efficiency wins across your funnel.",
}: {
  title?: string;
  body?: string;
} = {}) {
  return (
    <section
      aria-labelledby="bottom-cta"
      className="my-16 rounded-3xl bg-black dark:bg-gray-950 p-8 text-white"
      data-testid="bottom-cta"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="bottom-cta" className="text-xl font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-gray-200 dark:text-gray-300">
          {body}
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

export function ProfitableAdvertisingCard() {
  return (
    <section className="my-10">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <figure className="p-4">
          <img
            src={profitableAdvertisingImage}
            alt="Meta Ads performance table and summary for Hapi Art"
            loading="lazy"
            className="w-full h-auto rounded-xl"
            data-testid="profitable-advertising-image"
          />
          <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Profitable Advertising (Meta)
            </span>
            {" — "}
            Cold Prospecting ROAS 16× · Retargeting ROAS 6.9× · Top-creative CTR 5–6%.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function VerifiedMetrics() {
  const items = [
    { k: "10× ROAS", v: "Overall efficiency across the program" },
    { k: "16× ROAS", v: "Cold prospecting on Meta" },
    { k: "6.9× ROAS", v: "Retargeting on Meta" },
    { k: "5–6% CTR", v: "Consistently on top creatives" },
  ];
  return (
    <section className="my-12" data-testid="verified-metrics">
      <h2 className="text-lg font-semibold text-foreground">Verified Performance Metrics (Meta)</h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <li
            key={it.k}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm"
            data-testid={`verified-metric-${it.k.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="text-base font-semibold text-foreground">{it.k}</div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{it.v}</div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Based on platform reporting; no revenue figures are displayed here.
      </p>
    </section>
  );
}

export function LisaNicholsTestimonialIntroLine() {
  return (
    <p className="mx-auto max-w-3xl text-center text-gray-700 dark:text-gray-300 mb-4">
      These learnings now guide how Clarity Engine helps personal brands and thought leaders grow their reach efficiently.
    </p>
  );
}
