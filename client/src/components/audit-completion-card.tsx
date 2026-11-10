import React from "react";
import { Button } from "@/components/ui/button";
export function AuditCompletionCard({
  titleRef,
  companyName,
  isRetake,
  busy,
  complete,
  back,
  completionLabel,
}: {
  titleRef: React.RefObject<HTMLHeadingElement>;
  companyName?: string;
  isRetake: boolean;
  busy: boolean;
  complete: () => void;
  back: () => void;
  completionLabel: string;
}) {
  return (
    <section className="assessment-ready relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-6 shadow-sm sm:p-10">
      <div
        aria-hidden="true"
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-violet-100"
      >
        <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
          <path
            d="M5 40L24 7L43 40H5Z"
            stroke="#6d4ce8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M16 40L29 21L24 7"
            stroke="#16734b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M20 15L24 20L28 15" stroke="#6d4ce8" strokeWidth="2" />
        </svg>
      </div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-800">
        Six growth levers explored · {completionLabel}
      </p>
      <h2
        ref={titleRef}
        tabIndex={-1}
        className="max-w-xl text-3xl font-bold leading-tight outline-none sm:text-4xl"
      >
        Your Clarity Stack is complete. Let's turn it into a plan.
      </h2>
      <p className="mt-5 leading-relaxed text-muted-foreground">
        You've just looked at six of the most important drivers of marketing
        growth. Now comes the interesting part: connecting the dots.
      </p>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Let's see what's working in your favor, where your biggest opportunities
        may be hiding, and which three moves deserve your attention first.
      </p>
      <p className="break-words text-sm text-muted-foreground">
        Prepared specifically for {companyName || "your business"}
      </p>
      <div className="assessment-ready-review my-6 rounded-xl border border-violet-100 bg-white/80 p-4">
        <h3 className="font-semibold">Review before generating your report</h3>
        <p className="mt-2 text-sm leading-relaxed">
          {isRetake
            ? "You can still edit any answer before continuing. This is your included retake. Generating your report freezes Report 2; your original report will remain available."
            : "You can still edit any answer before continuing. Your purchase also includes one complete retake in case you want to reassess your business after reviewing your first results."}
        </p>
      </div>
      <ol
        aria-label="Your Clarity Stack"
        className="clarity-stack mb-6 flex flex-col gap-3"
      >
        {[
          [
            "Your First Growth Opportunity",
            "Where to focus first, based on the patterns across your answers.",
            "#5541BF",
            "#F7F4FF",
          ],
          [
            "Your First 3 Moves",
            "Three practical actions, why they matter, and how to know when each is done.",
            "#145C43",
            "#F2FAF5",
          ],
          [
            "Your Marketing Clarity Snapshot",
            "How the six levers compare, including strengths you can build on.",
            "#14636B",
            "#F1F9FA",
          ],
          [
            "Your 30-Day Clarity Plan",
            "A weekly sequence for turning your first opportunity into progress.",
            "#5541BF",
            "#F7F4FF",
          ],
        ].map(([title, description, color, tint], index) => (
          <li
            key={title}
            className="flex w-full items-start gap-4 rounded-xl border border-white p-5 shadow-sm sm:items-center sm:p-6"
            style={{
              backgroundColor: tint,
              borderLeft: `4px solid ${color}`,
              boxShadow:
                "0 3px 0 rgba(37, 28, 69, 0.05), 0 8px 20px rgba(37, 28, 69, 0.025)",
            }}
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-white text-sm font-semibold tracking-wide"
              style={{ color, borderColor: `${color}30` }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold leading-snug text-gray-900">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="assessment-ready-actions flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          className="h-auto min-h-12 whitespace-normal px-5 py-3"
          disabled={busy}
          onClick={complete}
        >
          {busy
            ? "Generating your report…"
            : "Generate My High Growth Opportunities Report"}
        </Button>
        <Button variant="ghost" disabled={busy} onClick={back}>
          Back
        </Button>
      </div>
    </section>
  );
}
