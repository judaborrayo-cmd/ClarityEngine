import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ClarityEngineLogo from "@assets/Clarity-Engine-Favicon_1758553782935.png";

const desktopLinks = [
  { to: "/#services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/#how-we-scale", label: "How We Scale" },
  { to: "/about", label: "About" },
  { to: "/marketing-clarity-assesment", label: "Clarity Assessment" },
  { to: "/strategy-sprint", label: "Strategy Sprints" },
];
const offerLinks = [
  { to: "/marketing-clarity-assesment", label: "Clarity Assessment", description: "Find where to focus next." },
  { to: "/strategy-sprint", label: "Strategy Sprint", description: "Work through priorities directly with Juda." },
  { to: "/growth-clarity-audit", label: "Deep Dive Growth Audit", description: "Evidence-led investigation and a 90-day roadmap. $3,725 one-time." },
  { to: "/#book-intro", label: "Strategic Intro Call", description: "Discuss your goals and potential fit." },
  { to: "/services", label: "Growth Retainer", description: "Explore ongoing strategy and execution support." },
];
const groups = [
  { title: "Find your next step", links: [{ to: "/services", label: "Work Together" }, ...offerLinks] },
  { title: "Explore Clarity Engine", links: desktopLinks.slice(0, 4) },
];
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600";

