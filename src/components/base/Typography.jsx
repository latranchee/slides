import React from 'react';

export const H1 = ({ children, className = '' }) => (
  <h1 className={`text-5xl md:text-6xl font-bold text-primary leading-tight ${className}`}>
    {children}
  </h1>
);

export const H2 = ({ children, className = '' }) => (
  <h2 className={`text-3xl md:text-4xl font-semibold text-primary leading-snug ${className}`}>
    {children}
  </h2>
);

export const H3 = ({ children, className = '' }) => (
  <h3 className={`text-2xl md:text-3xl font-medium text-primary ${className}`}>
    {children}
  </h3>
);

export const Body = ({ children, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-base md:text-lg',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl',
  };

  return (
    <p className={`${sizeClasses[size]} text-neutral-dark leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

export const Quote = ({ children, author, className = '' }) => (
  <div className={`border-l-4 border-accent pl-6 py-4 ${className}`}>
    <blockquote className="text-2xl md:text-3xl font-medium text-primary leading-relaxed italic">
      "{children}"
    </blockquote>
    {author && (
      <cite className="block mt-4 text-lg text-neutral-dark not-italic">— {author}</cite>
    )}
  </div>
);

export const Number = ({ children, className = '' }) => (
  <span className={`font-mono text-accent font-bold ${className}`}>
    {children}
  </span>
);

export const Label = ({ children, className = '' }) => (
  <span className={`text-sm md:text-base uppercase tracking-wider font-semibold text-secondary ${className}`}>
    {children}
  </span>
);
