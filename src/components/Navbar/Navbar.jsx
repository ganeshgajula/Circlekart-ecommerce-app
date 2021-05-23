import React from "react";
import logo from "../../assets/logo.png";
import "../Navbar/Navbar.css";
import {
  ProfileSvg,
  OutlinedHeartSvg,
  OutlinedCartSvg,
} from "../Reusable-Svgs/svgs";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function Navbar() {
  const {
    state: { itemsInCart, itemsInWishlist },
  } = useData();

  const { isUserLoggedIn, username } = useAuth();

  return (
    <nav className="navbar-area">
      <div className="navbar">
        <Link to="/">
          <img className="brand-logo" src={logo} alt="brand-logo" />
        </Link>

        <ul className="nav-links">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#000",
            }}
          >
            <li className="nav-link">Home</li>
          </Link>
        </ul>

        <SearchBar />

        <ul className="nav-list">
          <Link to="/login">
            <div className="action-container">
              <li className="nav-item">{<ProfileSvg />}</li>
              <span className="user-title">
                {username ? `Hi, ${username}` : null}
              </span>
            </div>
          </Link>
          <Link to="/wishlist">
            <li className="nav-item badge-on-icon-container">
              {<OutlinedHeartSvg />}
              <span className="icon-badge blue ic-badge-heart-top">
                {isUserLoggedIn ? itemsInWishlist.length : 0}
              </span>
            </li>
          </Link>
          <Link to="/cart">
            <li className="nav-item badge-on-icon-container">
              {<OutlinedCartSvg />}
              <span className="icon-badge blue ic-badge-cart-top">
                {isUserLoggedIn ? itemsInCart.length : 0}
              </span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="mobile-navbar">
        <div className="user-action-container">
          <Link to="/">
            <img className="brand-logo" src={logo} alt="brand-logo" />
          </Link>
          <ul className="nav-list">
            <Link to="/login">
              <div className="action-container">
                <li className="nav-item">{<ProfileSvg />}</li>
                <span className="user-title">
                  {username ? `Hi, ${username}` : null}
                </span>
              </div>
            </Link>
            <Link to="/wishlist">
              <li className="nav-item badge-on-icon-container">
                {<OutlinedHeartSvg />}
                <span className="icon-badge blue ic-badge-heart-top">
                  {isUserLoggedIn ? itemsInWishlist.length : 0}
                </span>
              </li>
            </Link>
            <Link to="/cart">
              <li className="nav-item badge-on-icon-container">
                {<OutlinedCartSvg />}
                <span className="icon-badge blue ic-badge-cart-top">
                  {isUserLoggedIn ? itemsInCart.length : 0}
                </span>
              </li>
            </Link>
          </ul>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}
