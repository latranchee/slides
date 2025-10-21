import React from 'react';
import { ArrowRight } from 'lucide-react';

const ComparisonBar = ({ before, after, label, unit = '', color = 'accent' }) => {
  const colorClasses = {
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    primary: 'bg-primary',
  };

  const textColorClasses = {
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    primary: 'text-primary',
  };

  return (
    <div className="space-y-4">
      {label && <div className="text-lg font-semibold text-neutral-dark">{label}</div>}

      <div className="flex items-center gap-6">
        {/* Before */}
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-2">Avant</div>
          <div className="bg-gray-200 rounded-lg p-4 text-center">
            <div className="text-3xl font-mono font-bold text-gray-700">
              {before}{unit}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-8 h-8 text-gray-400 flex-shrink-0" />

        {/* After */}
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-2">Après</div>
          <div className={`${colorClasses[color]} rounded-lg p-4 text-center`}>
            <div className="text-3xl font-mono font-bold text-white">
              {after}{unit}
            </div>
          </div>
        </div>
      </div>

      {/* Difference indicator */}
      <div className="text-center">
        <span className={`text-xl font-bold ${textColorClasses[color]}`}>
          {typeof before === 'number' && typeof after === 'number'
            ? `${after > before ? '+' : ''}${((after - before) / before * 100).toFixed(1)}%`
            : ''}
        </span>
      </div>
    </div>
  );
};

export default ComparisonBar;
