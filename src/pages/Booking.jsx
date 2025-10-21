import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveBooking } from "../services/storage";
import { getCurrentUser } from "../services/auth";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, category } = location.state || {};
  const user = getCurrentUser();

  const [days, setDays] = useState(1);

  if (!item) return <div className="p-8">No item selected.</div>;

  function handleSubmit(e) {
    e.preventDefault();
    const booking = {
      id: Date.now(),
      itemName: item.name,
      type: category,
      name: user?.name || "Guest",
      days,
      total: item.price * days,
    };
    saveBooking(booking);
    alert("Booking saved!");
    navigate("/"); // or navigate to admin/bookings
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Book {item.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Days</label>
            <input type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value))}
              className="w-full border rounded px-3 py-2" />
          </div>
          <div className="text-lg font-bold">Total: ₹{item.price * days}</div>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}
