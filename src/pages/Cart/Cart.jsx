import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { DeleteSvg } from "../../components/Reusable-Svgs/svgs";
import { EmptyCart } from "../../components/EmptyCart/EmptyCart";
import {
  isItemPresent,
  moveProductToWishlist,
  removeProductFromCart,
  incrementItemQuantityInCart,
  decrementItemQuantityInCart,
} from "../../components/utils/utils";
import { Link } from "react-router-dom";
import "./Cart.css";
import paymentLogo from "../../assets/payment-logo.jpg";
import axios from "axios";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const Cart = () => {
  const {
    state: { itemsInCart, itemsInWishlist },
    dataDispatch,
  } = useData();

  const { userId } = useAuth();

  const displayRazorpay = async (orderInfo) => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("SDK failed to load");
        return;
      }

      const {
        data: { order },
      } = await axios.post("http://localhost:4000/carts/checkout", {
        orderInfo,
      });

      const options = {
        key: "rzp_test_Tosf7K9EOd3v7X",
        order: order.amount.toString(),
        currency: order.currency,
        name: "Circle Inc",
        description: "Test Transaction",
        image: paymentLogo,
        order_id: order.id,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Circle Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = (cartItems) => {
    const total = cartItems.reduce(
      (total, value) => total + value.productId.price * value.quantity,
      0
    );
    return total;
  };

  const totalAmount = getTotal(itemsInCart);

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
            {itemsInCart.map(
              ({
                productId: {
                  _id,
                  image,
                  name,
                  price,
                  inStock,
                  fastDelivery,
                  author,
                },
                quantity,
              }) =>
                quantity === 0 ? null : (
                  <div
                    key={_id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      margin: "1rem",
                      padding: "0.9rem",
                    }}
                  >
                    <div className="cartItem">
                      <Link to={`/product/${_id}`}>
                        <img
                          src={image}
                          alt="product"
                          className="cartItem-img"
                        />
                      </Link>

                      <span className="cartItem-description">
                        <div className="product-info">
                          <Link
                            to={`/product/${_id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <h1 className="product-name"> {name} </h1>
                          </Link>
                          <p className="product-price-cart">Rs. {price}</p>
                        </div>
                        <div className="product-availability-info">
                          {inStock && (
                            <div className="stock-status"> In Stock </div>
                          )}
                          {!inStock && (
                            <div className="stock-status"> Out of Stock </div>
                          )}
                          {fastDelivery ? (
                            <div className="delivery-status">
                              Fast Delivery Available
                            </div>
                          ) : (
                            <div className="delivery-status">
                              Delivered within 3 days
                            </div>
                          )}
                        </div>
                        <div className="cart-btns">
                          <button
                            onClick={() =>
                              quantity < 2
                                ? removeProductFromCart(
                                    _id,
                                    dataDispatch,
                                    userId
                                  )
                                : decrementItemQuantityInCart(
                                    _id,
                                    quantity,
                                    dataDispatch,
                                    userId
                                  )
                            }
                            className="btn-outline btn-sm count-btn"
                          >
                            {quantity < 2 ? <DeleteSvg /> : "-"}
                          </button>
                          <span className="quantity-count">{quantity}</span>
                          <button
                            onClick={() =>
                              incrementItemQuantityInCart(
                                _id,
                                quantity,
                                dataDispatch,
                                userId
                              )
                            }
                            className="btn-outline btn-sm count-btn"
                          >
                            +
                          </button>
                        </div>
                        <div className="action-btns">
                          {quantity > 1 && (
                            <button
                              className="btn-outline btn-sm"
                              onClick={() =>
                                removeProductFromCart(_id, dataDispatch, userId)
                              }
                            >
                              Remove
                            </button>
                          )}

                          <button
                            className="btn-outline btn-sm"
                            onClick={() =>
                              !isItemPresent(itemsInWishlist, _id)
                                ? moveProductToWishlist(
                                    _id,
                                    dataDispatch,
                                    userId
                                  )
                                : removeProductFromCart(
                                    _id,
                                    dataDispatch,
                                    userId
                                  )
                            }
                          >
                            Move to wishlist
                          </button>
                        </div>
                      </span>
                    </div>
                  </div>
                )
            )}
          </div>
          <aside className="checkout-container">
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
                <span>Rs.{totalAmount}</span>
              </div>
            </div>
            <button
              className="btn-sm btn checkout-btn mt-2"
              onClick={() => displayRazorpay({ totalAmount })}
            >
              Checkout
            </button>
          </aside>
        </main>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};
