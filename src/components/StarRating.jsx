import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ value = 0, onChange, count = 5, size = 18, readOnly = false }) {
  const handleClick = (index) => {
    if (readOnly || !onChange) return;
    onChange(index + 1);
  };

  const handleKeyDown = (e) => {
    if (readOnly || !onChange) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(count, (value || 0) + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(1, (value || 1) - 1));
    }
  };

  return (
    <div className="inline-flex items-center" role={readOnly ? undefined : "slider"} aria-valuemin={1} aria-valuemax={count} aria-valuenow={readOnly ? undefined : value} tabIndex={readOnly ? -1 : 0} onKeyDown={handleKeyDown}>
      {Array.from({ length: count }).map((_, i) => {
        const active = i < value;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
            onClick={() => handleClick(i)}
            disabled={readOnly}
            className={`p-0.5 ${readOnly ? "cursor-default" : "cursor-pointer"}`}
          >
            <Star size={size} className={active ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
          </button>
        );
      })}
    </div>
  );
}
