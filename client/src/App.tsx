import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Home from "@/pages/home";
import Services from "@/pages/services";
import CaseStudies from "@/pages/case-studies";
import CaseStudyDetail from "@/pages/case-study-detail";
import GrowthClarityAudit from "@/pages/growth-clarity-audit";
import About from "@/pages/about";
import Testimonials from "@/pages/testimonials";
import CheckoutAudit from "@/pages/checkout-audit";
import NotFound from "@/pages/not-found";

import Clarity_Engine_Favicon from "@assets/Clarity-Engine-Favicon_1758553782935.png";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={Clarity_Engine_Favicon}
              alt="Clarity Engine Logo"
              className="h-8 w-auto object-contain"
            />
            <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
              Clarity Engine
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/#services" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link 
              to="/case-studies" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Case Studies
            </Link>
            <Link 
              to="/#how-we-scale" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link 
              to="/#book-intro" 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Book Strategic Intro Call
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/growth-clarity-audit" element={<GrowthClarityAudit />} />
          <Route path="/checkout/audit" element={<CheckoutAudit />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-study/:slug" element={<CaseStudyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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