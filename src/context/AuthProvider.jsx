import React, { useContext, createContext, useState, useEffect } from "react";

const users = {
  username: "admin",
  password: "ganesh",
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage.getItem("login"));
    loginStatus?.isUserLoggedIn && setLogin(true);
  }, []);

  function loginUserWithCredentials(username, password) {
    if (users.username === username && users.password === password) {
      setLogin(true);
      localStorage.setItem("login", JSON.stringify({ isUserLoggedIn: true }));
    }
  }

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, loginUserWithCredentials, setLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
