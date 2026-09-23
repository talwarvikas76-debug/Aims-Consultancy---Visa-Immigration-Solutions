import React, { useState } from 'react';

interface AimsLogoProps {
  className?: string;
  variant?: 'full' | 'emblem' | 'horizontal' | 'badge';
  theme?: 'dark' | 'light' | 'auto' | 'blue';
  showTagline?: boolean;
}

export const AimsLogo: React.FC<AimsLogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  showTagline = true,
}) => {
  const isDark = theme === 'dark';
  const [emblemError, setEmblemError] = useState(false);
  const [fullError, setFullError] = useState(false);

  // Standalone Emblem (Icon only) - Loads official cutout from Gemini generation
  if (variant === 'emblem') {
    return (
      <img
        src={emblemError ? '/aims-logo-mark.svg' : '/aims-logo-mark-transparent.png'}
        onError={() => setEmblemError(true)}
        alt="Aims Consultancy 3D Red Crest"
        className={`object-contain shrink-0 drop-shadow-sm transition-transform duration-200 ${className || 'w-10 h-10'}`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // Circular / Shield Official Stamp Badge
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white border border-red-200/90 shadow-xs ${className}`}>
        <img
          src={emblemError ? '/aims-logo-mark.svg' : '/aims-logo-mark-transparent.png'}
          onError={() => setEmblemError(true)}
          alt="Aims Consultancy Verified Crest"
          className="w-8 h-8 object-contain shrink-0 drop-shadow-xs"
          loading="lazy"
        />
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs font-black text-[#d90429] tracking-tight font-display">
            Aims Consultancy
          </span>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
            Official Advisory Desk
          </span>
        </div>
      </div>
    );
  }

  // Full Vertical Stack variant (The complete official artwork from the Gemini session)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Render the authentic high-resolution artwork directly from Gemini */}
        {!fullError ? (
          <div className="relative group overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm bg-white p-2">
            <img
              src="/aims-logo-new.png"
              onError={() => setFullError(true)}
              alt="Aims Consultancy Official Logo - Education | Immigration | Travel"
              className="w-56 sm:w-64 md:w-72 h-auto object-contain rounded-xl"
              loading="eager"
            />
          </div>
        ) : (
          /* High-fidelity vector fallback */
          <>
            <img
              src="/aims-logo-mark.svg"
              alt="Aims Consultancy 3D Red Crest"
              className="w-28 h-24 sm:w-32 sm:h-28 object-contain drop-shadow-md"
              loading="eager"
            />
            <div className="mt-3 relative flex items-baseline justify-center">
              <div className="text-2xl sm:text-3xl font-black text-[#d90429] tracking-tight font-display flex items-baseline">
                <span>A</span>
                <span className="relative inline-block mx-[0.5px]">
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[5.5px] border-b-[#d90429]" />
                  <span className="inline-block mt-0.5">ı</span>
                </span>
                <span>ms&nbsp;</span>
                <span>Consultancy</span>
              </div>
            </div>
            {showTagline && (
              <div className={`mt-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span>EDUCATION</span>
                <span className="text-[#d90429] font-black mx-2">|</span>
                <span>IMMIGRATION</span>
                <span className="text-[#d90429] font-black mx-2">|</span>
                <span>TRAVEL</span>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Horizontal variant (Standard Header & Navigation Bar)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Crest Emblem extracted from the Gemini design */}
      <img
        src={emblemError ? '/aims-logo-mark.svg' : '/aims-logo-mark-transparent.png'}
        onError={() => setEmblemError(true)}
        alt="Aims Consultancy Logo"
        className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0 drop-shadow-xs"
        loading="eager"
      />

      {/* Brand Typography & Tagline */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline">
          <span className="text-xl sm:text-2xl font-black text-[#d90429] tracking-tight font-display flex items-baseline">
            <span>A</span>
            {/* The signature upward-pointing arrow accent on the 'i' */}
            <span className="relative inline-block mx-[0.5px]">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4.5px] border-b-[#d90429]" />
              <span className="inline-block mt-0.5">ı</span>
            </span>
            <span>ms&nbsp;</span>
            <span className="tracking-tight">Consultancy</span>
          </span>
        </div>

        {showTagline && (
          <div className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-1.5 -mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <span>Education</span>
            <span className="text-[#d90429] font-black text-[9px]">•</span>
            <span>Immigration</span>
            <span className="text-[#d90429] font-black text-[9px]">•</span>
            <span>Travel</span>
          </div>
        )}
      </div>
    </div>
  );
};
