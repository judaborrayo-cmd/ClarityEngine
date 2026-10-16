import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, BookOpen, ChartNoAxesCombined, ChevronDown, Compass, FileText, Globe, Layers, LayoutTemplate, Menu, MessageCircle, MousePointer2, Newspaper, Repeat2, Search, Video, X } from 'lucide-react';
import ClarityEngineLogo from '@assets/Clarity-Engine-Favicon_1758553782935.png';
import LegacyFlowNavigation from './legacy-flow-navigation';
import { assessmentItem, assessmentPriceLabel, categories, navigationGroups, type NavigationCategory, type NavigationItem } from './navigation-config';
import './site-navigation.css';
function focusDestination() {
    const target = document.getElementById(window.location.hash.slice(1)) || document.querySelector('main h1, h1') || document.querySelector('main');
    if (!(target instanceof HTMLElement))
        return;
    const previous = target.getAttribute('tabindex');
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => { if (previous === null)
        target.removeAttribute('tabindex');
    else
        target.setAttribute('tabindex', previous); }, { once: true });
}
const icons = { compass: Compass, chart: ChartNoAxesCombined, cursor: MousePointer2, layout: LayoutTemplate, plan: FileText, conversation: MessageCircle, search: Search, repeat: Repeat2, book: BookOpen, video: Video, news: Newspaper, layers: Layers, globe: Globe };
function NavigationRow({ item, onNavigate }: {
    item: NavigationItem;
    onNavigate: () => void;
}) {
    const Icon = icons[item.icon];
    return <li>
<Link to={item.to} onClick={onNavigate} className={`ce-nav-row ce-tone-${item.icon}`} data-destination-status={item.destinationStatus}>
    <span className="ce-nav-icon">
<Icon size={20} strokeWidth={1.7} aria-hidden="true"/>
</span>
    <span className="ce-nav-copy">
<span className="ce-nav-label">{item.label}{item.availability === 'coming-soon' && <span className="ce-nav-badge">Coming soon</span>}{item.availability === 'launch-pending' && <span className="ce-nav-badge">Launch pending</span>}</span>
<span className="ce-nav-description">{item.description}</span>
</span>
  </Link>
</li>;
}
function MenuContent({ category, onNavigate }: {
    category: NavigationCategory;
    onNavigate: () => void;
}) {
    return <>
<div className={`ce-nav-groups ce-nav-groups-${category}`}>
   {navigationGroups[category].map(group => <section key={group.title}>
<h2 className="ce-nav-group-title">{group.title}</h2>
<ul>{group.items.map(item => <NavigationRow key={item.id} item={item} onNavigate={onNavigate}/>)}</ul>
</section>)}
   {category === 'solutions' && <aside className="ce-nav-feature">
<span className="ce-nav-feature-mark">
<Compass size={32} strokeWidth={1.4} aria-hidden="true"/>
</span>
<p className="ce-nav-eyebrow">Not sure where to start?</p>
<h2>{assessmentItem.label}</h2>
<p>Review six areas of your marketing and identify your next priorities.</p>
<p className="ce-nav-feature-meta">Self-guided assessment · {assessmentPriceLabel}</p>
<span className="ce-nav-badge">Launch pending</span>
<Link to={assessmentItem.to} onClick={onNavigate}>Explore the Assessment <ArrowUpRight size={16} aria-hidden="true"/>
</Link>
</aside>}
 </div>{category === 'solutions' && <div className="ce-nav-footer">
<Link to="/ways-to-work-together" onClick={onNavigate}>Compare ways to work together <span aria-hidden="true">→</span>
</Link>
<Link to="/services" onClick={onNavigate}>Explore all services</Link>
<Link to="/#how-we-scale" onClick={onNavigate}>How We Scale</Link>
</div>}</>;
}
export default function SiteNavigation() {
    const location = useLocation();
    // Preserve the existing header byte-for-byte in focused flows; no new catalog there.
    return /^\/(checkout|audit)(\/|$)/.test(location.pathname) ? <LegacyFlowNavigation /> : <MarketingNavigation />;
}
function MarketingNavigation() {
    const location = useLocation(), id = useId();
    const [open, setOpen] = useState<NavigationCategory | null>(null), [mobile, setMobile] = useState(false);
    const [accordion, setAccordion] = useState<NavigationCategory | null>(null);
    const nav = useRef<HTMLElement>(null), triggers = useRef<Partial<Record<NavigationCategory, HTMLButtonElement | null>>>({});
    const routeSelected = useRef(false), popupTookFocus = useRef(false);
    const mobileButton = useRef<HTMLButtonElement>(null);
    const resizeFocus = useRef<HTMLElement | null>(null);
    const close = () => { setOpen(null); routeSelected.current = true; setMobile(false); };
    useEffect(() => { setOpen(null); setMobile(false); setAccordion(null); }, [location.key]);
    useEffect(() => { if (!location.hash || location.pathname === '/')
        return; const frame = requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' })); return () => cancelAnimationFrame(frame); }, [location.key, location.hash, location.pathname]);
    useEffect(() => { const query = window.matchMedia('(min-width: 900px)'); const changed = () => {
        const active = document.activeElement;
        const insideNavigation = active instanceof HTMLElement && (nav.current?.contains(active) || active.closest('.ce-nav-mobile-panel'));
        resizeFocus.current = insideNavigation ? (query.matches ? triggers.current.solutions ?? null : mobileButton.current) : null;
        setOpen(null); setMobile(false); setAccordion(null);
        if (resizeFocus.current) requestAnimationFrame(() => resizeFocus.current?.focus({preventScroll:true}));
    }; query.addEventListener('change', changed); return () => query.removeEventListener('change', changed); }, []);
    useEffect(() => { if (!mobile && !open)
        return; const yieldToPopup = () => { const popup = document.querySelector('[data-testid="exit-intent-modal"]'); if (popup instanceof HTMLElement) {
        popupTookFocus.current = true;
        setMobile(false);
        setOpen(null);
        requestAnimationFrame(() => popup.querySelector<HTMLElement>('input,button,a')?.focus());
    } }; const observer = new MutationObserver(yieldToPopup); observer.observe(document.body, { childList: true, subtree: true }); yieldToPopup(); return () => observer.disconnect(); }, [mobile, open]);
    useEffect(() => { if (!open)
        return; const outside = (e: PointerEvent) => { if (!nav.current?.contains(e.target as Node))
        setOpen(null); }; document.addEventListener('pointerdown', outside); return () => document.removeEventListener('pointerdown', outside); }, [open]);
    return <nav ref={nav} aria-label="Main navigation" className="ce-navigation" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node))
        setOpen(null); }} onKeyDown={e => { if (e.key === 'Escape' && open) {
        e.preventDefault();
        triggers.current[open]?.focus();
        setOpen(null);
    } }}>
   <div className="ce-nav-bar">
