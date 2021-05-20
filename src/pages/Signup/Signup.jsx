import React, { useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { signupReducer } from "../../reducer/signupReducer";
import { useAuth } from "../../context/AuthProvider";
import "./Signup.css";

export const Signup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [signupState, dispatch] = useReducer(signupReducer, initialState);

  const { setLogin, setUsername, setUserId } = useAuth();

  const signUpHandler = async (e) => {
    e.preventDefault();
    const { data, status } = await axios.post(
      "https://api-circlekart.herokuapp.com/users",
      {
        firstname: signupState.firstname,
        lastname: signupState.lastname,
        email: signupState.email,
        password: signupState.password,
      }
    );
    if (status === 201) {
      console.log(data);
      setLogin(true);
      setUsername(data.savedUser.firstname);
      setUserId(data.savedUser._id);
      localStorage?.setItem(
        "userInfo",
        JSON.stringify({
          isUserLoggedIn: true,
          username: data.savedUser.firstname,
          userId: data.savedUser._id,
        })
      );
      navigate(state?.from ? state.from : "/");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={signUpHandler}>
        <input
          type="text"
          className="input-area"
          placeholder="Enter first name"
          value={signupState.firstname}
          onChange={(e) =>
            dispatch({ type: "FIRST_NAME", payload: e.target.value })
          }
        />

        <input
          type="text"
          className="input-area"
          placeholder="Enter last name"
          value={signupState.lastname}
          onChange={(e) =>
            dispatch({ type: "LAST_NAME", payload: e.target.value })
          }
        />

        <input
          type="email"
          className="input-area"
          placeholder="Enter email"
          value={signupState.email}
          onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })}
        />

        <input
          type="password"
          className="input-area"
          placeholder="set password"
          value={signupState.password}
          onChange={(e) =>
            dispatch({ type: "PASSWORD", payload: e.target.value })
          }
        />
        <button type="submit" className="btn-sm btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};
