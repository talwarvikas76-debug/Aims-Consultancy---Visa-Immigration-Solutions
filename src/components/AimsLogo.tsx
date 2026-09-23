import React from 'react';

interface AimsLogoProps {
  className?: string;
  variant?: 'full' | 'emblem' | 'horizontal';
  theme?: 'dark' | 'light' | 'auto' | 'blue';
  showTagline?: boolean;
}

export const AimsLogo: React.FC<AimsLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'horizontal',
  theme = 'blue',
  showTagline = true,
}) => {
  // Standalone Emblem (Icon only)
  if (variant === 'emblem') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aims-blue-wing-1" x1="10" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="aims-cyan-wing-2" x1="40" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Dynamic Stylized 'A' Wings matching image */}
        <path
          d="M48 12C36 28 20 54 12 78C18 78 28 72 36 62C42 54 48 42 50 32C52 44 60 56 68 64C76 72 84 76 90 76C82 52 64 26 48 12Z"
          fill="url(#aims-blue-wing-1)"
        />
        <path
          d="M50 32C52 45 60 62 70 70C78 78 86 80 92 80C88 68 80 50 72 38C64 26 56 18 50 14V32Z"
          fill="url(#aims-cyan-wing-2)"
        />
        <path
          d="M32 64C42 61 58 61 68 64C62 58 58 54 50 54C42 54 38 58 32 64Z"
          fill="#60a5fa"
        />
      </svg>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 3D Dynamic Emblem matching image.png */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aims-blue-g1" x1="10" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="aims-cyan-g2" x1="40" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>

          {/* Left Wing / Apex */}
          <path
            d="M48 12C36 28 20 54 12 78C18 78 28 72 36 62C42 54 48 42 50 32C52 44 60 56 68 64C76 72 84 76 90 76C82 52 64 26 48 12Z"
            fill="url(#aims-blue-g1)"
          />
          {/* Right Accented Wing */}
          <path
            d="M50 32C52 45 60 62 70 70C78 78 86 80 92 80C88 68 80 50 72 38C64 26 56 18 50 14V32Z"
            fill="url(#aims-cyan-g2)"
          />
          {/* Crossbar Accent */}
          <path
            d="M32 64C42 61 58 61 68 64C62 58 58 54 50 54C42 54 38 58 32 64Z"
            fill="#93c5fd"
          />
        </svg>
      </div>

      {/* Brand Text Typography as given in image */}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight">
          <span className="text-2xl sm:text-3xl font-black text-[#1e40af] tracking-tight font-display">
            AIMS
          </span>
        </div>

        {showTagline && (
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-normal -mt-0.5">
            Visa & Immigration Consultancy
          </span>
        )}
      </div>
    </div>
  );
};
