import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";
import { motion } from "framer-motion";

export default function Navbar() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // ✅ Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
  isScrolled
    ? "bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 shadow-2xl py-2"
    : "bg-gradient-to-r from-blue-500 via-cyan-500 to-green-400 shadow-lg py-3"
}`}

    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-white transition-all duration-300">
        {/* Left Section - Logo + Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-all"
          >
            CarRent
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/cars" className="hover:text-yellow-300 transition-all">
              Cars
            </Link>
            <Link to="/bikes" className="hover:text-yellow-300 transition-all">
              Bikes
            </Link>
            <Link to="/rooms" className="hover:text-yellow-300 transition-all">
              Rooms
            </Link>
          </div>
        </div>

        {/* Right Section - Auth Buttons */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {user ? (
            <>
              <span className="hidden sm:block">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="hover:text-yellow-300 transition-all"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-4 py-1 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-700 px-4 py-1 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-gray-800 px-4 py-1 rounded-lg font-semibold hover:bg-yellow-300 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
