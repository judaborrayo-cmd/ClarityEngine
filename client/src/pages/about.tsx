import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Target, Zap, Shield, Users } from "lucide-react";

// Progress Bar Component
function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ProgressBar />
      <main className="relative">
        
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl" data-testid="page-title">
                About Clarity Engine
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                We exist to bring clarity, structure, and measurable ROI to every campaign, account, and growth challenge.
              </p>
            </div>
          </div>
        </section>

        {/* Four Variables Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="four-variables-title">
                We maximize the four variables that determine value.
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Why Clients Choose Clarity Engine
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid="dream-outcome">
                  Dream Outcome
                </h3>
                <p className="text-sm text-gray-600">
                  Predictable growth, full control, complete transparency.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid="likelihood-success">
                  Likelihood of Success
                </h3>
                <p className="text-sm text-gray-600">
                  Proven strategies & $5M+ campaigns managed successfully.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid="speed">
                  Speed
                </h3>
                <p className="text-sm text-gray-600">
                  Audit delivers clarity in days or weeks, not months.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid="ease">
                  Ease
                </h3>
                <p className="text-sm text-gray-600">
                  We manage complexity, you stay focused.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-rose-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="our-values-title">
                Our Values
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid="clarity-over-complexity">
                  Clarity over complexity
                </h3>
                <p className="text-gray-600">
                  We simplify funnels and ad ecosystems so you know exactly what's working.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid="strategy-first">
                  Strategy first, execution second
                </h3>
                <p className="text-gray-600">
                  Every campaign is tied to roadmaps, milestones, and business outcomes.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid="roi-over-vanity">
                  ROI over vanity
                </h3>
                <p className="text-gray-600">
                  We track the metrics that matter: revenue, bookings, conversions.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid="collaboration-over-agencies">
                  Collaboration over black-box agencies
                </h3>
                <p className="text-gray-600">
                  We embed as part of your team, not as outsiders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-8 text-2xl font-bold text-gray-900">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-blue-600 mb-2" data-testid="stat-spend">$5M+</div>
                  <div className="text-sm text-gray-600">in ad spend managed across growth brands</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-green-600 mb-2" data-testid="stat-years">12+</div>
                  <div className="text-sm text-gray-600">years in paid media & growth strategy</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-purple-600 mb-2" data-testid="stat-hours">20,800+</div>
                  <div className="text-sm text-gray-600">hours managing ads & strategy</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured On Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="featured-on-title">
                Featured On
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Recognized expertise in performance marketing and growth strategy
              </p>
            </div>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900" data-testid="contra-english">
                    Best English-speaking Freelance Performance Marketing Specialists to hire in 2025
                  </h3>
                  <p className="text-sm text-gray-600">Contra Featured Expert</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900" data-testid="contra-spanish-ads">
                    Best Spanish-speaking Google Ads freelancers to hire in 2025
                  </h3>
                  <p className="text-sm text-gray-600">Contra Featured Expert</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900" data-testid="contra-spanish-sheets">
                    Best Spanish-speaking Google Sheets freelancers to hire in 2025
                  </h3>
                  <p className="text-sm text-gray-600">Contra Featured Expert</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to work with a team that puts clarity first?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss your growth goals and map out a strategy that delivers measurable ROI.
            </p>
            <div className="space-x-4">
              <Link 
                to="/#book-intro" 
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                data-testid="cta-book-call"
              >
                Book a 10‑min Intro Call
              </Link>
              <Link 
                to="/growth-clarity-audit" 
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold border border-green-300 text-green-700 hover:bg-green-50 transition-colors duration-200"
                data-testid="cta-audit"
              >
                Start with an Audit
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
