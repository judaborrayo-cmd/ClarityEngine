import { inquiryAttributionFields } from '@/lib/campaign-attribution';
import { useEffect, useRef, useState } from 'react';
import { inquiryFormId, rememberInquiry } from '@/lib/inquiry';
export default function InquiryForm() {
 const mount=useRef<HTMLDivElement>(null);
 const [loading,setLoading]=useState(true);
 useEffect(()=>{
  type Form = {getFormFieldValues:()=>Promise<{name:string;value:unknown}[]>;setFieldValue:(name:string,value:string)=>void;getConversionId:()=>string};
  let form: Form | undefined;
  const populate=async()=>{
   if (!form) return;
   const current=form;
   try {
    const names=new Set((await current.getFormFieldValues()).map(field=>field.name));
    for (const [key,value] of Object.entries(inquiryAttributionFields())) if (names.has('0-1/'+key)) current.setFieldValue('0-1/'+key,value);
   } catch { /* Attribution must never block an inquiry. */ }
  };
  const ready=(event:Event)=>{
   if ((event as CustomEvent).detail?.formId!==inquiryFormId) return;
   setLoading(false);
   form=(window as Window & {HubSpotFormsV4?:{getFormFromEvent:(e:Event)=>Form}}).HubSpotFormsV4?.getFormFromEvent(event);
   void populate();
  };
  const success=(event:Event)=>{
   if ((event as CustomEvent).detail?.formId!==inquiryFormId) return;
   const forms=(window as Window & {HubSpotFormsV4?:{getFormFromEvent:(e:Event)=>{getConversionId:()=>string}}}).HubSpotFormsV4;
   const id=forms?.getFormFromEvent(event).getConversionId();
   if(id) rememberInquiry(id);
   // HubSpot performs the configured redirect after emitting success.
  };
  window.addEventListener('ce-consent-change',populate);
  window.addEventListener('ce-advertising-consent-change',populate);
  window.addEventListener('hs-form-event:on-ready',ready);
  window.addEventListener('hs-form-event:on-submission:success',success);
  const script=document.createElement('script'); script.src='https://js-na2.hsforms.net/forms/embed/247862766.js'; script.defer=true;
  script.onerror=()=>setLoading(false); mount.current?.appendChild(script);
  return ()=>{window.removeEventListener('ce-consent-change',populate);window.removeEventListener('ce-advertising-consent-change',populate);window.removeEventListener('hs-form-event:on-ready',ready);window.removeEventListener('hs-form-event:on-submission:success',success);script.remove();};
 },[]);
 return <section id="inquiry" aria-labelledby="inquiry-heading" className="founder-wrap founder-section scroll-mt-28">
  <h2 id="inquiry-heading">Have a question about <em>working together?</em></h2>
  <p className="mt-4 max-w-2xl text-lg">Tell me a little about your business and what you’d like to know. You don’t need to choose an offer before reaching out.</p>
  <p className="mt-4 max-w-2xl text-sm text-slate-600">Your details are stored in our HubSpot CRM to respond to your inquiry. This won’t subscribe you to marketing emails. Please don’t include passwords, payment details, or other sensitive information.</p>
  <div ref={mount} className="mt-8 max-w-3xl rounded-xl bg-white p-2 sm:p-6">
   {loading && <p role="status">Loading inquiry form…</p>}
   <div className="hs-form-frame" data-region="na2" data-form-id={inquiryFormId} data-portal-id="247862766" />
  </div>
  <p className="mt-3 text-sm">Form not loading? <a className="underline" href="https://43kk4u.share-na2.hsforms.com/2eUMiOVbYTiinMmCp50dIwg">Open the inquiry form</a>.</p>
 </section>;
}
