import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { DeleteSvg } from "../../components/Reusable-Svgs/svgs";
import { isItemPresent } from "../../components/utils/utils";
import { EmptyCart } from "../../components/EmptyCart/EmptyCart";
import axios from "axios";
import "../Cart/Cart.css";

export const Cart = () => {
  const {
    state: { itemsInCart, itemsInWishlist },
    dataDispatch,
  } = useData();

  const { userId } = useAuth();

  const getTotal = (cartItems) =>
    cartItems.reduce(
      (total, value) => total + value.productId.price * value.quantity,
      0
    );

  const incrementQuantity = async (_id, quantity) => {
    const {
      data: { cart },
      status,
    } = await axios.post(
      `https://api-circlekart.herokuapp.com/carts/${userId}/cart`,
      {
        _id,
        quantity: quantity + 1,
        isActive: true,
      }
    );
    if (status === 200) {
      dataDispatch({ type: "LOAD_CART", payload: cart });
    }
  };

  const decrementQuantity = async (_id, quantity) => {
    const {
      data: { cart },
      status,
    } = await axios.post(
      `https://api-circlekart.herokuapp.com/carts/${userId}/cart`,
      { _id, quantity: quantity - 1, isActive: true }
    );
    if (status === 200) {
      dataDispatch({ type: "LOAD_CART", payload: cart });
    }
  };

  const removeProductFromCart = async (_id) => {
    const {
      data: { cart },
      status,
    } = await axios.post(
      `https://api-circlekart.herokuapp.com/carts/${userId}/cart`,
      { _id, quantity: 0, isActive: false }
    );
    if (status === 200) {
      dataDispatch({ type: "LOAD_CART", payload: cart });
    }
  };

  const addProductToWishlist = async (_id) => {
    const {
      data: { wishlist },
      status,
    } = await axios.post(
      `https://api-circlekart.herokuapp.com/wishlists/${userId}/wishlist`,
      { _id, isActive: true }
    );
    if (status === 200) {
      dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
    }
  };

  return (
    <div>
      <Navbar />
      {itemsInCart.length > 0 ? (
        <main className="cart-area">
          <div className="cartItems-section">
            <div className="cartValue-msg">
              <span className="cart-items-qty">
                My Cart ({itemsInCart.length} items)
              </span>
              <span className="total-cart-value">
                Total: Rs.{getTotal(itemsInCart)}
              </span>
            </div>
            {itemsInCart.map(({ productId, quantity, isActive }) =>
              quantity === 0 ? null : (
                <div
                  key={productId._id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    margin: "1rem",
                    padding: "0.9rem",
                  }}
                >
                  <div className="cartItem">
                    <img
                      src={productId.image}
                      alt="product"
                      className="cartItem-img"
                    />

                    <span className="cartItem-description">
                      <div className="product-info">
                        <h1 className="product-name"> {productId.name} </h1>
                        <p className="product-price">Rs. {productId.price}</p>
                      </div>
                      <div className="product-availability-info">
                        {productId.inStock && (
                          <div className="stock-status"> In Stock </div>
                        )}
                        {!productId.inStock && (
                          <div className="stock-status"> Out of Stock </div>
                        )}
                        {productId.fastDelivery ? (
                          <div className="delivery-status"> Fast Delivery </div>
                        ) : (
                          <div className="delivery-status">
                            {" "}
                            3 days minimum{" "}
                          </div>
                        )}
                      </div>
                      <div className="cart-btns">
                        <button
                          onClick={() =>
                            quantity < 2
                              ? removeProductFromCart(productId._id)
                              : decrementQuantity(productId._id, quantity)
                          }
                          className="btn-outline btn-sm count-btn"
                        >
                          {quantity < 2 ? <DeleteSvg /> : "-"}
                        </button>

                        <span className="quantity-count">{quantity}</span>

                        <button
                          onClick={() =>
                            incrementQuantity(productId._id, quantity)
                          }
                          className="btn-outline btn-sm count-btn"
                        >
                          +
                        </button>
                      </div>
                    </span>
                  </div>

                  <div className="action-btns">
                    {quantity > 1 ? (
                      <button
                        className="btn-outline btn-sm"
                        onClick={() => removeProductFromCart(productId._id)}
                      >
                        Remove
                      </button>
                    ) : null}

                    <button
                      className="btn-outline btn-sm"
                      onClick={() =>
                        !isItemPresent(itemsInWishlist, productId._id)
                          ? addProductToWishlist(productId._id) &&
                            removeProductFromCart(productId._id)
                          : removeProductFromCart(productId._id)
                      }
                    >
                      Move to wishlist
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
          <aside>
            <div className="checkout-panel">
              <div className="checkout-header">
                PRICE DETAILS <span>({itemsInCart.length} Items)</span>
              </div>
              <div className="checkout-field">
                <span>Total MRP</span>
                <span>Rs.{getTotal(itemsInCart)}</span>
              </div>
              <div className="checkout-field">
                <span>Delivery Fee</span>
                <span>Free</span>
              </div>
              <div className="checkout-field">
                <span>Total Amount</span>
                <span>Rs.{getTotal(itemsInCart)}</span>
              </div>
            </div>
          </aside>
        </main>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};
