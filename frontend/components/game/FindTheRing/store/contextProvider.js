import React, { createContext } from 'react';

export const Context = createContext();

const ContextProvider = ({ state, dispatch, children }) => {
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default ContextProvider;
