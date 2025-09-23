import { useState } from "react";

type AvatarType = "revenue-protectors" | "growth-drivers" | "conversion-optimizers";

interface Problem {
  title: string;
  description: string;
  solution: string;
}

const problems: Record<AvatarType, Problem[]> = {
  "revenue-protectors": [
    {
      title: "Wasted Ad Spend",
      description: "Budget bleeding on underperforming campaigns",
      solution: "Identify and eliminate spend leaks across channels"
    },
    {
      title: "Poor Attribution",
      description: "Can't track which campaigns drive actual revenue", 
      solution: "Build unified tracking for clear ROI visibility"
    },
    {
      title: "Platform Scattered",
      description: "Disjointed campaigns across Google, Meta, YouTube",
      solution: "Coordinate omni-channel strategy for maximum impact"
    }
  ],
  "growth-drivers": [
    {
      title: "Revenue Plateaus", 
      description: "Growth stalled despite increasing ad investment",
      solution: "Break through scaling bottlenecks with systematic testing"
    },
    {
      title: "Limited Reach",
      description: "Audience saturation limiting expansion potential",
      solution: "Expand into new channels and audience segments"
    },
    {
      title: "Conversion Barriers",
      description: "Traffic increases but revenue growth stays flat",
      solution: "Optimize full-funnel experience from click to purchase"
    }
  ],
  "conversion-optimizers": [
    {
      title: "Low Conversion Rates",
      description: "Traffic flowing but visitors aren't converting",
      solution: "Systematic A/B testing to improve page performance"
    },
    {
      title: "Leaky Funnels",
      description: "High drop-off rates at critical conversion points",
      solution: "Identify and fix friction points throughout the journey"
    },
    {
      title: "Poor User Experience",
      description: "Site speed, mobile issues, unclear value props",
      solution: "Streamline UX for seamless conversion pathways"
    }
  ]
};

const avatars = [
  {
    id: "revenue-protectors" as AvatarType,
    label: "Revenue Protectors",
    subtitle: "Stop wasted ad spend"
  },
  {
    id: "growth-drivers" as AvatarType, 
    label: "Growth Drivers",
    subtitle: "Break through plateaus"
  },
  {
    id: "conversion-optimizers" as AvatarType,
    label: "Conversion Optimizers", 
    subtitle: "Turn traffic into revenue"
  }
];

export default function ClarityEngineAvatarProblems() {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>("revenue-protectors");

  const handleKeyNavigation = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const direction = e.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + avatars.length) % avatars.length;
      const nextButton = document.querySelector(`[data-avatar-index="${nextIndex}"]`) as HTMLButtonElement;
      nextButton?.focus();
    }
  };

  return (
    <section className="px-6 py-12 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Problems We Eliminate
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Choose your primary focus area to see the specific challenges we solve
          </p>
        </div>

        {/* Avatar Selector - Segmented Control */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1" role="group">
            {avatars.map((avatar, index) => (
              <button
                key={avatar.id}
                data-avatar-index={index}
                onClick={() => setSelectedAvatar(avatar.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedAvatar(avatar.id);
                  } else {
                    handleKeyNavigation(e, index);
                  }
                }}
                aria-pressed={selectedAvatar === avatar.id}
                tabIndex={selectedAvatar === avatar.id ? 0 : -1}
                className={`
                  px-4 py-3 text-xs font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
                  ${selectedAvatar === avatar.id 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }
                `}
              >
                <div className="text-center">
                  <div className="font-semibold">{avatar.label}</div>
                  <div className="text-gray-500 mt-0.5">{avatar.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Problem Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {problems[selectedAvatar].map((problem, index) => (
            <div 
              key={`${selectedAvatar}-${index}`}
              className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                {problem.description}
              </p>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-medium text-indigo-700">
                  → {problem.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet CTA Row */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-sm text-gray-600">
              Ready to eliminate these challenges?
            </span>
            <a 
              href="#book"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
            >
              Book a clarity call →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}