import React from "react";
import logo from "../../assets/transparent-logo.png";
import "./Navbar.css";
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

  const { username, token } = useAuth();

  return (
    <nav className="navbar-area">
      <div className="navbar">
        <Link to="/">
          <img className="brand-logo" src={logo} alt="brand-logo" />
        </Link>

        <SearchBar />

        <ul className="nav-list">
          {!token && (
            <Link to="/login">
              <li className="btn btn-sm">Login</li>
            </Link>
          )}
          {token && (
            <Link to="/profile">
              <div className="action-container">
                <li className="nav-item">{<ProfileSvg />}</li>
                <span className="user-title">{`Hi, ${username}`}</span>
              </div>
            </Link>
          )}
          <Link to="/wishlist">
            <li className="nav-item badge-on-icon-container">
              {<OutlinedHeartSvg />}
              {token && itemsInWishlist.length > 0 && (
                <span className="icon-badge blue ic-badge-heart-top">
                  {itemsInWishlist.length}
                </span>
              )}
            </li>
          </Link>
          <Link to="/cart">
            <li className="nav-item badge-on-icon-container">
              {<OutlinedCartSvg />}
              {token && itemsInCart.length > 0 && (
                <span className="icon-badge blue ic-badge-cart-top">
                  {itemsInCart.length}
                </span>
              )}
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
            {!token && (
              <Link to="/login">
                <li className="btn btn-xs">Login</li>
              </Link>
            )}
            {token && (
              <Link to="/profile">
                <div className="action-container">
                  <li className="nav-item">{<ProfileSvg />}</li>
                  <span className="user-title">
                    {username && `Hi, ${username}`}
                  </span>
                </div>
              </Link>
            )}
            <Link to="/wishlist">
              <li className="nav-item badge-on-icon-container">
                {<OutlinedHeartSvg />}
                {token && itemsInWishlist.length > 0 && (
                  <span className="icon-badge blue ic-badge-heart-top">
                    {itemsInWishlist.length}
                  </span>
                )}
              </li>
            </Link>
            <Link to="/cart">
              <li className="nav-item badge-on-icon-container">
                {<OutlinedCartSvg />}
                {token && itemsInCart.length > 0 && (
                  <span className="icon-badge blue ic-badge-cart-top">
                    {itemsInCart.length}
                  </span>
                )}
              </li>
            </Link>
          </ul>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}
