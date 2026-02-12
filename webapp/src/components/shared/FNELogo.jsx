import React from 'react';

/**
 * FNE India logo - clean, prominent wordmark with ecosystem icon.
 * Uses font-heading (DM Sans) for "FNE India", font-sans for tagline.
 */
const IconMark = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="4.5" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="16" cy="16" r="1.8" fill="currentColor" />
    <circle cx="16" cy="7.5" r="2.1" fill="currentColor" fillOpacity="0.9" />
    <circle cx="24.5" cy="16" r="2.1" fill="currentColor" fillOpacity="0.9" />
    <circle cx="16" cy="24.5" r="2.1" fill="currentColor" fillOpacity="0.9" />
    <circle cx="7.5" cy="16" r="2.1" fill="currentColor" fillOpacity="0.9" />
    <path d="M16 10.8v-1.2M21.2 16h1.2M16 21.2v1.2M10.8 16H9.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

const FNELogo = ({ showIcon = true, compact = false, invert = false, className = '' }) => {
  const textColor = invert ? 'text-white' : 'text-gray-900';
  const taglineColor = invert ? 'text-white/80' : 'text-gray-500';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showIcon && (
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${invert ? 'bg-white text-black border-white/20' : 'bg-black text-white border-black'}`}>
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
