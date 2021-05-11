import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "./Login.css";

export const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isUserLoggedIn, loginUserWithCredentials, setLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {
    loginUserWithCredentials(username, password);
    navigate(state?.from ? state.from : "/");
  }

  function logoutHandler() {
    localStorage.removeItem("login");
    setLogin(false);
    navigate("/");
  }

  return (
    <div>
      {!isUserLoggedIn ? (
        <div className="login-container">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              className="input-area"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="input-area"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <button onClick={loginHandler} className="btn-sm btn-primary">
            Login
          </button>
        </div>
      ) : (
        <div className="login-container">
          <h1>Logout</h1>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </div>
  );
};
