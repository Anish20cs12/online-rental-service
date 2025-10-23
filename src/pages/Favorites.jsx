import React, { useMemo, useState, useEffect } from "react";
import { getFavorites } from "../services/storage";
import { getCurrentUser } from "../services/auth";
import ItemCard from "../components/ItemCard";

export default function Favorites() {
  const user = getCurrentUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      setFavorites(getFavorites(user.email));
    }
  }, [user]);

  const items = useMemo(
    () => favorites.map((f) => ({ item: { ...f.itemSnapshot, id: f.itemId }, category: f.category })),
    [favorites]
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please log in to see favorites.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">My Favorites</h1>
      {items.length === 0 ? (
        <div className="text-gray-600 bg-white/70 rounded-xl p-6 border border-gray-100">No favorites yet. Click the heart on any item to add.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {items.map(({ item, category }) => (
            <ItemCard key={`${category}-${item.id}-${item.name}`} item={item} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