<Link to="/" className="ce-nav-brand" aria-label="Clarity Engine home" onClick={close}>
<img src={ClarityEngineLogo} alt="" width="32" height="32"/>
<span>Clarity Engine</span>
</Link>
   <div className="ce-nav-desktop">
<ul className="ce-nav-toplinks">{categories.slice(0, 2).map(c => <li key={c.id}>
<button ref={el => { triggers.current[c.id] = el; }} aria-expanded={open === c.id} aria-controls={`${id}-${c.id}`} onClick={() => setOpen(open === c.id ? null : c.id)}>{c.label}<ChevronDown size={14} aria-hidden="true"/>
</button>
</li>)}<li>
<Link to="/case-studies" onClick={close}>Case Studies</Link>
</li>
<li>
<button ref={el => { triggers.current.resources = el; }} aria-expanded={open === 'resources'} aria-controls={`${id}-resources`} onClick={() => setOpen(open === 'resources' ? null : 'resources')}>Resources<ChevronDown size={14} aria-hidden="true"/>
</button>
</li>
<li>
<Link to="/about" onClick={close}>About</Link>
</li>
</ul>
</div>
   <Link to="/ways-to-work-together" className="ce-nav-primary ce-nav-header-cta" onClick={close}>
<span className="ce-nav-desktop-label">Find Your Next Step</span>
<span className="ce-nav-mobile-label">Start Here</span>
<ArrowUpRight size={16} aria-hidden="true"/>
</Link>
   <Dialog.Root open={mobile} onOpenChange={value => { routeSelected.current = false; popupTookFocus.current = false; resizeFocus.current = null; setMobile(value); setOpen(null); }}>
<Dialog.Trigger asChild>
<button ref={mobileButton} className="ce-nav-mobile-toggle" aria-label="Open navigation">
<Menu size={23} aria-hidden="true"/>
</button>
</Dialog.Trigger>
<Dialog.Portal>
<Dialog.Overlay className="ce-nav-overlay"/>
<Dialog.Content className="ce-nav-mobile-panel" aria-describedby={undefined} onCloseAutoFocus={e => { if (routeSelected.current || popupTookFocus.current || resizeFocus.current)
        e.preventDefault(); if (resizeFocus.current) requestAnimationFrame(() => resizeFocus.current?.focus({preventScroll:true})); if (routeSelected.current)
        requestAnimationFrame(focusDestination); if (popupTookFocus.current)
        requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-testid="exit-intent-modal"] input, [data-testid="exit-intent-modal"] button, [data-testid="exit-intent-modal"] a')?.focus()); }}>
<div className="ce-nav-mobile-heading">
<Dialog.Title>Navigation</Dialog.Title>
<Dialog.Close className="ce-nav-mobile-toggle" aria-label="Close navigation">
<X size={24} aria-hidden="true"/>
</Dialog.Close>
</div>
<div className="ce-nav-mobile-scroll">
<ul className="ce-nav-mobile-list">{categories.slice(0, 2).map(c => <li key={c.id}>
<button aria-expanded={accordion === c.id} aria-controls={`${id}-mobile-${c.id}`} onClick={() => setAccordion(accordion === c.id ? null : c.id)}>{c.label}<ChevronDown size={19} aria-hidden="true"/>
</button>
<div id={`${id}-mobile-${c.id}`} hidden={accordion !== c.id}>
<MenuContent category={c.id} onNavigate={close}/>
</div>
</li>)}<li>
<Link to="/case-studies" onClick={close}>Case Studies</Link>
</li>
<li>
<button aria-expanded={accordion === 'resources'} aria-controls={`${id}-mobile-resources`} onClick={() => setAccordion(accordion === 'resources' ? null : 'resources')}>Resources<ChevronDown size={19} aria-hidden="true"/>
</button>
<div id={`${id}-mobile-resources`} hidden={accordion !== 'resources'}>
<MenuContent category="resources" onNavigate={close}/>
</div>
</li>
<li>
<Link to="/about" onClick={close}>About</Link>
</li>
</ul>
<Link to="/ways-to-work-together" className="ce-nav-primary ce-nav-mobile-cta" onClick={close}>Find Your Next Step <ArrowUpRight size={18} aria-hidden="true"/>
</Link>
</div>
</Dialog.Content>
</Dialog.Portal>
</Dialog.Root>
   </div>
   <div className="ce-nav-desktop">{categories.map(c => <div key={c.id} id={`${id}-${c.id}`} hidden={open !== c.id} className={`ce-nav-dropdown ce-nav-dropdown-${c.id}`}>
<MenuContent category={c.id} onNavigate={close}/>
</div>)}</div>
 </nav>;
}
