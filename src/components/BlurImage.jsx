import React from "react";

export default function BlurImage({ src, alt, className = "", fallback }) {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const effectiveSrc = !error ? src : fallback;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={effectiveSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? "blur-0 opacity-100" : "blur-md opacity-80"
        }`}
      />
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200/40 via-gray-100/40 to-gray-200/40" />
      )}
    </div>
  );
}
