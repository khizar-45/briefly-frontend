// DotsBackground.jsx
import React from "react";

const DotsBackground = ({ children }) => {
  return (
    <div className="relative w-full h-full text-white">
      <div className="absolute inset-0 -z-10 text-white">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="2"
                fill="white"
                opacity="0.6"
                style={{ filter: "blur(2px)" }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Your actual content goes here */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DotsBackground;