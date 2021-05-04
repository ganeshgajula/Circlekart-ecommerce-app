import React from "react";
import { Link } from "react-router-dom";

export const EmptyCart = () => (
  <div className="empty-cart-area">
    <h1>Cart is Empty</h1>
    <p className="empty-cart-msg1">
      There's nothing in your cart. Let's add some items.
    </p>
    <Link to="/wishlist">
      <button className="btn-outline btn-sm">ADD ITEMS FROM WISHLIST</button>
    </Link>
  </div>
);
