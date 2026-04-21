import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 48, text: 'text-2xl' },
    lg: { icon: 64, text: 'text-3xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Building/Structure base */}
        <rect x="12" y="28" width="16" height="28" rx="2" fill="url(#gradient1)" />
        <rect x="24" y="20" width="16" height="36" rx="2" fill="url(#gradient2)" />
        <rect x="36" y="12" width="16" height="44" rx="2" fill="url(#gradient3)" />
        
        {/* Growth arrows */}
        <path
          d="M20 24L20 16M20 16L16 20M20 16L24 20"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 16L32 8M32 8L28 12M32 8L36 12"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 8L44 2M44 2L40 6M44 2L48 6"
          stroke="#15803d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Community circles */}
        <circle cx="20" cy="36" r="3" fill="white" fillOpacity="0.8" />
        <circle cx="32" cy="32" r="3" fill="white" fillOpacity="0.8" />
        <circle cx="44" cy="28" r="3" fill="white" fillOpacity="0.8" />
        
        <defs>
          <linearGradient id="gradient1" x1="12" y1="28" x2="28" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#846358" />
            <stop offset="1" stopColor="#43302b" />
          </linearGradient>
          <linearGradient id="gradient2" x1="24" y1="20" x2="40" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22c55e" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="gradient3" x1="36" y1="12" x2="52" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#16a34a" />
            <stop offset="1" stopColor="#14532d" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${currentSize.text} gradient-text leading-tight`}>
            KUJENGA
          </span>
          {size === 'lg' && (
            <span className="text-xs text-[var(--text-muted)]">Build Skills. Earn Daily.</span>
          )}
        </div>
      )}
    </div>
  );
};

export const Favicon: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="12" y="28" width="16" height="28" rx="2" fill="#846358" />
    <rect x="24" y="20" width="16" height="36" rx="2" fill="#22c55e" />
    <rect x="36" y="12" width="16" height="44" rx="2" fill="#16a34a" />
    <circle cx="20" cy="36" r="3" fill="white" fillOpacity="0.8" />
    <circle cx="32" cy="32" r="3" fill="white" fillOpacity="0.8" />
    <circle cx="44" cy="28" r="3" fill="white" fillOpacity="0.8" />
  </svg>
);
