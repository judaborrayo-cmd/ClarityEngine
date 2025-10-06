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
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="text-sm font-semibold mb-1 text-gray-900">
          We're currently full — join the waitlist to get notified when spots open.
        </div>
        <p className="text-xs text-gray-600 mb-4">
          Add your details and we'll email you as soon as we have availability.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
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

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-black text-white hover:opacity-90 disabled:opacity-60"
              data-testid="button-waitlist-submit"
            >
              {submitting ? "Submitting..." : "Join Waitlist"}
            </button>
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              data-testid="button-waitlist-close"
            >
              Not now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
