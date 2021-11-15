import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import "./Login.css";

export const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setUserId, setUsername, setLastname, token, loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guestLogin, setGuestLogin] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = !guestLogin
        ? await axios({
            method: "POST",
            url: "https://api-circlekart.herokuapp.com/users/login",
            headers: { email: email, password: password },
          })
        : await axios({
            method: "POST",
            url: "https://api-circlekart.herokuapp.com/users/login",
            headers: { email: "ganesh@gmail.com", password: "ganesh" },
          });

      console.log(data);
      if (status === 200) {
        setUserId(data.userDetails.userId);
        setUsername(data.userDetails.firstname);
        setLastname(data.userDetails.lastname);
        loginUser(data.userDetails.token);
        toast.success("Login successful!!", {
          position: "bottom-center",
          autoClose: 2000,
        });
        localStorage?.setItem(
          "userInfo",
          JSON.stringify({
            username: data.userDetails.firstname,
            lastname: data.userDetails.lastname,
            userId: data.userDetails.userId,
            token: data.userDetails.token,
          })
        );
        navigate(state?.from ? state.from : "/");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 3500,
      });
    }
  };

  const allFieldsEntered = email && password;

  return (
    <div>
      {!token && (
        <div className="login-container">
          <h1 className="login-heading">Log in to Circlekart</h1>
          <form onSubmit={loginHandler} className="login-form">
            <input
              type="email"
              className="input-area w-100"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="input-area w-100"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="btn-sm btn-primary w-100"
              style={{ opacity: !allFieldsEntered && "0.6" }}
              disabled={!allFieldsEntered && true}
            >
              Login
            </button>
            <button
              className="btn-sm btn-primary w-100"
              onClick={() => setGuestLogin(true)}
            >
              Login as Guest
            </button>
          </form>
          <p>
            <span className="signup-msg">Don't have an account?</span>
            <Link style={{ color: "inherit" }} to="/signup">
              Sign up Now
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};
