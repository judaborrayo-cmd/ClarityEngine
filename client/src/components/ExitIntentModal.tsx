import { useEffect, useState } from "react";

const STORAGE_KEY = "ce_waitlist_modal_suppressed_until";

function sevenDaysFromNow() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString();
}

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    function shouldShow() {
      try {
        const until = localStorage.getItem(STORAGE_KEY);
        if (!until) return true;
        return new Date(until) < new Date();
      } catch {
        return true;
      }
    }

    function handleExit(e: MouseEvent) {
      if (!shouldShow()) return;
      if (e.clientY <= 0 || e.relatedTarget === null) {
        setOpen(true);
      }
    }

    document.addEventListener("mouseout", handleExit);
    return () => document.removeEventListener("mouseout", handleExit);
  }, []);

  function suppressFor7Days() {
    try {
      localStorage.setItem(STORAGE_KEY, sevenDaysFromNow());
    } catch {}
  }

  function close() {
    suppressFor7Days();
    setOpen(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Network error");
      suppressFor7Days();
      setOpen(false);
      alert("Thanks! You'll be notified when a spot opens.");
    } catch {
      alert("Could not submit right now—please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4" data-testid="exit-intent-modal">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="text-base font-semibold mb-2 text-gray-900">
          We're currently almost at capacity — join the waitlist to get notified when spots open.
        </div>

        <form onSubmit={onSubmit} className="space-y-3 mb-5">
          <input
            required
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            data-testid="input-waitlist-name"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            data-testid="input-waitlist-email"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-black text-white hover:opacity-90 disabled:opacity-60"
            data-testid="button-waitlist-submit"
          >
            {submitting ? "Submitting..." : "Apply to Wait List"}
          </button>
        </form>

        <div className="border-t border-gray-200 pt-4 space-y-3">
          <p className="text-sm font-medium text-gray-900 mb-3">Need answers faster?</p>
          
          <a
            href="/checkout/audit"
            onClick={close}
            className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors text-center"
            data-testid="button-quick-audit"
          >
            <div className="font-semibold">Deep Dive Audit</div>
            <div className="text-xs text-gray-600 mt-0.5">Get answers in weeks, not months</div>
          </a>

          <a
            href="#book-call"
            onClick={close}
            className="block w-full rounded-xl px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center"
            data-testid="button-quick-call"
          >
            <div className="font-semibold">Book Strategic Intro Call</div>
            <div className="text-xs opacity-90 mt-0.5">Want answers in days? Start here (20-30 min)</div>
          </a>
        </div>

        <button
          type="button"
          onClick={close}
          className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          data-testid="button-waitlist-close"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
