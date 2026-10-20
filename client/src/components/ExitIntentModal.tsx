import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import assessment from "@shared/marketing-clarity-audit/report-content.json";

const STORAGE_KEY = "ce_waitlist_modal_suppressed_until";

export default function ExitIntentModal() {
  const [open, setOpen] = useState(() => import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "assessment-popup");
  const [reduceMotion, setReduceMotion] = useState(true);
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const primaryLink = useRef<HTMLAnchorElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const eligibleAfter = Date.now() + 25_000;
    let shown = false;
    function handleExit(event: MouseEvent) {
      if (shown || Date.now() < eligibleAfter || event.relatedTarget !== null || event.clientY > 0) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      if (document.querySelector('[role="dialog"][data-state="open"], [aria-modal="true"]')) return;
      try {
        const until = localStorage.getItem(STORAGE_KEY);
        if (until && Date.parse(until) > Date.now()) return;
      } catch { /* Still allow dismissal when storage is unavailable. */ }
      shown = true;
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
    }
    document.addEventListener("mouseout", handleExit);
    return () => document.removeEventListener("mouseout", handleExit);
  }, []);

  useEffect(() => {
    if (!open) return;
    const media = video.current;
    if (!media) return;
    if (reduceMotion) media.pause();
    else media.play().catch(() => setPlaying(false));
    return () => media.pause();
  }, [open, reduceMotion]);

  function close() {
    try {
      localStorage.setItem(STORAGE_KEY, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());
    } catch { /* Dismissal must work even when storage is unavailable. */ }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => { if (!next) close(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[998] bg-slate-950/60 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[999] w-[calc(100%-2rem)] max-w-3xl max-h-[calc(100dvh-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white shadow-2xl outline-none"
          data-testid="exit-intent-modal"
          onOpenAutoFocus={(event) => { event.preventDefault(); primaryLink.current?.focus(); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); previousFocus.current?.focus(); }}
        >
          <div className="grid md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative h-36 md:h-auto md:min-h-[420px] bg-purple-100 overflow-hidden md:rounded-l-3xl">
              <video ref={video} src="/videos/clarity-popup-smoke.mp4" poster="/videos/clarity-popup-smoke-poster.png" muted playsInline loop preload="metadata" className="h-full w-full object-cover" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
              <button type="button" className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-2 text-xs font-medium text-purple-950 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-700" onClick={() => { const media = video.current; if (!media) return; if (media.paused) media.play().catch(() => setPlaying(false)); else media.pause(); }} aria-label={playing ? "Pause smoke animation" : "Play smoke animation"}>{playing ? "Pause animation" : "Play animation"}</button>
            </div>
            <div className="p-6 sm:p-9 md:py-12">
              <p className="text-xs uppercase tracking-[0.16em] text-purple-700 font-semibold mb-4">Your next move, clearer.</p>
              <Dialog.Title className="text-3xl font-bold tracking-tight text-gray-950 mb-4">Where does your marketing need attention?</Dialog.Title>
              <Dialog.Description className="text-base text-gray-600 leading-relaxed mb-5">Step back from the daily decisions. The Get Clarity Assessment helps you examine six essential marketing areas and identify where to focus next.</Dialog.Description>
              <p className="text-sm text-gray-700 mb-6">35 questions. A personalized report. Practical next moves when your answers reveal a clear constraint.</p>
              <Link ref={primaryLink} to="/marketing-clarity-assesment" onClick={close} className="flex justify-center rounded-xl bg-purple-700 hover:bg-purple-800 px-4 py-3 text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700" data-testid="button-popup-assessment">Explore the assessment →</Link>
              <p className="text-center text-xs text-gray-500 mt-3">${assessment.product.priceCents / 100} one-time · based on your answers</p>
              <button type="button" onClick={close} className="block mx-auto mt-5 text-sm text-gray-600 underline underline-offset-4">Keep exploring</button>
            </div>
          </div>
          <Dialog.Close className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-900 shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-700" aria-label="Close assessment invitation"><X className="w-5 h-5" /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
