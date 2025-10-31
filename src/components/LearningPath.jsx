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
                color: "green",
              },
              {
                title: "Arrays & Strings",
                problems: 200,
                difficulty: "Easy-Medium",
                color: "blue",
              },
              {
                title: "Linked Lists & Trees",
                problems: 180,
                difficulty: "Medium",
                color: "yellow",
              },
              {
                title: "Dynamic Programming",
                problems: 120,
                difficulty: "Medium-Hard",
                color: "purple",
              },
              {
                title: "Graph Algorithms",
                problems: 100,
                difficulty: "Hard",
                color: "red",
              },
              {
                title: "System Design",
                problems: 50,
                difficulty: "Expert",
                color: "cyan",
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
          <div className="space-y-8">
            {course.map((path, index) => (
              <Card
                key={index}
                // --- Change 2: Added shadow-lg for better card appearance ---
                className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.01] rounded-2xl"
              >
                <CardContent className="">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        // --- Change 2: Changed to rounded-full and fixed background/border for better visibility ---
                        className={`w-12 h-12 bg-gray-700/50 rounded-full border border-gray-600 flex items-center justify-center shadow-md`}
                      >
                        <CheckCircle
                          // --- Change 1: Fixed icon color to purple-400 to ensure it is NOT black (The main fix for #45) ---
                          className="w-6 h-6 text-purple-400"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {path.title}
                        </h3>
                        <p className="text-gray-400">
                          {path.problems} • {path.difficulty}
                        </p>
                      </div>
                    </div>
                    <Link to="/learn">
                      <Button
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300 cursor-pointer"
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