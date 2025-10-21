import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            {[
              { to: "/cars", label: "Cars" },
              { to: "/bikes", label: "Bikes" },
              { to: "/rooms", label: "Rooms" },
            ].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `transition-all relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-yellow-300 after:transition-all ${
                    isActive
                      ? "text-yellow-300 after:w-full"
                      : "hover:text-yellow-200 after:w-0 hover:after:w-full"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right Section - Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {user ? (
            <>
              <span className="hidden sm:block">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>

              <Link to="/my-bookings" className="hover:text-yellow-300 transition-all">
                My Bookings
              </Link>
              <Link to="/favorites" className="hover:text-yellow-300 transition-all">
                Favorites
              </Link>

              {user && user.role === "admin" && (
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

        {/* Mobile menu button */}
        <button
          className="md:hidden bg-white/20 rounded-lg p-2 hover:bg-white/30"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4 text-white space-y-3">
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/cars" onClick={() => setOpen(false)}>Cars</Link>
            <Link to="/bikes" onClick={() => setOpen(false)}>Bikes</Link>
            <Link to="/rooms" onClick={() => setOpen(false)}>Rooms</Link>
          </div>
          <div className="flex gap-3 items-center text-sm font-medium">
            {user ? (
              <>
                <Link to="/my-bookings" onClick={() => setOpen(false)}>My Bookings</Link>
                <Link to="/favorites" onClick={() => setOpen(false)}>Favorites</Link>
                {user && user.role === "admin" && (
                  <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
                )}
                <button onClick={() => { setOpen(false); handleLogout(); }} className="ml-auto bg-white text-blue-700 px-3 py-1 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="bg-white text-blue-700 px-3 py-1 rounded">Login</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="bg-yellow-400 text-gray-800 px-3 py-1 rounded">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
