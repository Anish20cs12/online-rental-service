import React, { useEffect, useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getBikes } from "../services/storage";
import { motion } from "framer-motion";

export default function Bikes() {
  const [bikes, setBikes] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("price-asc");
  useEffect(() => setBikes(getBikes()), []);

  const visibleBikes = useMemo(() => {
    let list = [...bikes];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          (b.description || "").toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [bikes, query, sort]);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent heading-glow"
        >
          Bikes
        </motion.h2>
        <div className="sticky top-16 z-10 backdrop-blur bg-white/50 rounded-xl p-3 border mb-6 flex flex-col sm:flex-row gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            className="flex-1 border rounded px-3 py-2"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-3 py-2 w-full sm:w-48"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <div className="flex flex-wrap gap-2 text-xs">
            {['150cc','200cc','Cruiser','Scooter'].map((t) => (
              <button key={t} className="px-2 py-1 rounded-full border bg-white/70 hover:bg-white">{t}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {visibleBikes.map((b) => (
            <ItemCard key={b.id} item={b} category="bike" />
          ))}
        </div>
      </div>
    </div>
  );
}
