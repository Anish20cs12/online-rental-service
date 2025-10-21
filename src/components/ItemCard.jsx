import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "../services/storage";
import { motion } from "framer-motion";

export default function ItemCard({ item, category }) {
  const user = getCurrentUser();
  const [fav, setFav] = React.useState(() =>
    user ? isFavorite(user.email, item.id, category) : false
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className="relative bg-white/80 backdrop-blur rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl max-w-[320px] w-full border border-white/40"
    >
      {/* gradient border ring */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent [background:conic-gradient(var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-pink-500 opacity-20"></span>

      {/* decorative sheen */}
      <span className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-white/30 blur-2xl"></span>

      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const fallback =
              category === "car"
                ? "/assets/car-placeholder.svg"
                : category === "bike"
                ? "/assets/bike-placeholder.svg"
                : "/assets/room-placeholder.svg";
            e.currentTarget.src = fallback;
          }}
        />
        {user && (
          <button
            aria-label="favorite"
            aria-pressed={fav}
            onClick={() => {
              toggleFavorite(user.email, item, category);
              setFav((v) => !v);
            }}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-2 hover:bg-white"
          >
            <motion.span
              initial={false}
              animate={{ scale: fav ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="inline-flex"
            >
              <Heart
                size={18}
                color={fav ? "#ef4444" : "#374151"}
                fill={fav ? "#ef4444" : "none"}
              />
            </motion.span>
          </button>
        )}
        {!user && (
          <span className="absolute top-2 right-2 text-xs bg-white/80 rounded-full px-2 py-1 text-gray-700">Login to favorite</span>
        )}
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">₹{item.price} <span className="text-gray-500 text-xs">/ day</span></span>
          <span className="text-[10px] uppercase tracking-wide bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{category}</span>
        </div>

        {user ? (
          <Link
            to="/item/1" // we pass item via state below, route uses state not id lookup for simplicity
            state={{ item, category }}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
          >
            View Details
          </Link>
        ) : (
          <Link to="/login" className="text-red-500 font-semibold">Login to view</Link>
        )}
      </div>
    </motion.div>
  );
}
