import React from 'react';

interface SenaLogoProps {
  className?: string;
  size?: number;
  color?: string; // default official SENA green #39A900
  showText?: boolean;
  scale?: number; // default 0.7 (70% size as requested)
}

/**
 * Official SENA (Servicio Nacional de Aprendizaje) Logo Symbol.
 * Vectorized with exact institutional geometry:
 * - Circular head of the apprentice
 * - Dynamic forward torso and outstretched arms forming the knowledge chevron
 * - Forward walking stride lines
 * - Scaled to 70% by default as requested by the user
 */
export const SenaLogo: React.FC<SenaLogoProps> = ({
  className = '',
  size = 40,
  color = '#39A900',
  showText = false,
  scale = 0.7 // 70% size
}) => {
  // Base viewBox is 100x100
  const effectiveSize = Math.round(size * scale);

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width={effectiveSize}
        height={effectiveSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200"
      >
        {/* Head of the apprentice */}
        <circle cx="50" cy="18" r="9.5" fill={color} />

        {/* Dynamic torso, outstretched arms and upper chevron */}
        <path
          d="M50 33 L20 48 L25.5 57 L50 44 L74.5 57 L80 48 Z"
          fill={color}
        />

        {/* Lower dynamic path / legs representing the forward stride */}
        <path
          d="M37 56 L15 67 L20 76 L43 64 Z"
          fill={color}
        />
        <path
          d="M50 54 L36 94 L46 94 L57 60 Z"
          fill={color}
        />
        <path
          d="M55 58 L77 70 L83 61 L61 50 Z"
          fill={color}
        />
      </svg>

      {showText && (
        <span 
          className="font-black tracking-widest text-center mt-0.5 uppercase"
          style={{ fontSize: `${Math.max(10, Math.round(effectiveSize * 0.32))}px`, color }}
        >
          SENA
        </span>
      )}
    </div>
  );
};
