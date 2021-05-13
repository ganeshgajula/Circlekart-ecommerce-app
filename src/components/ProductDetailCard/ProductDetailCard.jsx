import React from "react";
import "./ProductDetailCard.css";
import { Navbar } from "../Navbar/Navbar";
import { isItemPresent } from "../utils/utils";
import { useData } from "../../context/DataProvider";
import { Link } from "react-router-dom";

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
              {!isItemPresent(itemsInCart, _id) ? (
                <button
                  className="btn-primary btn-md"
                  onClick={() =>
                    dataDispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        _id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        fastDelivery,
                        quantity: 1,
                      },
                    })
                  }
                  disabled={!inStock ? true : false}
                  style={{ cursor: !inStock ? "not-allowed" : "pointer" }}
                >
                  Add to Cart
                </button>
              ) : null}

              {isItemPresent(itemsInCart, _id) ? (
                <Link to="/cart">
                  <button className="btn-primary btn-md">Go to Cart</button>
                </Link>
              ) : null}
            </span>
            <span>
              {!isItemPresent(itemsInWishlist, _id) ? (
                <button
                  className="btn-outline btn-md"
                  onClick={() =>
                    dataDispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: {
                        _id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        fastDelivery,
                      },
                    })
                  }
                >
                  Add to Wishlist
                </button>
              ) : null}

              {isItemPresent(itemsInWishlist, _id) ? (
                <button className="btn-outline btn-md">Wishlisted</button>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
