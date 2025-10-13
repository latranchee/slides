import React from 'react';
import { useStyles } from '../../contexts/StyleContext';

export const H1 = ({ children, className = '', style = {} }) => {
  const styles = useStyles();
  return (
    <h1
      className={`leading-tight ${className}`}
      style={{ ...styles.h1, ...style }}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ children, className = '', style = {} }) => {
  const styles = useStyles();
  return (
    <h2
      className={`leading-snug ${className}`}
      style={{ ...styles.h2, ...style }}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ children, className = '', style = {} }) => {
  const styles = useStyles();
  return (
    <h3
      className={className}
      style={{ ...styles.h3, ...style }}
    >
      {children}
    </h3>
  );
};

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
