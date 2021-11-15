import React from "react";
import { SuccessCheck } from "../../assets/svgs/SuccessCheck";
import { useAuth } from "../../context/AuthProvider";
import "./PaymentSuccess.css";
import { Link } from "react-router-dom";
import { SuccessCheckMin } from "../../assets/svgs/SuccessCheckMin";
import { NavbarWithoutSearch } from "../../components/Navbar/NavbarWithoutSearch";

export const PaymentSuccess = () => {
  const { username } = useAuth();

  return (
    <>
      <NavbarWithoutSearch />
      <div className="success-container">
        <div className="success-title-container">
          <h1 className="success-title">Payment Successful</h1>
          <span className="success-lg">
            <SuccessCheck />
          </span>
          <span className="success-sm">
            <SuccessCheckMin />
          </span>
        </div>
        <p className="user-greet">Hi {username},</p>
        <p className="success-msg">
          Order Successfully placed. We will try to deliver it in 3-4 working
          days.
        </p>
        <p className="success-msg">Thank you for shopping with us!! 😄</p>
        <Link to="/products">
          <button className="btn-sm btn mt-1">Continue Shopping</button>
        </Link>
      </div>
    </>
  );
};
