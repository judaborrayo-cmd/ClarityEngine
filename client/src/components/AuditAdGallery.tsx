import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Volume2, VolumeX, Maximize2 } from 'lucide-react';
const ads = [
 {title:'Find room to rest',sound:false},
 {title:'A place to pause',sound:false},
 {title:'Let the day get quieter',sound:false},
 {title:'Care. Nourishment. Room to exhale.',sound:true},
];
export default function AuditAdGallery(){
 const [selected,setSelected]=useState<number|null>(null);const [muted,setMuted]=useState(true);const video=useRef<HTMLVideoElement>(null);const timer=useRef<ReturnType<typeof setTimeout>>();const trigger=useRef<HTMLButtonElement|null>(null);const hoverBlockedUntil=useRef(0);
 const clear=()=>{clearTimeout(timer.current);};
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{if(selected!==null&&!matchMedia('(prefers-reduced-motion: reduce)').matches)video.current?.play().catch(()=>{});},[selected]);
 const open=(i:number,el:HTMLButtonElement)=>{clear();trigger.current=el;setMuted(true);setSelected(i);};
 return <Dialog.Root open={selected!==null} onOpenChange={value=>{if(!value){clear();hoverBlockedUntil.current=Date.now()+1500;video.current?.pause();setSelected(null);setMuted(true);}}}>
 <div className="audit-ad-gallery"><p>Art of Living Retreat Center <span>Animated ad concepts</span></p><div className="audit-ad-grid">{ads.map((ad,i)=><button key={ad.title} type="button" aria-label={`Preview ${ad.title} ad`} onClick={e=>open(i,e.currentTarget)} onMouseEnter={e=>{if(Date.now()>hoverBlockedUntil.current&&matchMedia('(hover: hover)').matches){const el=e.currentTarget;timer.current=setTimeout(()=>open(i,el),650);}}} onMouseLeave={clear} onBlur={clear}><img src={`/videos/audit-ads/aol-${i+1}.webp`} alt={ad.title} width="360" height="450" loading="lazy"/><span><Maximize2 size={13} aria-hidden="true"/>View ad</span></button>)}</div><small>Hover or select an ad to watch a larger preview.</small></div>
 <Dialog.Portal><Dialog.Overlay className="audit-ad-overlay"/><Dialog.Content className="audit-ad-dialog" aria-describedby="audit-ad-description" onCloseAutoFocus={e=>{e.preventDefault();trigger.current?.focus();}}>
 {selected!==null&&<><div className="audit-ad-heading"><div><Dialog.Title>{ads[selected].title}</Dialog.Title><Dialog.Description id="audit-ad-description">Art of Living Retreat Center · Animated ad concept</Dialog.Description></div><Dialog.Close aria-label="Close ad preview"><X size={22}/></Dialog.Close></div><video ref={video} src={`/videos/audit-ads/aol-${selected+1}.mp4`} poster={`/videos/audit-ads/aol-${selected+1}.webp`} controls muted={muted} playsInline preload="metadata"/><div className="audit-ad-sound">{ads[selected].sound?<button type="button" onClick={()=>setMuted(v=>!v)}>{muted?<Volume2 size={16}/>:<VolumeX size={16}/>} {muted?'Turn on sound':'Mute sound'}</button>:<span>This ad has no audio.</span>}</div></>}
 </Dialog.Content></Dialog.Portal></Dialog.Root>;
}
