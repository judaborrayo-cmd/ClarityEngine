import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useLayoutEffect } from "react";
import { useStrategySprintMetadata } from "@/hooks/use-strategy-sprint-metadata";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CheckoutDeepDiveGrowthAudit from "@/pages/checkout-deep-dive-growth-audit";
import SiteFooter from "@/components/site-footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import CaseStudies from "@/pages/case-studies";
import CaseStudyDetail from "@/pages/case-study-detail";
import GrowthClarityAudit from "@/pages/growth-clarity-audit";
import About from "@/pages/about";
import WaysToWorkTogether from "@/pages/ways-to-work-together";
import Testimonials from "@/pages/testimonials";
import CheckoutAudit from "@/pages/checkout-audit";
import CheckoutAuditOnboardingConfirmed from "@/pages/checkout-audit-onboarding-confirmed";
import CheckoutAuditThankYou from "@/pages/checkout-audit-thank-you";
import StrategySprint from "@/pages/strategy-sprint";
import CheckoutStrategySprint from "@/pages/checkout-strategy-sprint";
import CheckoutStrategySprintThankYou from "@/pages/checkout-strategy-sprint-thank-you";
import Steven from "@/pages/steven";
import NotFound from "@/pages/not-found";
import MarketingClarityAudit from '@/pages/marketing-clarity-audit';
import AuditAssessment from '@/pages/audit-assessment';
import AuditResults from '@/pages/audit-results';

import Navbar from "@/components/site-navigation";

function LegacyAssessmentRedirect() {
  const location = useLocation();
  return <Navigate replace to={`/marketing-clarity-assesment${location.search}${location.hash}`} />;
}

function Router() {
  const location = useLocation();
  useStrategySprintMetadata(location.pathname);
  const isHome = location.pathname === "/";
  // Public marketing layout only; checkout, embedded, and private flows stay focused.
  const footerPages = ["/privacy-policy","/terms-of-service","/", "/services", "/case-studies", "/about", "/marketing-clarity-assesment", "/strategy-sprint", "/growth-clarity-audit", "/testimonials", "/ways-to-work-together"];
  const showFooter = footerPages.includes(location.pathname) || location.pathname.startsWith("/case-study/");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (location.hash) return;

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "auto" });
    };

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const timeout = window.setTimeout(scrollToTop, 150);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    // Handle smooth scroll on homepage for anchor links
    const handleSmoothScroll = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Only handle our specific anchor links
      if (!['/#services', '/#how-we-scale'].includes(href)) return;
      
      // Only intercept if we're already on the homepage
      if (location.pathname !== '/') return;
      
      e.preventDefault();
      const id = href.split('#')[1];
      const target = document.getElementById(id);
      
      if (target) {
        const y = target.getBoundingClientRect().top + window.pageYOffset - (document.querySelector('nav[aria-label="Main navigation"]')?.getBoundingClientRect().height ?? 80) - 12;
        window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, [location.pathname]);

  // Handle hash on page load (when navigating from other pages)
  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          const y = target.getBoundingClientRect().top + window.pageYOffset - (document.querySelector('nav[aria-label="Main navigation"]')?.getBoundingClientRect().height ?? 80) - 12;
          window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        }
      }, 100);
    } else if (!location.hash) {
      // Scroll to top when navigating to a new page without a hash
      // Use setTimeout to ensure it runs after route content renders
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "auto" });
      }, 0);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div className={isHome ? "-mt-6 lg:mt-0" : "pt-28 lg:pt-20"}>
        <Routes>
          <Route path="/marketing-clarity-assesment" element={<MarketingClarityAudit />} />
          <Route path="/marketing-clarity-audit" element={<LegacyAssessmentRedirect />} />
          <Route path="/audit/start" element={<AuditAssessment />} />
          <Route path="/audit/resume/:token" element={<AuditAssessment />} />
          <Route path="/audit/results/:token" element={<AuditResults />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/growth-clarity-audit" element={<GrowthClarityAudit />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/checkout/deep-dive-growth-audit" element={<CheckoutDeepDiveGrowthAudit />} />
          <Route path="/checkout/audit" element={<CheckoutAudit />} />
          <Route path="/checkout/audit/onboarding-confirmed" element={<CheckoutAuditOnboardingConfirmed />} />
          <Route path="/checkout/audit/thank-you" element={<CheckoutAuditThankYou />} />
          <Route path="/strategy-sprint" element={<StrategySprint />} />
          <Route path="/checkout/strategy-sprint" element={<CheckoutStrategySprint />} />
          <Route path="/checkout/strategy-sprint/thank-you" element={<CheckoutStrategySprintThankYou />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-study/:slug" element={<CaseStudyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/ways-to-work-together" element={<WaysToWorkTogether />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/steven" element={<Steven />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showFooter && <SiteFooter />}
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
