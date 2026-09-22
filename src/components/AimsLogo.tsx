import React from 'react';

interface AimsLogoProps {
  className?: string;
  variant?: 'full' | 'emblem' | 'horizontal';
  theme?: 'dark' | 'light' | 'auto';
  showTagline?: boolean;
}

export const AimsLogo: React.FC<AimsLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'horizontal',
  theme = 'dark',
  showTagline = true,
}) => {
  const isDark = theme === 'dark' || theme === 'auto';
  const subtextColor = isDark ? '#94a3b8' : '#475569';

  // Standalone Emblem (Icon only)
  if (variant === 'emblem') {
    return (
      <svg
        viewBox="0 0 400 360"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aims-left-face" x1="250" y1="30" x2="100" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff3344" />
            <stop offset="40%" stopColor="#e11124" />
            <stop offset="100%" stopColor="#9b0012" />
          </linearGradient>
          <linearGradient id="aims-left-shadow" x1="170" y1="120" x2="90" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#b50516" />
            <stop offset="100%" stopColor="#6e000b" />
          </linearGradient>
          <linearGradient id="aims-right-face" x1="250" y1="30" x2="380" y2="320" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff2a3b" />
            <stop offset="45%" stopColor="#d90429" />
            <stop offset="100%" stopColor="#8d0801" />
          </linearGradient>
          <linearGradient id="aims-right-bevel" x1="320" y1="280" x2="380" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a30919" />
            <stop offset="100%" stopColor="#550007" />
          </linearGradient>
          <linearGradient id="aims-swoosh" x1="140" y1="330" x2="280" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e50914" />
            <stop offset="50%" stopColor="#ff3848" />
            <stop offset="100%" stopColor="#9b0012" />
          </linearGradient>
          <linearGradient id="aims-arrow-left" x1="230" y1="200" x2="250" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c70014" />
            <stop offset="100%" stopColor="#7a000c" />
          </linearGradient>
          <linearGradient id="aims-arrow-right" x1="270" y1="200" x2="250" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff3b4b" />
            <stop offset="100%" stopColor="#bf081a" />
          </linearGradient>
        </defs>

        {/* 3D 'A' Emblem */}
        <g id="aims-emblem-graphic">
          {/* Left Main Slant */}
          <path
            d="M200 30L65 330L125 330L200 145L235 225L250 190L200 30Z"
            fill="url(#aims-left-face)"
          />
          {/* Left Shadow Bevel */}
          <path
            d="M65 330L125 330L100 280L65 330Z"
            fill="url(#aims-left-shadow)"
          />

          {/* Right Main Slant */}
          <path
            d="M200 30L335 300L300 330L230 330L275 225L200 30Z"
            fill="url(#aims-right-face)"
          />

          {/* Right 3D Lower Beveled Block */}
          <path
            d="M335 300L375 330L300 330L335 300Z"
            fill="url(#aims-right-bevel)"
          />

          {/* Central Upward Floating Arrow / Pyramid */}
          <path
            d="M200 165L180 210L200 205L200 165Z"
            fill="url(#aims-arrow-left)"
          />
          <path
            d="M200 165L220 210L200 205L200 165Z"
            fill="url(#aims-arrow-right)"
          />

          {/* Dynamic Upward Swoosh across crossbar */}
          <path
            d="M135 320C155 265 200 220 220 220C195 240 160 285 135 320Z"
            fill="url(#aims-swoosh)"
          />
        </g>
      </svg>
    );
  }

  // Full stacked logo (Emblem on top, typography below)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Emblem */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 relative mb-2">
          <svg
            viewBox="0 0 400 360"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="aims-left-face-full" x1="200" y1="30" x2="65" y2="330" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff3344" />
                <stop offset="40%" stopColor="#e11124" />
                <stop offset="100%" stopColor="#9b0012" />
              </linearGradient>
              <linearGradient id="aims-right-face-full" x1="200" y1="30" x2="375" y2="330" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff2a3b" />
                <stop offset="45%" stopColor="#d90429" />
                <stop offset="100%" stopColor="#7a000a" />
              </linearGradient>
              <linearGradient id="aims-right-bevel-full" x1="335" y1="300" x2="375" y2="330" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a30919" />
                <stop offset="100%" stopColor="#550007" />
              </linearGradient>
              <linearGradient id="aims-swoosh-full" x1="135" y1="320" x2="220" y2="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e50914" />
                <stop offset="50%" stopColor="#ff3848" />
                <stop offset="100%" stopColor="#9b0012" />
              </linearGradient>
            </defs>

            <path d="M200 30L65 330L125 330L200 145L235 225L250 190L200 30Z" fill="url(#aims-left-face-full)" />
            <path d="M200 30L335 300L300 330L230 330L275 225L200 30Z" fill="url(#aims-right-face-full)" />
            <path d="M335 300L375 330L300 330L335 300Z" fill="url(#aims-right-bevel-full)" />
            <path d="M200 165L180 210L200 205L200 165Z" fill="#a80a18" />
            <path d="M200 165L220 210L200 205L200 165Z" fill="#ff2a3b" />
            <path d="M135 320C155 265 200 220 220 220C195 240 160 285 135 320Z" fill="url(#aims-swoosh-full)" />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col items-center">
          <div className="flex items-baseline tracking-tight">
            <span className="text-2xl sm:text-3xl font-black text-[#d90429] tracking-tight font-display">
              Aims
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#d90429] ml-1.5 font-display">
              Consultancy
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: subtextColor }}>
              <span>Education</span>
              <span className="text-[#d90429] font-black">|</span>
              <span>Immigration</span>
              <span className="text-[#d90429] font-black">|</span>
              <span>Travel</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal brand layout (Emblem on left, text on right)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 3D Emblem */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0">
        <svg
          viewBox="0 0 400 360"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aims-left-face-h" x1="200" y1="30" x2="65" y2="330" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff3344" />
              <stop offset="40%" stopColor="#e11124" />
              <stop offset="100%" stopColor="#9b0012" />
            </linearGradient>
            <linearGradient id="aims-right-face-h" x1="200" y1="30" x2="375" y2="330" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff2a3b" />
              <stop offset="45%" stopColor="#d90429" />
              <stop offset="100%" stopColor="#7a000a" />
            </linearGradient>
            <linearGradient id="aims-right-bevel-h" x1="335" y1="300" x2="375" y2="330" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a30919" />
              <stop offset="100%" stopColor="#550007" />
            </linearGradient>
            <linearGradient id="aims-swoosh-h" x1="135" y1="320" x2="220" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e50914" />
              <stop offset="50%" stopColor="#ff3848" />
              <stop offset="100%" stopColor="#9b0012" />
            </linearGradient>
          </defs>

          {/* Left Face */}
          <path d="M200 30L65 330L125 330L200 145L235 225L250 190L200 30Z" fill="url(#aims-left-face-h)" />
          {/* Right Face */}
          <path d="M200 30L335 300L300 330L230 330L275 225L200 30Z" fill="url(#aims-right-face-h)" />
          {/* Right 3D Beveled Corner */}
          <path d="M335 300L375 330L300 330L335 300Z" fill="url(#aims-right-bevel-h)" />
          {/* Center Arrowhead */}
          <path d="M200 165L180 210L200 205L200 165Z" fill="#a80a18" />
          <path d="M200 165L220 210L200 205L200 165Z" fill="#ff2a3b" />
          {/* Dynamic Swoosh */}
          <path d="M135 320C155 265 200 220 220 220C195 240 160 285 135 320Z" fill="url(#aims-swoosh-h)" />
        </svg>
      </div>

      {/* Brand Text Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight">
          <span className="text-xl sm:text-2xl font-black text-[#d90429] tracking-tight font-display">
            Aims
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#d90429] ml-1 font-display">
            Consultancy
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: subtextColor }}>
            <span>Education</span>
            <span className="text-[#d90429] font-black">|</span>
            <span>Immigration</span>
            <span className="text-[#d90429] font-black">|</span>
            <span>Travel</span>
          </div>
        )}
      </div>
    </div>
  );
};
