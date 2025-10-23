import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveBooking, hasBookingOverlap } from "../services/storage";
import { getCurrentUser } from "../services/auth";
import { motion } from "framer-motion";
import { useToast } from "../components/Toast";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, category } = location.state || {};
  const user = getCurrentUser();
  const { notify } = useToast();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const days = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const msPerDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.floor((end - start) / msPerDay) + 1; // inclusive of both dates
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  if (!item) return <div className="p-8">No item selected.</div>;

  function handleSubmit(e) {
    e.preventDefault();
    if (!startDate || !endDate) {
      notify("Select start and end dates", "error");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      notify("End date must be on or after start date", "error");
      return;
    }
    if (hasBookingOverlap(item.id, startDate, endDate)) {
      notify("Dates unavailable for this item", "error");
      return;
    }
    const booking = {
      id: Date.now(),
      itemId: item.id,
      itemName: item.name,
      type: category,
      name: user?.name || "Guest",
      email: user?.email || "",
      startDate,
      endDate,
      days,
      total: item.price * days,
      status: "confirmed",
    };
    saveBooking(booking);
    notify("Booking confirmed!", "success");
    navigate("/my-bookings");
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Book {item.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Days: <span className="font-semibold">{days}</span></div>
            <div className="text-lg font-bold">Total: ₹{item.price * days}</div>
          </div>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">Confirm Booking</button>
        </form>
      </motion.div>
    </div>
  );
}
