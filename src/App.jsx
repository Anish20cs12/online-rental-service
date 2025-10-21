import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Bikes from "./pages/Bikes";
import Rooms from "./pages/Rooms";
import ItemDetails from "./pages/ItemDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import MyBookings from "./pages/MyBookings";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";
import { ensureAdmin } from "./services/auth";

export default function App() {
  useEffect(() => {
    // seed a simple admin for demo: admin@a.com / admin
    ensureAdmin();
  }, []);
  const location = useLocation();
  const pathname = location.pathname;
  const pageBg =
    pathname.startsWith("/cars")
      ? "bg-gradient-to-b from-indigo-50 to-blue-50"
      : pathname.startsWith("/bikes")
      ? "bg-gradient-to-b from-rose-50 to-pink-50"
      : pathname.startsWith("/rooms")
      ? "bg-gradient-to-b from-emerald-50 to-green-50"
      : pathname.startsWith("/favorites")
      ? "bg-gradient-to-b from-pink-50 to-rose-50"
      : pathname.startsWith("/my-bookings")
      ? "bg-gradient-to-b from-indigo-50 to-blue-50"
      : pathname.startsWith("/admin")
      ? "bg-gradient-to-b from-purple-50 to-fuchsia-50"
      : pathname.startsWith("/login") || pathname.startsWith("/signup")
      ? "bg-gradient-to-b from-indigo-50 to-purple-50"
      : "bg-gradient-to-b from-gray-50 to-gray-100";
  return (
    <div className="min-h-screen bg-gray-100 pt-16 bg-animated-blobs">
      <Navbar />
      <main className={`py-8 ${pageBg}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Routes location={location}>
          <Route path="/" element={<Home />} />

          <Route path="/cars" element={<Cars />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/rooms" element={<Rooms />} />

          <Route
            path="/item/:id"
            element={
              <ProtectedRoute>
                <ItemDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            }
          />

              {/* fallback to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
