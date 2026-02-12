import React from 'react';

/**
 * ComparisonBar — side-by-side score bars for two landscapes.
 * Used in the Comparison page detailed breakdown.
 */
const ComparisonBar = ({
  value1,
  value2,
  label1,
  label2,
  color1,
  color2,
  maxValue = 10,
  children1,
  children2,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{label1}</span>
          <span className="font-mono text-2xl font-semibold" style={{ color: color1 }}>{value1}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(value1 / maxValue) * 100}%`, backgroundColor: color1 }}
          ></div>
        </div>
        {children1 && <div className="text-xs text-gray-500 leading-relaxed">{children1}</div>}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{label2}</span>
          <span className="font-mono text-2xl font-semibold" style={{ color: color2 }}>{value2}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(value2 / maxValue) * 100}%`, backgroundColor: color2 }}
          ></div>
        </div>
        {children2 && <div className="text-xs text-gray-500 leading-relaxed">{children2}</div>}
      </div>
    </div>
  );
};

export default ComparisonBar;
