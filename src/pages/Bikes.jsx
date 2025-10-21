import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getBikes } from "../services/storage";

export default function Bikes() {
  const [bikes, setBikes] = useState([]);
  useEffect(() => setBikes(getBikes()), []);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Bikes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {bikes.map((b) => <ItemCard key={b.id} item={b} category="bike" />)}
        </div>
      </div>
    </div>
  );
}
