import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useLayoutEffect } from "react";
import { useStrategySprintMetadata } from "@/hooks/use-strategy-sprint-metadata";
import SiteFooter from "@/components/site-footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import CaseStudies from "@/pages/case-studies";
import CaseStudyDetail from "@/pages/case-study-detail";
import GrowthClarityAudit from "@/pages/growth-clarity-audit";
import About from "@/pages/about";
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

import Clarity_Engine_Favicon from "@assets/Clarity-Engine-Favicon_1758553782935.png";

const navigationLinks = [
  { to: "/#services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/#how-we-scale", label: "About" },
  { to: "/marketing-clarity-assesment", label: "Clarity Assessment" },
  { to: "/strategy-sprint", label: "Strategy Sprints" },
];

function Navbar() {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img src={Clarity_Engine_Favicon} alt="Clarity Engine Logo" className="h-7 w-auto shrink-0 object-contain sm:h-8" />
            <Link to="/" className="whitespace-nowrap text-base font-bold leading-none text-foreground transition-colors hover:text-primary sm:text-xl">Clarity Engine</Link>
          </div>
          <div className="hidden items-center gap-4 text-sm lg:flex">
            {navigationLinks.map(link => <Link key={link.to} to={link.to} className="whitespace-nowrap text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>)}
            <Link to="/#book-intro" className="whitespace-nowrap bg-primary text-primary-foreground px-4 py-2 rounded-2xl font-semibold hover:bg-primary/90 transition-colors">Book Strategic Intro Call</Link>
          </div>
          <Link to="/#book-intro" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 lg:hidden">Book Call</Link>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1 border-t border-border/60 pt-3 text-center text-[11px] leading-tight sm:text-sm lg:hidden">
          {navigationLinks.map(link => <Link key={link.to} to={link.to} className="flex min-h-8 items-center justify-center rounded-lg px-1 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{link.label}</Link>)}
        </div>
      </div>
    </nav>
  );
}

function LegacyAssessmentRedirect() {
  const location = useLocation();
  return <Navigate replace to={`/marketing-clarity-assesment${location.search}${location.hash}`} />;
}

function Router() {
  const location = useLocation();
  useStrategySprintMetadata(location.pathname);
  const isHome = location.pathname === "/";
  // Public marketing layout only; checkout, embedded, and private flows stay focused.
  const footerPages = ["/", "/services", "/case-studies", "/about", "/marketing-clarity-assesment", "/strategy-sprint", "/growth-clarity-audit", "/testimonials"];
  const showFooter = footerPages.includes(location.pathname) || location.pathname.startsWith("/case-study/");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (location.hash) return;

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
        const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
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
          const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else if (!location.hash) {
      // Scroll to top when navigating to a new page without a hash
      // Use setTimeout to ensure it runs after route content renders
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div className={isHome ? "pt-0" : "pt-32 lg:pt-20"}>
        <Routes>
          <Route path="/marketing-clarity-assesment" element={<MarketingClarityAudit />} />
          <Route path="/marketing-clarity-audit" element={<LegacyAssessmentRedirect />} />
          <Route path="/audit/start" element={<AuditAssessment />} />
          <Route path="/audit/resume/:token" element={<AuditAssessment />} />
          <Route path="/audit/results/:token" element={<AuditResults />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/growth-clarity-audit" element={<GrowthClarityAudit />} />
          <Route path="/checkout/audit" element={<CheckoutAudit />} />
          <Route path="/checkout/audit/onboarding-confirmed" element={<CheckoutAuditOnboardingConfirmed />} />
          <Route path="/checkout/audit/thank-you" element={<CheckoutAuditThankYou />} />
          <Route path="/strategy-sprint" element={<StrategySprint />} />
          <Route path="/checkout/strategy-sprint" element={<CheckoutStrategySprint />} />
          <Route path="/checkout/strategy-sprint/thank-you" element={<CheckoutStrategySprintThankYou />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-study/:slug" element={<CaseStudyDetail />} />
          <Route path="/about" element={<About />} />
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
