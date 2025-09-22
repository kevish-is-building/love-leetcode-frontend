import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Popup = ({ message, variant }) => {
  const bg = variant === "error" ? "bg-red-600" : "bg-emerald-600";
  const ring = variant === "error" ? "ring-red-400/50" : "ring-emerald-400/50";
  return (
    <motion.div
      initial={{ y: 16, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 16, opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.6 }}
      className={`pointer-events-auto ${bg} text-white shadow-lg ring-1 ${ring} rounded-md px-3 py-2 text-sm`}
    >
      {message}
    </motion.div>
  );
};

export default function BackendStatusPopup() {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState("error");
  const [lastDownTs, setLastDownTs] = useState(null);
  const [hideTimer, setHideTimer] = useState(null);

  useEffect(() => {
    const onDown = (e) => {
      if (hideTimer) {
        clearTimeout(hideTimer);
        setHideTimer(null);
      }
      setVariant("error");
      setMsg("Backend is unreachable. Some actions may fail.");
      setVisible(true);
      setLastDownTs(e?.detail?.ts ?? Date.now());
    };
    const onUp = () => {
      if (lastDownTs) {
        setVariant("success");
        setMsg("Back online. You're good to go.");
        setVisible(true);
        const t = setTimeout(() => {
          setVisible(false);
          setLastDownTs(null);
          setHideTimer(null);
        }, 2000);
        setHideTimer(t);
      }
    };

    window.addEventListener("backend:down", onDown);
    window.addEventListener("backend:up", onUp);
    return () => {
      window.removeEventListener("backend:down", onDown);
      window.removeEventListener("backend:up", onUp);
      if (hideTimer) clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDownTs, hideTimer]);

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
      <AnimatePresence initial={false}>
        {visible && <Popup message={msg} variant={variant} />}
      </AnimatePresence>
    </div>
  );
}
