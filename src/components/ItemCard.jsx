import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export default function ItemCard({ item, category }) {
  const user = getCurrentUser();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 max-w-[280px] mx-auto">
      <div className="h-48 w-full overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mb-2">₹{item.price} / day</p>

        {user ? (
          <Link
            to="/item/1" // we pass item via state below, route uses state not id lookup for simplicity
            state={{ item, category }}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View Details
          </Link>
        ) : (
          <Link to="/login" className="text-red-500 font-semibold">Login to view</Link>
        )}
      </div>
    </div>
  );
}
