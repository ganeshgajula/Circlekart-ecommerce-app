import React from "react";
import "./ProductDetailCard.css";
import { Navbar } from "../Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import {
  addProductToCart,
  addProductToWishlist,
  isItemPresent,
} from "../utils/utils";

export const ProductDetailCard = ({
  _id,
  name,
  image,
  price,
  productName,
  inStock,
  level,
  fastDelivery,
}) => {
  const {
    state: { itemsInCart, itemsInWishlist },
    dataDispatch,
  } = useData();

  const { userId } = useAuth();

  return (
    <>
      <Navbar />
      <div className="product-detail-card">
        <img src={image} alt="product" className="product-image" />
        <div className="product-details-container">
          <div className="product-details">
            <h2 className="heading-md">{name}</h2>
            <p className="product-price">Rs. {price}</p>
            <p>
              {fastDelivery
                ? "fast delivery available"
                : "Delivered within 3 days"}
            </p>
            <p>Level: {level}</p>
            <p>{inStock ? "Currently in stock" : "Currently out of stock"}</p>
          </div>
          <div>
            <span className="product-action-btn">
              {!isItemPresent(itemsInCart, _id) && (
                <button
                  className="btn-primary btn-md"
                  onClick={() => addProductToCart(_id, dataDispatch, userId)}
                  disabled={!inStock ? true : false}
                  style={{ cursor: !inStock ? "not-allowed" : "pointer" }}
                >
                  Add to Cart
                </button>
              )}

              {isItemPresent(itemsInCart, _id) && (
                <Link to="/cart">
                  <button className="btn-primary btn-md">Go to Cart</button>
                </Link>
              )}
            </span>
            <button
              className="btn-outline btn-md"
              onClick={() =>
                !isItemPresent(itemsInWishlist, _id) &&
                addProductToWishlist(_id, dataDispatch, userId)
              }
            >
              {!isItemPresent(itemsInWishlist, _id)
                ? "Add to Wishlist"
                : "Wishlisted"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
