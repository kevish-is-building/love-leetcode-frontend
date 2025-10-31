import React from "react";
import ComingSoon from "../components/ComingSoon";

export default function ContestPage() {
  const options = {
    title: "Contests",
    objectives: [
      "Competitive coding challenges",
      "Live leaderboards & rankings",
      "Time-bound problem solving",
    ],
  };
  return (
    <>
      <ComingSoon feature={options} />
    </>
  );
}
