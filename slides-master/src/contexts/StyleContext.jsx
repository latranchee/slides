import React, { createContext, useContext } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ styles, children }) => {
  return (
    <StyleContext.Provider value={styles}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyles = () => {
  const context = useContext(StyleContext);
  if (!context) {
    // Return default styles if context is not available
    return {
      h1: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '3.75rem',
        fontWeight: '700',
        color: '#1a1a1a'
      },
      h2: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '2.25rem',
        fontWeight: '600',
        color: '#1a1a1a'
      },
      h3: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '1.875rem',
        fontWeight: '500',
        color: '#1a1a1a'
      }
    };
  }
  return context;
};
