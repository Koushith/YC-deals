//@ts-nocheck
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
