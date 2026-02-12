import React from 'react';

/**
 * ScoreDisplay — authoritative score presentation.
 * Sizes: hero (detail page main), default (cards), compact (list/comparison), inline (tables)
 */
const sizes = {
  hero:    { num: 'text-6xl', suffix: 'text-lg', label: 'text-sm', dot: 'w-3 h-3' },
  default: { num: 'text-4xl', suffix: 'text-sm', label: 'text-xs', dot: 'w-2.5 h-2.5' },
  compact: { num: 'text-3xl', suffix: 'text-xs', label: 'text-[10px]', dot: 'w-2 h-2' },
  inline:  { num: 'text-2xl', suffix: 'text-xs', label: 'text-[10px]', dot: 'w-2 h-2' },
};

const ScoreDisplay = ({ score, label, color, size = 'default', className = '' }) => {
  const s = sizes[size] || sizes.default;

  return (
    <div className={className}>
      <div className="flex items-baseline gap-1">
        <span className={`font-mono ${s.num} font-semibold text-gray-900`}>{score}</span>
        <span className={`font-sans font-normal text-gray-400 ${s.suffix}`}>/10</span>
      </div>
      {label && (
        <div className="flex items-center gap-2 mt-1.5">
          <div className={`${s.dot} rounded-full`} style={{ backgroundColor: color }}></div>
          <span
            className={`font-heading font-semibold uppercase tracking-wider ${s.label}`}
            style={{ color }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;
