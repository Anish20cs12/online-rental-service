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
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl max-w-[280px] mx-auto"
    >
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
    </motion.div>
  );
}
