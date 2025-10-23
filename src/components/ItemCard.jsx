import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "../services/storage";
import { motion } from "framer-motion";
import BlurImage from "./BlurImage";

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
        <BlurImage
          src={item.image}
          alt={item.name}
          fallback={
            category === "car"
              ? "/assets/car-placeholder.svg"
              : category === "bike"
              ? "/assets/bike-placeholder.svg"
              : "/assets/room-placeholder.svg"
          }
          className="h-48 w-full"
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
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          {category === "bike" && (
            <span className="flex items-center gap-1 text-amber-500 text-sm" aria-label={`Rating ${item.rating ?? 4.5}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.854 1.417 8.264L12 19.771 4.583 23.866 6 15.602 0 9.748l8.332-1.593z"/></svg>
              <span className="text-gray-700">{(item.rating ?? 4.5).toFixed(1)}</span>
            </span>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">₹{item.price} <span className="text-gray-500 text-xs">/ day</span></span>
          <span className="text-[10px] uppercase tracking-wide bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{category}</span>
        </div>
        {category === "bike" && item.spec && (
          <div className="text-xs text-gray-500 mb-2">{item.spec}</div>
        )}

        {user ? (
          <Link
            to="/item/1" // we pass item via state below, route uses state not id lookup for simplicity
            state={{ item, category }}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
          >
            View Details
          </Link>
        ) : (
          <Link
            to="/login"
            className="block w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg shadow mt-2"
          >
            Book Now
          </Link>
        )}
      </div>
    </motion.div>
  );
}
