import { useEffect, useMemo } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowUpRight } from "lucide-react";
import Loader from "../components/Loader";
import { useAuthStore } from "../store/useAuthStore";

const LEVELS = [
  {
    tag: "LVL-0",
    name: "Level 0 - Newbie",
    color: "from-green-500 to-emerald-500",
    textColor: "text-green-400",
  },
  {
    tag: "LVL-1",
    name: "Level 1 - Beginner",
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-400",
  },
  {
    tag: "LVL-2",
    name: "Level 2 - Intermediate",
    color: "from-yellow-500 to-orange-500",
    textColor: "text-yellow-400",
  },
  {
    tag: "LVL-3",
    name: "Level 3 - Advanced",
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-400",
  },
];

const getDifficultyStyle = (difficulty) => {
  switch (difficulty) {
    case "EASY":
      return "bg-green-900/30 text-green-300 border border-green-500/30";
    case "MEDIUM":
      return "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30";
    case "HARD":
      return "bg-red-900/30 text-red-300 border border-red-500/30";
    default:
      return "bg-gray-900/30 text-gray-300 border border-gray-500/30";
  }
};

const LearnPage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  // Group problems by level tag
  const levelData = useMemo(() => {
    return LEVELS.map((level) => {
      const levelProblems = problems.filter(
        (problem) =>
          Array.isArray(problem.tags) &&
          problem.tags.some((tag) => tag.toUpperCase() === level.tag),
      );

      return {
        ...level,
        problems: levelProblems,
        count: levelProblems.length,
      };
    });
  }, [problems]);

  if (isProblemsLoading) {
    return (
      <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#63e_100%)] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#63e_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Level-Based Learning
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Progress through curated levels and master coding step by step.
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="space-y-6">
          {levelData.map((level, idx) => {
            const isSolved = (problem) =>
              problem?.solvedBy?.some(
                (user) => user.userId === authUser?.data?.id,
              );

            return (
              <motion.div
                key={level.tag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Level Header */}
                <div className="p-6 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2
                        className={`text-2xl font-bold mb-1 bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}
                      >
                        {level.name}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {level.count} problem{level.count !== 1 ? "s" : ""}{" "}
                        available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Problems Grid */}
                {level.count > 0 ? (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {level.problems.map((problem, problemIdx) => (
                        <motion.div
                          key={problem.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: idx * 0.1 + problemIdx * 0.05,
                            duration: 0.3,
                          }}
                        >
                          <Link
                            to={`/problem/${problem.id}`}
                            className="block h-full"
                          >
                            <div className="h-full rounded-xl bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-4 hover:bg-gray-800/60 hover:border-purple-500/50 transition-all duration-300 group">
                              {/* Problem Header */}
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-medium text-white text-sm flex-1 line-clamp-2 group-hover:text-purple-300 transition-colors">
                                  {problem.title}
                                </h4>
                                {isSolved(problem) ? (
                                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 ml-2 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                                ) : (
                                  <ArrowUpRight className="w-5 h-5 text-purple-400 flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                              </div>

                              {/* Difficulty Badge */}
                              <div className="mb-3">
                                <span
                                  className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-lg ${getDifficultyStyle(
                                    problem.difficulty,
                                  )}`}
                                >
                                  {problem.difficulty}
                                </span>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1.5">
                                {problem.tags
                                  ?.filter(
                                    (tag) => tag.toUpperCase() !== level.tag,
                                  )
                                  .slice(0, 2)
                                  .map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-0.5 text-xs bg-purple-900/30 text-purple-200 rounded border border-purple-500/20"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                {problem.tags?.filter(
                                  (tag) => tag.toUpperCase() !== level.tag,
                                ).length > 2 && (
                                  <span className="px-2 py-0.5 text-xs bg-purple-900/30 text-purple-200 rounded border border-purple-500/20">
                                    +
                                    {problem.tags.filter(
                                      (tag) => tag.toUpperCase() !== level.tag,
                                    ).length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-gray-500">
                      No problems available in this level yet.
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
