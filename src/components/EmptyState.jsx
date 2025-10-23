import React from "react";
import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description = "", actionTo, actionLabel }) {
  return (
    <div className="text-center bg-white/80 backdrop-blur rounded-2xl border p-8 shadow-sm">
      <div className="flex items-center justify-center mb-3">
        <Inbox className="text-gray-300" size={36} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {description && <p className="text-gray-600 mt-1">{description}</p>}
      {actionTo && actionLabel && (
        <div className="mt-4">
          <Link to={actionTo} className="inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 shadow">
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
