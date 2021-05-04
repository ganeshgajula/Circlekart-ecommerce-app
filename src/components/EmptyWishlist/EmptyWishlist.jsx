import React from "react";
import { Link } from "react-router-dom";

export const EmptyWishlist = () => (
  <div className="empty-wishlist-area">
    <h1 className="empty-wishlist-heading">Your Wishlist is empty!</h1>
    <p className="empty-wishlist-msg1">
      Seems like you don't have a wish here.
    </p>
    <p className="empty-wishlist-msg2">Make a wish!</p>

    <Link to="/products">
      <button className="btn-outline btn-sm">CONTINUE SHOPPING</button>
    </Link>
  </div>
);
