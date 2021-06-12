import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";
import "./Login.css";

export const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isUserLoggedIn, setLogin, setUserId, setUsername } = useAuth();
  const { dataDispatch } = useData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    const { data, status } = await axios({
      method: "POST",
      url: "https://api-circlekart.herokuapp.com/users/authenticate",
      headers: { email: email, password: password },
    });

    console.log(data);
    if (status === 200) {
      setLogin(true);
      setUserId(data.userDetails.userId);
      setUsername(data.userDetails.firstname);
      localStorage?.setItem(
        "userInfo",
        JSON.stringify({
          isUserLoggedIn: true,
          username: data.userDetails.firstname,
          userId: data.userDetails.userId,
        })
      );
      navigate(state?.from ? state.from : "/");
    }
  };

  const logoutHandler = () => {
    localStorage?.removeItem("userInfo");
    setLogin(false);
    setUserId("");
    setUsername("");
    dataDispatch({ type: "RESET_APP_ON_LOGOUT" });
    navigate("/");
  };

  return (
    <div>
      {!isUserLoggedIn ? (
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={loginHandler}>
            <input
              type="email"
              className="input-area"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="input-area"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn-sm btn-primary w-100">
              Login
            </button>
          </form>
          <p>
            Don't have an account ?{" "}
            <Link style={{ color: "inherit" }} to="/signup">
              Sign up Now
            </Link>
          </p>
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
