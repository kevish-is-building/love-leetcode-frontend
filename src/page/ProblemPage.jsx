import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  ArrowUpRight,
  Plus,
  Bookmark,
  TrashIcon,
  PenBoxIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuthStore } from "../store/useAuthStore";
import { useActions } from "../store/useAction";
import { usePlaylistStore } from "../store/usePlaylistStore";
import AddToPlaylistModal from "../components/AddToPlaylist";
import CreatePlaylistModal from "../components/CreatePlaylistModal";

function ConfirmDeleteModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-red-700 rounded-lg shadow-xl p-6 w-full max-w-xs relative">
        <div className="flex items-center gap-3 mb-4">
          <TrashIcon className="w-7 h-7 text-red-500" />
          <span className="text-lg font-bold text-red-400">
            Delete Problem?
          </span>
        </div>
        <p className="text-sm text-red-300 mb-6">
          Are you sure you want to delete this problem? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 text-sm shadow"
          >
            Delete Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProblemPage({ problems }) {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProblemId, setDeleteProblemId] = useState(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteProblemId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteProblem(deleteProblemId);
    setShowDeleteModal(false);
    setDeleteProblemId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteProblemId(null);
  };

  // -----------
  // const [searchTerm, setSearchTerm] = useState("");
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [filters, setFilters] = useState({
  //   difficulty: [],
  //   tags: allTags,
  //   status: [],
  // });

  // const handleFilterChange = (category, value) => {
  //   setFilters((prev) => {
  //     const newFilters = { ...prev };
  //     if (newFilters[category].includes(value)) {
  //       newFilters[category] = newFilters[category].filter(
  //         (item) => item !== value,
  //       );
  //     } else {
  //       newFilters[category] = [...newFilters[category], value];
  //     }
  //     return newFilters;
  //   });
  // };

  // const filteredProblems = problems.filter((problem) => {
  //   // Search filter
  //   if (
  //     searchTerm &&
  //     !problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   ) {
  //     return false;
  //   }

  //   // Difficulty filter
  //   if (
  //     filters.difficulty.length > 0 &&
  //     !filters.difficulty.includes(problem.difficulty)
  //   ) {
  //     return false;
  //   }

  //   // Tags filter
  //   if (
  //     filters.tags.length > 0 &&
  //     !problem.tags.some((tag) => filters.tags.includes(tag))
  //   ) {
  //     return false;
  //   }

  //   return true;
  // });

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty,
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag),
      );
  }, [problems, search, difficulty, selectedTag]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "text-green-300 bg-green-900/30 border border-green-500/30";
      case "MEDIUM":
        return "text-yellow-300 bg-yellow-900/30 border border-yellow-500/30";
      case "HARD":
        return "text-red-300 bg-red-900/30 border border-red-500/30";
      default:
        return "text-gray-300 bg-gray-900/30 border border-gray-500/30";
    }
  };

  const [visibleCount, setVisibleCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  // Reset visibleCount when filters/search change
  useEffect(() => {
    setVisibleCount(2);
  }, [search, filteredProblems]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      visibleCount < filteredProblems.length &&
      !isLoading
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 5, filteredProblems.length));
        setIsLoading(false);
      }, 500); // 500ms delay
    }
  }, [visibleCount, filteredProblems.length, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Ensure enough problems are loaded to fill the viewport
  useEffect(() => {
    if (
      document.body.scrollHeight <= window.innerHeight &&
      visibleCount < filteredProblems.length &&
      !isLoading
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 5, filteredProblems.length));
        setIsLoading(false);
      }, 500); // 500ms delay
    }
  }, [visibleCount, filteredProblems.length, isLoading]);

  return (
    <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#63e_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3"
            >
              Problem Set
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              className="text-gray-300 text-lg"
            >
              Sharpen your coding skills with our curated collection of
              algorithmic challenges.
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Create Playlist
          </motion.button>
        </motion.div>

        {/* <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white flex items-center space-x-2"
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-10 p-4">
                <div className="mb-4">
                  <h3 className="text-white font-medium mb-2">Difficulty</h3>
                  <div className="space-y-2">
                    {filters.difficulty.map((difficulty) => (
                      <label
                        key={difficulty}
                        className="flex items-center text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(difficulty)}
                          onChange={() =>
                            handleFilterChange("difficulty", difficulty)
                          }
                          className="mr-2 h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                        />
                        {difficulty}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-white font-medium mb-2">Tags</h3>
                  <div className="space-y-2">
                    {filters.tags.map((tag) => (
                      <label
                        key={tag}
                        className="flex items-center text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={filters.tags.includes(tag)}
                          onChange={() => handleFilterChange("tags", tag)}
                          className="mr-2 h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> */}
        {/* Search and Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          {/* Search Bar */}
          <div className="flex-grow relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-purple-300 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search problems by title..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-gray-800/70"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Difficulty Filter */}
          <select
            className="rounded-xl px-5 py-3.5 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-gray-800/70 cursor-pointer min-w-[180px]"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="ALL" className="bg-gray-900">
              All Difficulties
            </option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff} className="bg-gray-900">
                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          {/* Tags Filter */}
          <select
            className="rounded-xl px-5 py-3.5 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-gray-800/70 cursor-pointer min-w-[160px]"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="ALL" className="bg-gray-900">
              All Tags
            </option>
            {allTags.map((tag) => (
              <option key={tag} value={tag} className="bg-gray-900">
                {tag}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Problems Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="rounded-2xl bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 overflow-hidden shadow-2xl"
        >
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-700/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Save
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Difficulty
                </th>
                {authUser?.data?.role === "ADMIN" && (
                  <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                    Actions
                  </th>
                )}
                <th className="px-6 py-4 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              <AnimatePresence>
                {filteredProblems.slice(0, visibleCount).map((problem, idx) => {
                  const isSolved =
                    problem?.solvedBy?.some(
                      (user) => user.userId === authUser?.data?.id,
                    ) || false;
                  return (
                    <motion.tr
                      key={problem.id}
                      className="group transition-all duration-300 hover:bg-gray-700/30"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + idx * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        {isSolved ? (
                          <CheckCircle className="h-6 w-6 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                        ) : (
                          <div className="h-6 w-6 rounded-full border-2 border-gray-500 group-hover:border-purple-400 transition-colors" />
                        )}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <button
                          className="text-purple-400 hover:text-purple-300 hover:scale-110 transition-all duration-300 cursor-pointer"
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-5">
                        <Link
                          to={`/problem/${problem.id}`}
                          className="text-blue-400 hover:text-blue-300 font-medium flex items-center group/link transition-colors"
                        >
                          <span className="group-hover/link:underline">
                            {problem.title}
                          </span>
                          <ArrowUpRight className="ml-1.5 h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </Link>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${getDifficultyColor(
                            problem.difficulty,
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      {authUser?.data?.role === "ADMIN" && (
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Link
                              to={`/add-problem`}
                              className="text-blue-400 hover:text-blue-300 hover:scale-110 transition-all duration-300"
                            >
                              <PenBoxIcon className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(problem.id)}
                              className="text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-300 cursor-pointer"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      )}
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          {problem?.tags?.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-xs bg-purple-900/30 text-purple-200 rounded-lg border border-purple-500/30 font-medium"
                            >
                              {tag}
                            </span>
                          )) || (
                            <span className="text-gray-500 text-xs">
                              No tags
                            </span>
                          )}
                          {problem?.tags?.length > 2 && (
                            <span className="px-3 py-1 text-xs bg-purple-900/30 text-purple-200 rounded-lg border border-purple-500/30 font-medium">
                              +{problem.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>

        {/* Loading More Indicator */}
        {visibleCount < filteredProblems.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center gap-2 text-purple-400 font-medium">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
              <span className="ml-2">Loading more problems...</span>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 mt-8"
          >
            <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Problems Found
              </h3>
              <p className="text-gray-400">
                No problems match your filters. Try adjusting your search
                criteria.
              </p>
            </div>
          </motion.div>
        )}
      </div>
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
}
