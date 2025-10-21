import React, { useEffect, useState } from "react";
import { getBookings } from "../services/storage";
import { getCurrentUser } from "../services/auth";

export default function Admin() {
  const user = getCurrentUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Access denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Customer</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Days</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="text-center">
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.itemName}</td>
                <td className="border p-2">{b.type}</td>
                <td className="border p-2">{b.days}</td>
                <td className="border p-2">₹{b.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
