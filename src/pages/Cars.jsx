import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getCars } from "../services/storage";

export default function Cars() {
  const [cars, setCars] = useState([]);
  useEffect(() => setCars(getCars()), []);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {cars.map((c) => <ItemCard key={c.id} item={c} category="car" />)}
        </div>
      </div>
    </div>
  );
}
