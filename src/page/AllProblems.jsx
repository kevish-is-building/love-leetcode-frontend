import React, { useEffect } from "react";

import { useProblemStore } from "../store/useProblemStore";
import Loader from "../components/Loader";
import NewProblemPage from "./ProblemPage";

const AllProblems = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#63e_100%)] flex items-center justify-center">
        <Loader className="" />
      </div>
    );
  }

  return (
    <>
      {problems.length > 0 ? (
        <NewProblemPage problems={problems} />
      ) : (
        <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#63e_100%)] flex items-center justify-center">
          <p className="text-center text-lg font-semibold text-gray-400 border border-purple-500/30 px-6 py-3 rounded-xl border-dashed bg-gray-800/30 backdrop-blur-sm">
            No problems found
          </p>
        </div>
      )}
    </>
  );
};

export default AllProblems;
