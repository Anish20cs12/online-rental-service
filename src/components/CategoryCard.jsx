// src/components/CategoryCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryCard({ icon: Icon, name, desc, link, color, delay }) {
  // Define animation for a staggered effect
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2 + delay * 0.15, duration: 0.6 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      <Link
        to={link}
        className={`group h-full block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center justify-center transform hover:-translate-y-1`}
      >
        <div
          className={`h-20 w-20 flex items-center justify-center p-4 rounded-full bg-gradient-to-br ${color} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          <Icon size={36} className="shrink-0" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-700 transition">
          {name}
        </h3>
        <p className="text-gray-600 text-center text-base">{desc}</p>
      </Link>
    </motion.div>
  );
}