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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl max-w-[280px] mx-auto"
    >
      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/vite.svg";
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
            <Heart
              size={18}
              color={fav ? "#ef4444" : "#374151"}
              fill={fav ? "#ef4444" : "none"}
            />
          </button>
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
