import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function LearningPath() {

  const course = [
    {
      title: "Fundamentals",
      problems: 150,
      difficulty: "Beginner",
      iconBg: "bg-green-500/20",
      iconBorder: "border-green-500/30",
      iconColor: "text-green-300",
      iconShadow: "drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]",
    },
    {
      title: "Arrays & Strings",
      problems: 200,
      difficulty: "Easy-Medium",
      iconBg: "bg-blue-500/20",
      iconBorder: "border-blue-500/30",
      iconColor: "text-blue-300",
      iconShadow: "drop-shadow-[0_0_8px_rgba(147,197,253,0.6)]",
    },
    {
      title: "Linked Lists & Trees",
      problems: 180,
      difficulty: "Medium",
      iconBg: "bg-yellow-500/20",
      iconBorder: "border-yellow-500/30",
      iconColor: "text-yellow-300",
      iconShadow: "drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]",
    },
    {
      title: "Dynamic Programming",
      problems: 120,
      difficulty: "Medium-Hard",
      iconBg: "bg-purple-500/20",
      iconBorder: "border-purple-500/30",
      iconColor: "text-purple-300",
      iconShadow: "drop-shadow-[0_0_8px_rgba(216,180,254,0.6)]",
    },
    {
      title: "Graph Algorithms",
      problems: 100,
      difficulty: "Hard",
      iconBg: "bg-red-500/20",
      iconBorder: "border-red-500/30",
      iconColor: "text-red-300",
      iconShadow: "drop-shadow-[0_0_8px_rgba(252,165,165,0.6)]",
    },
    {
      title: "System Design",
      problems: 50,
      difficulty: "Expert",
      iconBg: "bg-orange-500/20",
      iconBorder: "border-orange-500/30",
      iconColor: "text-orange-200",
      iconShadow: "drop-shadow-[0_0_12px_rgba(253,186,116,0.8)]",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Structured Learning Path
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow our carefully crafted curriculum designed for every level of
            coder.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {course.map((path, index) => (
              <Card
                key={index}
                className="group bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 rounded-2xl"
              >
                <CardContent className="">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`relative w-14 h-14 ${path.iconBg} ${path.iconBorder} border rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 overflow-hidden`}
                      >
                        <CheckCircle
                          className={`w-7 h-7 ${path.iconColor} ${path.iconShadow} relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse`}
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white transition-colors duration-300">
                          {path.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {path.problems} problems • {path.difficulty}
                        </p>
                      </div>
                    </div>
                    <Link to="/learn">
                      <Button
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 cursor-pointer transition-all duration-300"
                      >
                        Start Learning <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
