// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Header({ handleLogout }) {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/App Name */}
        <Link to="/" className="text-3xl font-extrabold text-indigo-700 tracking-tight hover:text-indigo-800 transition">
          CarRent
        </Link>
        
        {/* Actions (Logout) */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}