import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authorization"];
};

const setupAuthExceptionHandler = (logoutUser, navigate) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logoutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const loginUser = (token) => {
    setToken(token);
    setupAuthHeaderForServiceCalls(token);
  };

  useEffect(
    () => {
      const { userId, username, token } = JSON.parse(
        localStorage?.getItem("userInfo")
      ) || { userId: null, username: null, token: null };
      console.log(token);
      userId && setUserId(userId);
      username && setUsername(username);
      token && loginUser(token);
      setupAuthExceptionHandler(logoutUser, navigate);
    },
    //eslint-disable-next-line
    []
  );

  const logoutUser = () => {
    localStorage?.removeItem("userInfo");
    setUserId("");
    setUsername("");
    loginUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        token,
        setUserId,
        setUsername,
        setToken,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
