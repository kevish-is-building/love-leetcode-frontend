import {
  Clock,
  ArrowLeft,
  Code,
  Cpu,
  Database,
  Terminal,
  Zap,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ComingSoon = ({ feature }) => {
  return (
    <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#63e_100%)] relative overflow-hidden">
      {/* Animated Tech Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Code Elements */}
        <div
          className="absolute top-10 left-10 text-purple-400/20 text-6xl font-mono animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          {"</>"}
        </div>
        <div
          className="absolute top-32 right-20 text-blue-400/20 text-4xl font-mono animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        >
          const
        </div>
        <div
          className="absolute bottom-20 left-32 text-green-400/20 text-5xl font-mono animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        >
          function()
        </div>
        <div
          className="absolute top-1/2 right-10 text-yellow-400/20 text-3xl font-mono animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
        >
          return;
        </div>

        {/* Moving Tech Icons */}
        {/* <div className="absolute top-20 left-1/4 animate-pulse">
          <Code className="h-12 w-12 text-purple-400/30" />
        </div>
        <div className="absolute bottom-40 right-1/3 animate-pulse" style={{ animationDelay: '1s' }}>
          <Cpu className="h-10 w-10 text-blue-400/30" />
        </div>
        <div className="absolute top-1/3 left-20 animate-pulse" style={{ animationDelay: '2s' }}>
          <Database className="h-8 w-8 text-green-400/30" />
        </div>
        <div className="absolute top-40 right-1/4 animate-pulse" style={{ animationDelay: '0.8s' }}>
          <GitBranch className="h-9 w-9 text-cyan-400/30" />
        </div> */}
        <div
          className="absolute bottom-20 right-20 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          <Terminal className="h-14 w-14 text-yellow-400/30" />
        </div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Moving Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(90deg, #a855f7 1px, transparent 1px),
              linear-gradient(180deg, #a855f7 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Glowing Orbs
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div> */}
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-8 relative z-10">
        <div className="text-center max-w-2xl animate-fade-in">
          <div className="mb-6">
            {/* Neon Glowing Icon Container */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-4 shadow-2xl shadow-purple-500/50">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <div
                className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
            </div>

            {/* Neon Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {feature.title}
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text mb-4">
              Coming Soon
            </div>

            <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed max-w-xl mx-auto">
              We're building something amazing just for you.
              <span className="text-purple-400 font-semibold">
                {" "}
                {feature.title}
              </span>{" "}
              will take your coding journey to the next level!
            </p>
          </div>

          <div className="space-y-5">
            {/* Neon Feature Box */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl"></div>
              <div className="relative bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <h3 className="text-purple-400 font-bold text-lg">
                    What's Coming
                  </h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2 text-left max-w-md mx-auto">
                  {feature.objectives.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse flex-shrink-0"
                        style={{ animationDelay: `${idx * 0.2}s` }}
                      ></div>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse flex-shrink-0"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                    <span>Real-time collaboration with developers worldwide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse flex-shrink-0"
                      style={{ animationDelay: "0.8s" }}
                    ></div>
                    <span>Advanced analytics & performance tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse flex-shrink-0"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span>Vibrant community & interactive learning</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Neon Back Button */}
            <Link to="/">
              <Button className="relative group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 text-sm font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <ArrowLeft className="mr-2 h-4 w-4 relative z-10" />
                <span className="relative z-10">Back to Home</span>
              </Button>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
