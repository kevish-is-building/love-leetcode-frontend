import React from 'react'
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function AdminPanel() {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="" />
      </div>
    );
  }

  const role = authUser?.data?.role ?? authUser?.role ?? authUser?.user?.role;
  const user = authUser?.data?.user ?? authUser?.user ?? authUser;

  if (role !== "ADMIN") {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">You do not have permission to view this page.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block rounded-md border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Signed in as <span className="font-medium">{user?.name || user?.email || "Admin"}</span>
      </p>

      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/add-problem"
          className="rounded-lg border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">Add Problem</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Create and publish a new problem.</p>
        </Link>

        <Link
          to="/dashboard"
          className="rounded-lg border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">View site metrics and recent activity.</p>
        </Link>

        <Link
          to="/problems"
          className="rounded-lg border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">Manage Problems</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Browse and edit existing problems.</p>
        </Link>
      </div>
    </div>
  );
}
