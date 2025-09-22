import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Quote } from "lucide-react";
import mariSmithPhoto from "@assets/Mari_1758572440824.jpg";
import lindseyBassPhoto from "@assets/Lindsey_Bast_1758572440824.jpg";
import alyssaArmandRoyPhoto from "@assets/Alyssa_1758572440823.jpg";
import danielaGutenkovski from "@assets/Daniela_1758572440824.jpg";
import mikeBerkmanPhoto from "@assets/Mike_Berkman_1758572440825.jpg";
import billBowmanPhoto from "@assets/Bill_Bowman_1758572440823.jpg";

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

export default function Testimonials() {
  const colleagueReviews = [
    {
      id: 1,
      name: "Mari Smith",
      title: "Co-Founder & Marketing Director",
      avatar: mariSmithPhoto,
      review: "It's always enjoyable writing a recommendation for someone as enjoyable as Juda. I've worked with Juda in a professional capacity for over a year now at Sociality Squared. We've worked on his various clients together and he's worn many different hats.",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-white",
      type: "Colleague review"
    },
    {
      id: 2,
      name: "Lindsey Bast",
      title: "Digital Strategist & Growth Marketer",
      avatar: lindseyBassPhoto,
      review: "I highly recommend Juda as a skilled and professional growth marketer. I've worked with him on multiple digital marketing strategies and media buying projects. Juda gives it his all for his clients.",
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-500",
      textColor: "text-white",
      type: "Colleague review"
    },
    {
      id: 3,
      name: "Alyssa Brooke-Gay",
      title: "Senior Project Manager",
      avatar: alyssaArmandRoyPhoto,
      review: "Juda is a phenomenal colleague and complete rockstar for his clients! I've had the pleasure of working with Juda for over a year, and we've collaborated on several large-scale digital marketing projects throughout that time.",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-white",
      type: "Colleague review"
    },
    {
      id: 4,
      name: "Daniela Goldzmindt",
      title: "Marketing Manager",
      avatar: danielaGutenkovski,
      review: "Juda is simply one of the best persons I have had the opportunity to work with. Not only he is proficient in Marketing, specially in the paid media field, but also, he has a very strong work ethic and solid soft skills. Juda is a team player.",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
      textColor: "text-white",
      type: "Colleague review"
    },
    {
      id: 5,
      name: "Mike Berkman",
      title: "VP of Performance",
      avatar: mikeBerkmanPhoto,
      review: "I had the pleasure of working with Juda during his tenure at LamarR. During his interview, I knew he would bring a different level of thinking and analysis to the team that we were needing. He did not disappoint.",
      bgColor: "bg-gradient-to-br from-pink-400 to-pink-500",
      textColor: "text-white",
      type: "Colleague review"
    },
    {
      id: 6,
      name: "Bill Bowman",
      title: "Vice President of Marketing",
      avatar: billBowmanPhoto,
      review: "Juda is an exceptional marketing talent. He is able to manage complex advertising campaigns in a calm and focused way. While working with him, he continually suggested new and interesting ways to accomplish our team goals.",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-white",
      type: "Colleague review"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ProgressBar />
      <main className="relative">
        
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl" data-testid="page-title">
                Testimonials
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                What industry professionals say about working with us.
              </p>
            </div>
          </div>
        </section>

        {/* Colleague Reviews Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="colleague-reviews-title">
                Colleague Reviews
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                What industry professionals say about working with me
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {colleagueReviews.map((review) => (
                <div 
                  key={review.id}
                  className={`${review.bgColor} ${review.textColor} rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-200`}
                  data-testid={`review-${review.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center mr-3">
                        <img 
                          src={review.avatar} 
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-medium opacity-75 uppercase tracking-wide">
                          {review.type}
                        </span>
                      </div>
                    </div>
                    <Quote className="h-6 w-6 opacity-75" />
                  </div>
                  
                  <blockquote className="text-sm leading-relaxed mb-4">
                    "{review.review}"
                  </blockquote>
                  
                  <div className="border-t border-white/20 pt-4">
                    <div className="font-semibold text-sm">{review.name}</div>
                    <div className="text-xs opacity-90">{review.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Client Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Client Results</h2>
              <p className="mt-4 text-lg text-gray-600">
                Real outcomes from our partnerships
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gym Chain</h3>
                <p className="text-gray-600 mb-2">10+ locations</p>
                <div className="text-2xl font-bold text-green-600">-56% CPL</div>
                <p className="text-sm text-gray-500">in 60 days</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Luxury Travel</h3>
                <p className="text-gray-600 mb-2">Galápagos tours</p>
                <div className="text-2xl font-bold text-blue-600">3x ROAS</div>
                <p className="text-sm text-gray-500">improvement</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">E-commerce</h3>
                <p className="text-gray-600 mb-2">Fine jewelry</p>
                <div className="text-2xl font-bold text-purple-600">Higher AOV</div>
                <p className="text-sm text-gray-500">& repeat buyers</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to join our success stories?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how we can deliver similar results for your brand.
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
                to="/case-studies" 
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold border border-green-300 text-green-700 hover:bg-green-50 transition-colors duration-200"
                data-testid="cta-case-studies"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}