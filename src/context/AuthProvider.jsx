import React, { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage.getItem("userInfo"));
    loginStatus?.isUserLoggedIn && setLogin(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
