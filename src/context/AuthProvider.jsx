import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
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
  const {
    userId: savedUserId,
    username: savedUsername,
    token: savedToken,
  } = JSON.parse(localStorage?.getItem("userInfo")) || {
    userId: null,
    username: null,
    token: null,
  };
  const [userId, setUserId] = useState(savedUserId);
  const [username, setUsername] = useState(savedUsername);
  const [token, setToken] = useState(savedToken);
  const navigate = useNavigate();

  useEffect(
    () => {
      setupAuthExceptionHandler(logoutUser, navigate);
    },
    //eslint-disable-next-line
    []
  );

  const loginUser = (token) => {
    setToken(token);
    setupAuthHeaderForServiceCalls(token);
  };

  const logoutUser = () => {
    localStorage?.removeItem("userInfo");
    setUserId(null);
    setUsername(null);
    loginUser(null);
  };

  token && setupAuthHeaderForServiceCalls(token);

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
