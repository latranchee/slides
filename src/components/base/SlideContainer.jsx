import React from 'react';

const SlideContainer = ({ children, className = '', background = 'bg-white' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-neutral-light">
      <div
        className={`w-full max-w-7xl aspect-[16/9] ${background} rounded-xl shadow-2xl overflow-hidden ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideContainer;
