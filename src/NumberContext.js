import React, { createContext, useState } from 'react';

export const NumberContext = createContext();

export const NumberProvider = ({ children }) => {
  const [number, setNumber] = useState('');

  return (
    <NumberContext.Provider value={{ number, setNumber }}>
      {children}
    </NumberContext.Provider>
  );
};