export default function SiteNavigation() {
  const location = useLocation();
  const [open, setOpen] = useState<"menu" | "offers" | null>(null);
  const id = useId();
  const menuId = `${id}-menu`;
  const offersId = `${id}-offers`;
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const offersPanel = useRef<HTMLDivElement>(null);
  const offersButton = useRef<HTMLButtonElement>(null);
  const pathname = location.pathname.replace(/\/$/, "") || "/";

  useEffect(() => { setOpen(null); }, [location.key]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const sync = (event: MediaQueryListEvent) => { if (event.matches) setOpen(null); };
    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!open) return;
    (open === "menu" ? panel : offersPanel).current?.scrollTo(0, 0);
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(null);
      (open === "offers" ? offersButton : menuButton).current?.focus();
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);

  const closeAfterSelection = () => { setOpen(null); (open === "offers" ? offersButton : menuButton).current?.focus(); };
  const active = (to: string) => {
    if (to.includes("#")) return (pathname === "/" && location.hash === to.slice(1)) || (to === "/#services" && pathname === "/services");
    return pathname === to || (to === "/case-studies" && pathname.startsWith("/case-study/"));
  };

  return <nav aria-label="Main navigation" className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
    {/* Preserve the existing desktop navigation and dimensions. */}
    <div className="hidden lg:block mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img src={ClarityEngineLogo} alt="Clarity Engine Logo" className="h-7 w-auto shrink-0 object-contain sm:h-8" />
          <Link to="/" className="whitespace-nowrap text-base font-bold leading-none text-foreground transition-colors hover:text-primary sm:text-xl">Clarity Engine</Link>
        </div>
        <div className="hidden items-center gap-2 text-xs lg:flex xl:gap-4 xl:text-sm">
          {desktopLinks.map(link => <Link key={link.to} to={link.to} className="whitespace-nowrap text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>)}
          <Link to="/services" className="whitespace-nowrap bg-primary text-primary-foreground px-4 py-2 rounded-2xl font-semibold hover:bg-primary/90 transition-colors">Work Together</Link>
        </div>
      </div>
    </div>

    <div className="lg:hidden mx-auto max-w-6xl flex h-14 items-center justify-between gap-2 px-4 sm:px-6">
      <Link to="/" aria-label="Clarity Engine home" onClick={() => setOpen(null)} className={`flex min-h-11 min-w-11 shrink-0 items-center gap-2 rounded-lg text-base font-bold text-foreground min-[480px]:gap-3 ${focus}`}>
        <img src={ClarityEngineLogo} alt="" width="28" height="28" className="h-7 w-7 shrink-0 object-contain" />
        <span className="hidden min-[360px]:inline min-[430px]:hidden whitespace-nowrap">Clarity</span>
        <span className="hidden min-[430px]:inline whitespace-nowrap">Clarity Engine</span>
      </Link>
      <div className="flex shrink-0 items-center gap-2">
        <Link to="/services" onClick={() => setOpen(null)} className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 motion-safe:transition-colors ${focus}`}>Work Together</Link>
        <button ref={menuButton} type="button" aria-expanded={open === "menu"} aria-controls={menuId} onClick={() => setOpen(open === "menu" ? null : "menu")} className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 text-sm font-semibold text-foreground hover:bg-emerald-50 motion-safe:transition-colors ${focus}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">{open === "menu" ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</svg>
          {open === "menu" ? "Close" : "Menu"}
        </button>
      </div>
    </div>

    <div className="lg:hidden mx-auto max-w-6xl grid grid-cols-[.8fr_1fr_1.4fr] gap-1 border-t border-border/50 px-3 sm:px-6">
      {desktopLinks.slice(0, 2).map(link => <Link key={link.to} to={link.to} onClick={() => setOpen(null)} aria-current={active(link.to) ? "page" : undefined} className={`flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-1 text-sm font-medium ${focus} ${active(link.to) ? "text-emerald-800 bg-emerald-50" : "text-foreground hover:bg-emerald-50"}`}>{link.label}</Link>)}
      <button ref={offersButton} type="button" aria-expanded={open === "offers"} aria-controls={offersId} onClick={() => setOpen(open === "offers" ? null : "offers")} className={`flex min-h-11 items-center justify-center gap-1 whitespace-nowrap rounded-lg px-1 text-sm font-medium text-foreground hover:bg-emerald-50 ${focus}`}>
        Explore Offers <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`shrink-0 motion-safe:transition-transform ${open === "offers" ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
      </button>
    </div>

    {/* Overlaid panels leave the measured header height stable for anchor offsets. */}
    <div id={menuId} ref={panel} hidden={open !== "menu"} className="absolute left-0 right-0 top-full lg:hidden overflow-y-auto overscroll-contain border-b border-emerald-100 bg-[#f4faf7] shadow-lg" style={{ maxHeight: "calc(100dvh - 102px)" }}>
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 space-y-3">
        {groups.map((group, index) => <div key={group.title} role="group" aria-labelledby={`${menuId}-${index}`}>
          <h2 id={`${menuId}-${index}`} className="px-3 pb-1 text-xs font-semibold tracking-wide text-emerald-800">{group.title}</h2>
          <div className="space-y-1">
            {group.links.map(link => <Link key={link.to} to={link.to} onClick={closeAfterSelection} aria-current={active(link.to) ? "page" : undefined} className={`flex min-h-11 w-full items-center rounded-xl px-3 py-2 text-base font-medium ${focus} ${active(link.to) ? "bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-200" : "text-foreground hover:bg-white/80"}`}>{link.label}</Link>)}
          </div>
        </div>)}
      </div>
    </div>
    <div id={offersId} ref={offersPanel} hidden={open !== "offers"} className="absolute left-0 right-0 top-full lg:hidden overflow-y-auto overscroll-contain border-b border-emerald-100 bg-[#f4faf7] shadow-lg" style={{ maxHeight: "calc(100dvh - 102px)" }}>
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3 pb-2 px-3">
          <h2 className="text-sm font-semibold text-emerald-800">Explore Offers</h2>
          <button type="button" onClick={closeAfterSelection} className={`min-h-11 rounded-lg px-2 text-sm font-medium text-foreground hover:bg-white ${focus}`}>Close offers <span aria-hidden="true">×</span></button>
        </div>
        <div className="space-y-1">
          {offerLinks.map(link => <Link key={link.to} to={link.to} onClick={closeAfterSelection} aria-current={active(link.to) ? "page" : undefined} className={`flex min-h-16 w-full flex-col justify-center rounded-xl px-3 py-2 ${focus} ${active(link.to) ? "bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-200" : "text-foreground hover:bg-white/80"}`}>
            <span className="text-base font-medium">{link.label}</span>
            <span className="mt-0.5 text-sm leading-snug text-slate-600">{link.description}</span>
          </Link>)}
        </div>
      </div>
    </div>
  </nav>;
}
