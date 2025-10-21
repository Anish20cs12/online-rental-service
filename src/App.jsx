import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { ensureAdmin } from "./services/auth";

export default function App() {
  useEffect(() => {
    // seed a simple admin for demo: admin@a.com / admin
    ensureAdmin();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-8">
        <Routes>
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
      </main>
    </div>
  );
}
