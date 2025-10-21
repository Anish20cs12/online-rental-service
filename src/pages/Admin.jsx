import React, { useEffect, useState } from "react";
import { getBookings, updateBookingStatus } from "../services/storage";
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
        <table className="w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Customer</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Dates</th>
              <th className="border p-2">Days</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="text-center">
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.itemName}</td>
                <td className="border p-2">{b.type}</td>
                <td className="border p-2">{b.startDate} → {b.endDate}</td>
                <td className="border p-2">{b.days}</td>
                <td className="border p-2">₹{b.total}</td>
                <td className="border p-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
                </td>
                <td className="border p-2">
                  {b.status !== 'cancelled' && (
                    <button
                      onClick={() => {
                        updateBookingStatus(b.id, 'cancelled');
                        setBookings((prev) => prev.map((x) => (x.id === b.id ? { ...x, status: 'cancelled' } : x)));
                      }}
                      className="text-red-600 border border-red-300 rounded px-3 py-1 hover:bg-red-50"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
