import React, { useEffect, useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getCars } from "../services/storage";
import { motion } from "framer-motion";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("price-asc");
  useEffect(() => setCars(getCars()), []);

  const visibleCars = useMemo(() => {
    let list = [...cars];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [cars, query, sort]);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-semibold mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
        >
          Cars
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {visibleCars.map((c) => (
            <ItemCard key={c.id} item={c} category="car" />
          ))}
        </div>
      </div>
    </div>
  );
}
