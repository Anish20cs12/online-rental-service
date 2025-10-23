import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addReview, getAverageRating, getReviews } from "../services/reviews";
import { getCurrentUser } from "../services/auth";

export default function ItemDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, category } = location.state || {};
  const user = getCurrentUser();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const avg = useMemo(() => getAverageRating(category, item?.id) ?? item?.rating ?? null, [category, item]);
  const reviews = useMemo(() => (item ? getReviews(category, item.id) : []), [category, item]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No item selected.</p>
        <button onClick={() => navigate("/")} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded">Go Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow overflow-hidden"
      >
        <img src={item.image} alt={item.name} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{item.name}</h1>
          <p className="text-gray-700 mb-1">Category: <span className="font-semibold">{category}</span></p>
          <p className="text-gray-700 mb-4">Price: <span className="font-semibold">₹{item.price} / day</span></p>
          {avg && (
            <div className="mb-4 text-amber-500 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.854 1.417 8.264L12 19.771 4.583 23.866 6 15.602 0 9.748l8.332-1.593z"/></svg>
              <span className="text-gray-700">{avg.toFixed(1)} / 5</span>
            </div>
          )}
          <p className="text-gray-600 mb-6">{item.description}</p>

          <div className="flex gap-3">
            <button onClick={() => navigate("/booking", { state: { item, category } })}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Book Now</button>
            <button onClick={() => navigate(-1)} className="border px-4 py-2 rounded">Back</button>
          </div>
        </div>
      </motion.div>
      <div className="max-w-4xl mx-auto mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">Reviews ({reviews.length})</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-600 text-sm">No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="border rounded p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">{r.userName || r.userEmail}</div>
                    <div className="text-amber-500 flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.854 1.417 8.264L12 19.771 4.583 23.866 6 15.602 0 9.748l8.332-1.593z"/></svg>
                      <span className="text-gray-700">{r.rating}</span>
                    </div>
                  </div>
                  {r.comment && <p className="text-gray-600 text-sm mt-1">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">Write a review</h3>
          {user ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addReview({
                  category,
                  itemId: item.id,
                  userEmail: user.email,
                  userName: user.name,
                  rating,
                  comment,
                });
                setComment("");
                // naive refresh; in a full app, use state
                window.location.reload();
              }}
              className="space-y-3"
            >
              <label className="text-sm">Rating</label>
              <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full border rounded px-3 py-2" />
              <textarea placeholder="Share your experience" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border rounded px-3 py-2" />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Submit</button>
            </form>
          ) : (
            <p className="text-sm text-gray-600">Please log in to write a review.</p>
          )}
        </div>
      </div>
    </div>
  );
}
