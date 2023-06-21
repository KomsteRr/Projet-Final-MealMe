import React, { createContext, useState } from "react";

export const VariableContext = createContext();

export const VariableProvider = ({ children }) => {
    const [scrollIndex, setScrollIndex] = useState(0);
  
    return (
      <VariableContext.Provider value={{ scrollIndex, setScrollIndex }}>
        {children}
      </VariableContext.Provider>
    );
  };