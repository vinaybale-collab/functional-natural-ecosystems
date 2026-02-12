import React from 'react';
import { clsx } from 'clsx';
import { getScoreColor } from '../../utils/scoring';

const ScoreBadge = ({ score, size = 'md' }) => {
  const color = getScoreColor(score);
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg font-bold',
    xl: 'w-16 h-16 text-2xl font-bold',
  };

  return (
    <div 
      className={clsx(
        "rounded-md flex items-center justify-center text-white shadow-sm font-bold ring-1 ring-white/10",
        sizeClasses[size]
      )}
      style={{ 
        backgroundColor: color,
        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
      }}
    >
      {score.toFixed(1)}
    </div>
  );
};

export default ScoreBadge;