import React from 'react';

/**
 * FNE India logo - clean, prominent wordmark with ecosystem icon.
 * Uses font-heading (DM Sans) for "FNE India", font-sans for tagline.
 */
const IconMark = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4.8c5.2 0 9.4 4.2 9.4 9.4 0 7.1-9.4 13-9.4 13S6.6 21.3 6.6 14.2C6.6 9 10.8 4.8 16 4.8Z" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M11 15.8c2.2-.7 3.8-1.9 5-4.2 1.2 2.1 2.8 3.3 5 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="16" cy="14.3" r="1.4" fill="currentColor" />
  </svg>
);

const FNELogo = ({ showIcon = true, compact = false, invert = false, className = '' }) => {
  const textColor = invert ? 'text-white' : 'text-gray-900';
  const taglineColor = invert ? 'text-white/80' : 'text-gray-500';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showIcon && (
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${invert ? 'bg-white/15 text-white border-white/30' : 'bg-gradient-to-br from-emerald-50 to-lime-100 text-emerald-700 border-emerald-200'}`}>
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
