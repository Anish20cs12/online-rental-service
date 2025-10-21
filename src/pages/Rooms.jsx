import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getRooms } from "../services/storage";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => setRooms(getRooms()), []);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {rooms.map((r) => <ItemCard key={r.id} item={r} category="room" />)}
        </div>
      </div>
    </div>
  );
}
