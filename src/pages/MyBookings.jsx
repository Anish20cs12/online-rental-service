import React, { useEffect, useMemo, useState } from "react";
import { getBookings, updateBookingStatus } from "../services/storage";
import { getCurrentUser } from "../services/auth";
import EmptyState from "../components/EmptyState";

export default function MyBookings() {
  const user = getCurrentUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const all = getBookings();
    setBookings(all);
  }, []);

  const myBookings = useMemo(() => {
    if (!user) return [];
    return bookings.filter(
      (b) => b.email === user.email || b.name === user.name
    );
  }, [bookings, user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please log in to see your bookings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">My Bookings</h1>
      {myBookings.length === 0 ? (
        <EmptyState title="No bookings yet" description="You haven't booked anything yet." actionTo="/cars" actionLabel="Browse cars" />
      ) : (
        <div className="space-y-4">
          {myBookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-lg p-4 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="font-semibold">{b.itemName}</div>
                <div className="text-sm text-gray-600">
                  {b.type} • {b.startDate} → {b.endDate} • {b.days} day(s)
                </div>
                <div className="text-xs mt-1"><span className={`px-2 py-0.5 rounded ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{b.status}</span></div>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-3">
                <div className="font-bold">₹{b.total}</div>
                {b.status !== "cancelled" && (
                  <button
                    onClick={() => {
                      updateBookingStatus(b.id, "cancelled");
                      setBookings((prev) => prev.map((x) => (x.id === b.id ? { ...x, status: "cancelled" } : x)));
                    }}
                    className="text-red-600 border border-red-300 rounded px-3 py-1 hover:bg-red-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
