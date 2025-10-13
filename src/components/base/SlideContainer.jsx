import React from 'react';

const SlideContainer = ({ children, className = '', background = 'bg-white', isFullscreen = false }) => {
  return (
    <div className={isFullscreen ? 'w-full h-full' : 'flex items-center justify-center min-h-screen p-8 bg-neutral-light'}>
      <div
        className={isFullscreen
          ? `w-full h-full ${background} overflow-hidden ${className}`
          : `w-full max-w-7xl aspect-[16/9] ${background} rounded-xl shadow-2xl overflow-hidden ${className}`
        }
      >
        {children}
      </div>
    </div>
  );
};

export default SlideContainer;
