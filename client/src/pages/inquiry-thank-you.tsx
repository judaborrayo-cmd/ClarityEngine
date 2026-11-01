import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportInquiry } from '@/lib/inquiry';
export default function InquiryThankYou(){
 useEffect(()=>{
  reportInquiry(); const timer=window.setInterval(reportInquiry,500);
  const stop=window.setTimeout(()=>clearInterval(timer),15000);
  window.addEventListener('ce-consent-change',reportInquiry);
  window.addEventListener('ce-advertising-consent-change',reportInquiry);
  return ()=>{clearInterval(timer);clearTimeout(stop);window.removeEventListener('ce-consent-change',reportInquiry);window.removeEventListener('ce-advertising-consent-change',reportInquiry);};
 },[]);
 return <main className="min-h-screen bg-[#f6f3ed] px-6 pb-24 pt-36"><div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 sm:p-12"><p className="text-sm font-semibold uppercase tracking-widest text-teal-800">Clarity Engine</p><h1 className="mt-4 text-4xl font-semibold">Thank you for reaching out.</h1><p className="mt-6 text-lg text-slate-700">After submitting your inquiry, you can expect a personal reply at the email address you provided. I’ll review your questions and follow up about the next steps.</p><p className="mt-4 text-slate-600">Your inquiry does not subscribe you to marketing emails.</p><Link to="/" className="mt-8 inline-block rounded-full bg-teal-900 px-6 py-3 text-white">Explore Clarity Engine</Link></div></main>;
}
