import { Brain, Code, Trophy, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function WhyCode() {
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleFeatures((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 },
    );

    document
      .querySelectorAll(".feature-card")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  const getFeatureAnimation = (index) => {
    if (!visibleFeatures.includes(index)) return "opacity-0 translate-y-10";
    return "opacity-100 translate-y-0";
  };
  const features = [
    {
      icon: (
        <Code className="h-7 w-7 text-indigo-200 drop-shadow-[0_0_12px_rgba(165,180,252,0.8)]" />
      ),
      title: "Customized Problem Sets",
      description:
        "Handpicked problems organized by patterns, difficulty, and frequency.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: (
        <Brain className="h-7 w-7 text-purple-200 drop-shadow-[0_0_12px_rgba(216,180,254,0.8)]" />
      ),
      title: "Reference Learning",
      description:
        "Visualize algorithms, step through solutions, and understand core concepts.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: (
        <Zap className="h-7 w-7 text-yellow-200 drop-shadow-[0_0_12px_rgba(254,240,138,0.9)]" />
      ),
      title: "Real-time Execution",
      description:
        "Write and run code in your browser with instant feedback and test cases.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: (
        <Trophy className="h-7 w-7 text-emerald-200 drop-shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
      ),
      title: "Progress Tracking",
      description:
        "Monitor your improvement with problem typed statistics and playlists.",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];
  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-4xl">
                {" "}
                Love Leetcode
              </span>
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform is designed to help you master algorithms and ace
              technical interviews through deliberate practice and visual
              learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                data-index={index}
                className={`feature-card group relative p-6 rounded-2xl bg-gray-800/30 border border-gray-700 hover:bg-gray-800/50 transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 shadow-lg ${getFeatureAnimation(
                  index,
                )}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon container with animation */}
                <div
                  className={`relative h-16 w-16 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-white/10 overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-10 blur-md transition-all duration-500`}
                  />
                  <div className="relative group-hover:animate-pulse transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
