import React from "react";
import { Car, Bike, Bed, Search } from "lucide-react";
import { motion } from "framer-motion";

// Assuming you create this file in a components directory:
// Remove the extra header to avoid double nav and simplify UI
// (Navbar is already fixed and animated)
import CategoryCard from"../components/CategoryCard.jsx";

// Centralized Data Source for Categories
const categories = [
  {
    name: "Cars",
    color: "from-indigo-600 to-blue-500",
    icon: Car,
    desc: "Rent your favorite car for any trip, from sedans to SUVs.",
    link: "/cars",
  },
  {
    name: "Bikes",
    color: "from-pink-600 to-red-500",
    icon: Bike,
    desc: "Quick rides and budget-friendly rentals for city exploration.",
    link: "/bikes",
  },
  {
    name: "Rooms",
    color: "from-green-600 to-emerald-500",
    icon: Bed,
    desc: "Book cozy rooms for your stay, perfect for short and long-term.",
    link: "/rooms",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      
      {/* Top spacing to account for fixed Navbar height */}

      {/* Main content with increased top padding for the fixed header */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 md:pt-40">
        
        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4"
        >
          Welcome to <span className="text-indigo-700">ONLINE RENTAL SERVICE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 mb-12 text-lg md:text-xl"
        >
          Find the perfect rental for your next adventure.
        </motion.p>

        {/* Search Bar Component/Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-4xl mb-16"
        >
          <div className="flex bg-white shadow-xl rounded-full p-2 border border-gray-200">
            <input
              type="text"
              placeholder="Where do you want to go? Search by category, location, or dates..."
              className="flex-grow p-3 px-6 text-gray-700 rounded-l-full focus:outline-none placeholder-gray-400"
            />
            <button className="flex items-center space-x-2 bg-indigo-600 text-white p-3 px-6 rounded-full hover:bg-indigo-700 transition-colors font-semibold shadow-md">
              <Search size={20} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </motion.div>

        {/* Category Grid (using the new component) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {categories.map((item, i) => (
            <CategoryCard
              key={item.name}
              delay={i}
              icon={item.icon}
              name={item.name}
              desc={item.desc}
              link={item.link}
              color={item.color}
            />
          ))}
        </div>
      </main>

    </div>
  );
}