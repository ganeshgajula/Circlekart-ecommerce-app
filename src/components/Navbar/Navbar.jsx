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
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function Navbar() {
  const {
    state: { itemsInCart, itemsInWishlist },
  } = useData();

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="brand-logo" src={logo} alt="brand-logo" />
      </Link>

      <SearchBar />

      {/* <span className="search-field">
        {<SearchSvg />}
        <input
          type="text"
          className="search-bar"
          value={searchedKeyword}
          placeholder="Search for book, author and more"
          onChange={(e) =>
            productsDispatch({
              type: "SEARCH_PRODUCT",
              payload: e.target.value,
            })
          }
        />
      </span> */}

      <ul className="nav-list">
        <li className="nav-item mobile-search">
          <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
            <path
              d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5z"
              fill="currentColor"
            ></path>
          </svg>
        </li>
        <Link to="/products">
          <li className="nav-item">{<ProfileSvg />}</li>
        </Link>
        <Link to="/wishlist">
          <li className="nav-item badge-on-icon-container">
            {<OutlinedHeartSvg />}
            <span className="icon-badge blue ic-bdg-heart-top">
              {itemsInWishlist.length}
            </span>
          </li>
        </Link>
        <Link to="/cart">
          <li className="nav-item badge-on-icon-container">
            {<OutlinedCartSvg />}
            <span className="icon-badge blue ic-bdg-cart-top">
              {itemsInCart.length}
            </span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
