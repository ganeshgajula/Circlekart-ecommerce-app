import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signupReducer } from "../../reducer/signupReducer";

import "./Signup.css";
import { toast } from "react-toastify";

export const Signup = () => {
  const navigate = useNavigate();

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [signupState, dispatch] = useReducer(signupReducer, initialState);

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const { status } = await axios.post(
        "https://api-circlekart.herokuapp.com/users/signup",
        {
          firstname: signupState.firstname,
          lastname: signupState.lastname,
          email: signupState.email,
          password: signupState.password,
        }
      );
      if (status === 201) {
        toast.success("Sign up successful. Kindly login!", {
          position: "bottom-center",
          autoClose: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 3500,
      });
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
        <button type="submit" className="btn-sm btn-primary w-100">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};
