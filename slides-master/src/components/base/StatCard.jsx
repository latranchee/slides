import React from 'react';
import { Number, Label } from './Typography';

const StatCard = ({ value, label, description, color = 'accent', size = 'large' }) => {
  const colorClasses = {
    accent: 'text-accent border-accent',
    success: 'text-success border-success',
    primary: 'text-primary border-primary',
    warning: 'text-warning border-warning',
  };

  const sizeClasses = {
    small: 'text-4xl',
    medium: 'text-6xl',
    large: 'text-7xl md:text-8xl',
    huge: 'text-8xl md:text-9xl',
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-accent transition-all">
      <div className={`font-mono font-bold ${colorClasses[color]} ${sizeClasses[size]}`}>
        {value}
      </div>
      {label && (
        <Label className="mt-4 block">
          {label}
        </Label>
      )}
      {description && (
        <p className="mt-2 text-neutral-dark text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
