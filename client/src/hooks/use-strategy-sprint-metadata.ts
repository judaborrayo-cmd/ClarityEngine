import { useLayoutEffect } from 'react';
import { getPageMetadata, metadataTags } from '@shared/page-metadata';
export function useStrategySprintMetadata(pathname:string) {
 useLayoutEffect(()=>{
  const m=getPageMetadata(pathname);
  document.title=m.title;
  document.head.querySelectorAll('meta').forEach(el=>{const key=el.getAttribute('name')??el.getAttribute('property')??'';if(key==='description'||key==='robots'||key.startsWith('og:')||key.startsWith('twitter:'))el.remove();});
  for(const [key,value] of Object.entries(metadataTags(m))){const el=document.createElement('meta');el.setAttribute(key.startsWith('og:')?'property':'name',key);el.content=value;document.head.appendChild(el);}
  document.head.querySelectorAll('link[rel="canonical"]').forEach(el=>el.remove());
  if(m.canonical){const el=document.createElement('link');el.rel='canonical';el.href=m.canonical;document.head.appendChild(el);}
  document.head.querySelector('meta[name="referrer"]')?.remove();
  if(pathname.startsWith('/audit/')){const el=document.createElement('meta');el.name='referrer';el.content='no-referrer';document.head.appendChild(el);}
 },[pathname]);
}
