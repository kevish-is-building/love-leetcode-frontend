import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import Loader from "./components/Loader";

import Layout from "./layout/Layout";
import LandingPage from "./page/Landing";
import Auth from "./page/Auth";
import Register from "./page/Register";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./page/AddProblem";

import NewProblemSolver from "./page/ProblemSolver";
import AllProblems from "./page/AllProblems";
import LearnPage from "./page/LearnPage";
import ContestPage from "./page/ContestPage";
import ContactUs from "./page/ContactUs";
import Dashboard from "./page/Dashboard";
import AdminPanel from "./page/AdminPanel";
import BackendStatusPopup from "./components/BackendStatusPopup";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser && location.pathname !== "/") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <BackendStatusPopup />
      <Routes>
        {/* Testing Route */}
        {/* <Route path="/test" element={< />} /> */}

        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path="/problems"
            element={authUser ? <AllProblems /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/learn"
            element={authUser ? <LearnPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to={"/login"} />}
          />

          <Route path="/contact" element={<ContactUs />} />
        </Route>

        <Route path="/contest" element={<ContestPage />} />

        <Route
          path="/login"
          element={!authUser ? <Auth /> : <Navigate to={"/"} />}
        />

        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to={"/"} />}
        />

        <Route
          path="/problem/:id"
          element={authUser ? <NewProblemSolver /> : <Navigate to={"/login"} />}
        />

        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/login" />}
          />
          {authUser && (
            <Route
              path="/admin"
              element={authUser ? <AdminPanel /> : <Navigate to="/" />}
            />
          )}
        </Route>
      </Routes>
      <SpeedInsights />
    </>
  );
};

export default App;
