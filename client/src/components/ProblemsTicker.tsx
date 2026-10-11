import { useEffect, useId, useRef, useState } from "react";

type Cat = "revenue" | "growth" | "conversion";
const data: Record<Cat, string[]> = {
  revenue: ["Wasted ad spend", "Poor attribution", "Platform scattered", "Unclear ROAS", "Budget guesswork"],
  growth: ["Revenue plateaus", "Limited reach", "Creative fatigue", "High CAC", "Scaling bottlenecks"],
  conversion: ["Low conversion rates", "Leaky funnels", "Poor UX", "Slow pages", "Weak offer clarity"],
};
const colors = {
  revenue: { bg: "bg-blue-50", active: "bg-blue-500", text: "text-blue-900", light: "text-blue-700", arrow: "text-blue-300" },
  growth: { bg: "bg-green-50", active: "bg-green-500", text: "text-green-900", light: "text-green-700", arrow: "text-green-300" },
  conversion: { bg: "bg-purple-50", active: "bg-purple-500", text: "text-purple-900", light: "text-purple-700", arrow: "text-purple-300" },
};
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600";

function TickerRow({ cat, paused, second = false }: { cat: Cat; paused: boolean; second?: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLSpanElement>(null);
  const [copies, setCopies] = useState(3);
  const pausedRef = useRef(paused); pausedRef.current = paused;
  useEffect(() => {
    const area = viewport.current!, moving = track.current!, first = group.current!;
    let width = 0, offset = 0, last = 0, frame = 0;
    let drag: { x: number; y: number; offset: number; horizontal: boolean } | null = null;
    const normalize = (n: number) => width ? ((n % width) + width) % width : 0;
    const paint = () => { moving.style.transform = `translate3d(${-offset}px,0,0)`; };
    const measure = () => {
      const measuredBefore = width > 0;
      width = first.getBoundingClientRect().width;
      setCopies(width ? Math.max(3, Math.ceil(area.clientWidth / width) + 2) : 3);
      offset = normalize(measuredBefore ? offset : second ? width * .47 : 0); paint();
    };
    const observer = new ResizeObserver(measure); observer.observe(area); observer.observe(first);
    measure(); void document.fonts.ready.then(() => { if (area.isConnected) measure(); });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animate = (time: number) => {
      const delta = last ? Math.min((time-last)/1000, .1) : 0; last=time;
      if (!pausedRef.current && !drag && !reduced.matches && !document.hidden) { offset=normalize(offset+delta*(second ? -23 : 32)); paint(); }
      frame=requestAnimationFrame(animate);
    };
    frame=requestAnimationFrame(animate);
    const down = (event: PointerEvent) => {
      if (reduced.matches || !width || event.button !== 0) return;
      drag={x:event.clientX,y:event.clientY,offset,horizontal:event.pointerType!=='touch'};
      area.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!drag) return;
      const dx=event.clientX-drag.x, dy=event.clientY-drag.y;
      if (!drag.horizontal) { if (Math.abs(dy)>Math.abs(dx)+5) { drag=null; return; } if (Math.abs(dx)<6) return; drag.horizontal=true; }
      offset=normalize(drag.offset-dx); paint();
    };
    const up = (event: PointerEvent) => { drag=null; last=0; if(area.hasPointerCapture(event.pointerId))area.releasePointerCapture(event.pointerId); };
    area.addEventListener('pointerdown',down); area.addEventListener('pointermove',move); area.addEventListener('pointerup',up); area.addEventListener('pointercancel',up);
    return () => { cancelAnimationFrame(frame);observer.disconnect();area.removeEventListener('pointerdown',down);area.removeEventListener('pointermove',move);area.removeEventListener('pointerup',up);area.removeEventListener('pointercancel',up); };
  }, [cat, second]);
  return <div ref={viewport} className="problems-viewport relative min-w-0 w-full overflow-hidden cursor-grab touch-pan-y active:cursor-grabbing" aria-hidden={second || undefined}>
    <div ref={track} className="problems-track flex whitespace-nowrap text-sm sm:text-[0.95rem] select-none">
      {Array.from({ length: copies }, (_, copy) => <span key={copy} ref={copy===0 ? group : undefined} aria-hidden={copy>0 || second || undefined} className="problems-group inline-flex shrink-0 items-center pr-8">
        {data[cat].map(text => <span key={text} className="inline-flex items-center mx-3"><span className={`font-medium ${colors[cat].text}`}>{text}</span><span aria-hidden="true" className={`mx-3 ${colors[cat].arrow}`}>→</span></span>)}
      </span>)}
    </div>
  </div>;
}

export default function ProblemsTicker() {
  const [cat, setCat] = useState<Cat>("revenue");
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const contentId = useId();
  return <section aria-label="Problems We Eliminate" className="relative isolate border-t border-slate-100/70">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 min-w-0">
      <div className="text-center pt-2 sm:pt-3"><p className="text-sm font-medium text-gray-600 mb-2">We find Solutions to Difficult problems for Growth-Minded Founders and Teams:</p></div>
      <div className="flex flex-col gap-2 pb-2 sm:pb-3">
        <div role="group" aria-label="Problem category" className="inline-flex self-start rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {(["revenue", "growth", "conversion"] as Cat[]).map(key => <button type="button" key={key} onClick={()=>setCat(key)} aria-pressed={cat===key} className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg transition-colors duration-300 ${focus} ${cat===key ? `${colors[key].active} text-white font-semibold shadow-sm` : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>{key[0].toUpperCase()+key.slice(1)}</button>)}
        </div>
        <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-lg p-3 transition-colors duration-300 ${colors[cat].bg}`}>
          <div id={contentId} className="min-w-0 flex-1" data-expanded={expanded}>
            <div className="problems-motion"><TickerRow cat={cat} paused={paused} /><div className="problems-expansion" style={{gridTemplateRows: expanded ? '1fr' : '0fr'}}><div className="min-h-0 overflow-hidden"><div className="pt-3"><TickerRow cat={cat} paused={paused || !expanded} second /></div></div></div></div>
            <ul className="problems-static flex-wrap gap-x-5 gap-y-2 text-sm" aria-label={`${cat} problems`}>{data[cat].map(text=><li key={text} className={`font-medium ${colors[cat].text}`}>{text}</li>)}</ul>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-3 self-end sm:self-center">
            <button type="button" className={`problems-pause text-xs underline underline-offset-4 rounded ${colors[cat].light} ${focus}`} onClick={()=>setPaused(!paused)} aria-label={paused ? 'Resume problems ticker' : 'Pause problems ticker'}>{paused ? 'Resume' : 'Pause'}</button>
            <button type="button" aria-expanded={expanded} aria-controls={contentId} onClick={()=>setExpanded(!expanded)} className={`text-sm font-medium rounded px-1 py-1 ${colors[cat].light} ${focus}`}>{expanded ? 'Ignore problems' : 'We help with…'}</button>
          </div>
        </div>
      </div>
    </div>
    <style>{`.problems-track{will-change:transform}.problems-expansion{display:grid;transition:grid-template-rows 220ms ease}.problems-static{display:none}@media(prefers-reduced-motion:reduce){.problems-motion,.problems-pause{display:none}.problems-static{display:flex}.problems-expansion{transition:none}}`}</style>
  </section>;
}
