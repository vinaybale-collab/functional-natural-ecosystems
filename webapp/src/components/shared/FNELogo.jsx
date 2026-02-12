import React from 'react';

/**
 * FNE India logo - clean, prominent wordmark with ecosystem icon.
 * Uses font-heading (DM Sans) for "FNE India", font-sans for tagline.
 */
const IconMark = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" className="fill-current" />
    {/* FNE - ecosystem network icon */}
    <circle cx="16" cy="16" r="4" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="16" cy="16" r="1.5" fill="white" />
    <circle cx="16" cy="8" r="2" fill="white" fillOpacity="0.8" />
    <circle cx="24" cy="16" r="2" fill="white" fillOpacity="0.8" />
    <circle cx="16" cy="24" r="2" fill="white" fillOpacity="0.8" />
    <circle cx="8" cy="16" r="2" fill="white" fillOpacity="0.8" />
    <path d="M16 12v-2M20 16h2M16 20v2M12 16h-2" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" />
  </svg>
);

const FNELogo = ({ showIcon = true, compact = false, invert = false, className = '' }) => {
  const textColor = invert ? 'text-white' : 'text-gray-900';
  const taglineColor = invert ? 'text-white/80' : 'text-gray-500';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showIcon && (
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${invert ? 'bg-white text-black' : 'bg-black text-white'}`}>
          <IconMark />
        </div>
      )}
      <div className="flex flex-col">
        <span className={`font-heading font-bold ${compact ? 'text-lg' : 'text-2xl'} tracking-tight leading-none ${textColor}`}>
          FNE India
        </span>
        <span className={`text-[10px] font-sans font-semibold tracking-[0.2em] uppercase mt-1 ${taglineColor}`}>
          Ecosystem Intelligence
        </span>
      </div>
    </div>
  );
};

export default FNELogo;
