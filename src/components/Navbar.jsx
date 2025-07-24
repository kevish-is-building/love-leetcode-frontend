import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Code, User, LogOut } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "./LogoutButton";
import Test from "./Try/Test";

const Navbar = () => {
  const { authUser } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Problems", path: "/problems" },
    { name: "Learn", path: "/learn" },
    { name: "Contest", path: "/contest" },
    { name: "Contact Us", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const adminNavLinks = [
    { name: "Problems", path: "/problems" },
    { name: "Learn", path: "/learn" },
    { name: "Contest", path: "/contest" },
    { name: "Contact Us", path: "/contact" },
    { name: "Add problem", path: "/add-problem" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <>
    <nav
      className={`fixed w-full z-50 transition-all duration-300 p-0 m-0`}
      >
      <Test>
    </Test>
    </nav>
    </>
  );
};

export default Navbar;
