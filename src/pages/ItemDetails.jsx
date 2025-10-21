import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ItemDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, category } = location.state || {};

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No item selected.</p>
        <button onClick={() => navigate("/")} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded">Go Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
          <p className="text-gray-700 mb-4">Category: <span className="font-semibold">{category}</span></p>
          <p className="text-gray-700 mb-4">Price: <span className="font-semibold">₹{item.price} / day</span></p>
          <p className="text-gray-600 mb-6">{item.description}</p>

          <div className="flex gap-3">
            <button onClick={() => navigate("/booking", { state: { item, category } })}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Book Now</button>
            <button onClick={() => navigate(-1)} className="border px-4 py-2 rounded">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
