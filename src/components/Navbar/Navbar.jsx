import React from "react";
import logo from "../../assets/logo.png";
import "../Navbar/Navbar.css";
import {
  ProfileSvg,
  OutlinedHeartSvg,
  OutlinedCartSvg,
  SearchSvg,
} from "../Reusable-Svgs/svgs";

export function Navbar() {
  return (
    <nav className="navbar">
      <img className="brand-logo" src={logo} alt="brand-logo" />

      <span className="search-field">
        {<SearchSvg />}
        <input
          type="text"
          className="search-bar"
          placeholder="Search for book, author and more"
        />
      </span>

      <ul className="nav-list">
        <li className="nav-item mobile-search">
          <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path
              d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5z"
              fill="currentColor"
            ></path>
          </svg>
        </li>
        <li className="nav-item">{<ProfileSvg />}</li>
        <li className="nav-item">{<OutlinedHeartSvg />}</li>
        <li className="nav-item">{<OutlinedCartSvg />}</li>
      </ul>
    </nav>
  );
}
