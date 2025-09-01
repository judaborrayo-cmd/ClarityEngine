import { Routes, Route, Link } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Services from "@/pages/services";
import NotFound from "@/pages/not-found";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/clarity-engine-logo.png"
              alt="Clarity Engine Logo"
              className="h-8 w-8"
            />
            <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
              Clarity Engine
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/services" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <a 
              href="#case-studies" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Case Studies
            </a>
            <a 
              href="#about" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a 
              href="#cta" 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
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