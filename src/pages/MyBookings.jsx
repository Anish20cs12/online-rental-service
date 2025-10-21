import React, { useEffect, useMemo, useState } from "react";
import { getBookings } from "../services/storage";
import { getCurrentUser } from "../services/auth";

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
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {myBookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet.</p>
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
              </div>
              <div className="mt-2 sm:mt-0 font-bold">₹{b.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
