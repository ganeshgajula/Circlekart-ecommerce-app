import React, { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage.getItem("userInfo"));
    loginStatus?.isUserLoggedIn && setLogin(true);
    loginStatus?.userId && setUserId(loginStatus.userId);
    loginStatus?.username && setUsername(loginStatus.username);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        userId,
        username,
        setLogin,
        setUserId,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
