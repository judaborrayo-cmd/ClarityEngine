import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Video, 
  Mail, 
  Target,
  TrendingUp,
  BarChart3,
  Search,
  Users,
  ArrowRight,
  Star
} from "lucide-react";

export default function GrowthClarityAuditPage() {
  const [activeTab, setActiveTab] = useState("what-included");

  const deliverables = [
    {
      icon: Search,
      title: "Full-Funnel Growth & CRO Audit",
      description: "Uncover What's Costing You Conversions",
      details: "Full-funnel audit for funnel breakdowns. I'll analyze your funnel, tracking, and Ad ROI—then show you how to scale smarter."
    },
    {
      icon: Video,
      title: "PDF and Video Walkthrough of Opportunities",
      description: "Clear, actionable insights delivered personally",
      details: "Clear, concise recording and PDF walk through of your current opportunities to improve Return on Investment, Return on Ad Spend, Conversion Rates, and Costs Per Lead or Sale."
    },
    {
      icon: Clock,
      title: "1:1 Call Included for CMOs, Strategists, Advertisers, Builders and Owners",
      description: "30 - 60 Minute Call",
      details: "Direct access to discuss findings, clarify recommendations, and create an action plan."
    },
    {
      icon: Mail,
      title: "Email Support for 2 Weeks",
      description: "Ongoing guidance for implementation",
      details: "Ask follow-up questions or get light implementation support via email."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Submit Your Information",
      description: "Complete our comprehensive audit form with your current marketing setup, goals, and challenges."
    },
    {
      step: "02", 
      title: "Deep-Dive Analysis",
      description: "I'll analyze your funnels, tracking, ad accounts, landing pages, and conversion optimization opportunities."
    },
    {
      step: "03",
      title: "Detailed Report & Video",
      description: "Receive a comprehensive PDF report with personalized video walkthrough highlighting key opportunities."
    },
    {
      step: "04",
      title: "Strategy Call",
      description: "30-60 minute call to discuss findings, answer questions, and create your action plan."
    },
    {
      step: "05",
      title: "2-Week Email Support",
      description: "Get ongoing support as you implement recommendations with direct email access."
    }
  ];

  const faqs = [
    {
      question: "How long does the audit take?",
      answer: "The complete audit process takes 5-7 business days from submission to delivery of your detailed report and video walkthrough."
    },
    {
      question: "What if I don't have tracking set up?",
      answer: "No problem! Part of the audit includes identifying tracking gaps and providing step-by-step guidance on proper implementation."
    },
    {
      question: "Do you work with my specific industry?",
      answer: "I've worked across fitness, SaaS, e-commerce, wellness, and many other industries. The audit framework applies universally while recommendations are tailored to your specific business model."
    },
    {
      question: "What happens after the audit?",
      answer: "You'll have a clear roadmap to implement. If you'd like ongoing support, we can discuss strategy and management services during our call."
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-primary/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Most Popular Service
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Full Growth Clarity Audit
                <span className="block text-primary">Strategy, Offers, Paid Media</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Uncover what's costing you conversions with a comprehensive 360° audit. 
                Get a clear roadmap to scale your growth with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                  data-testid="button-get-audit"
                >
                  Get Your Audit
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link
                  to="/#case-studies"
                  className="border border-border hover:bg-muted text-foreground px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  data-testid="link-view-results"
                >
                  View Client Results
                </Link>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border">
                <h3 className="text-2xl font-bold text-foreground mb-6">What You'll Get</h3>
                <ul className="space-y-4">
                  {[
                    "Full-funnel conversion audit",
                    "Video walkthrough of opportunities", 
                    "30-60 minute strategy call",
                    "2 weeks of email support",
                    "Actionable implementation roadmap"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-foreground">$497</span>
                    <span className="text-muted-foreground ml-2">One-time investment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* What's Included Section */}
      <section id="what-included" className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">What's Included</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive audit designed to uncover growth opportunities and provide actionable insights for immediate implementation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {deliverables.map((deliverable, index) => {
              const IconComponent = deliverable.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{deliverable.title}</h3>
                      <p className="text-primary font-medium mb-3">{deliverable.description}</p>
                      <p className="text-muted-foreground leading-relaxed">{deliverable.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A streamlined 5-step process designed to deliver maximum value with minimal time investment from you.
            </p>
          </div>
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about the Growth Clarity Audit process.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Investment</h2>
            <p className="text-xl text-muted-foreground">
              One comprehensive audit. Unlimited growth potential.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border-2 border-primary/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4" />
                Limited Time Offer
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Growth Clarity Audit</h3>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-4xl font-bold text-foreground">$497</span>
                <span className="text-muted-foreground">One-time investment</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4">What's Included:</h4>
                <ul className="space-y-3">
                  {[
                    "Full-funnel growth & conversion audit",
                    "Personalized video walkthrough", 
                    "Detailed PDF report with action items",
                    "30-60 minute strategy call",
                    "2 weeks of email support"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Perfect For:</h4>
                <ul className="space-y-3">
                  {[
                    "Scaling e-commerce brands",
                    "SaaS companies seeking growth",
                    "Service-based businesses", 
                    "Agencies looking to optimize",
                    "Any business spending on ads"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Link
                to="/#cta"
                className="bg-primary hover:bg-gradient-to-br hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 text-white px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-3"
                data-testid="button-book-audit"
              >
                Book Your Growth Clarity Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                30-day money-back guarantee • Delivered within 7 business days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Unlock Your Growth Potential?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join hundreds of brands who've used our Growth Clarity Audit to scale with confidence.
          </p>
          <Link
            to="/#cta"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            data-testid="button-footer-cta"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}