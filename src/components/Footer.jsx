import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
        <div>
          <span className="font-semibold text-indigo-600">CarRent</span> · © {year}
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-gray-800">GitHub</a>
          <a href="mailto:support@example.com" className="hover:text-gray-800">Support</a>
          <a href="#top" className="hover:text-gray-800">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
