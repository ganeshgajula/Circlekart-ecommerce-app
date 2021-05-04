import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import "../Cart/Cart.css";
import { DeleteSvg } from "../../components/Reusable-Svgs/svgs";

export const Cart = () => {
  const {
    state: { itemsInCart },
    dataDispatch,
  } = useData();

  const getTotal = (cartItems) =>
    cartItems.reduce((total, value) => total + value.price * value.quantity, 0);

  return (
    <div>
      <Navbar />
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
              _id,
              name,
              image,
              price,
              productName,
              inStock,
              fastDelivery,
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
                    <img
                      src={image}
                      alt={productName}
                      className="cartItem-img"
                    />

                    <span className="cartItem-description">
                      <div className="product-info">
                        <h1 className="product-name"> {name} </h1>
                        <p className="product-price">Rs. {price}</p>
                      </div>
                      <div className="product-availability-info">
                        {inStock && (
                          <div className="stock-status"> In Stock </div>
                        )}
                        {!inStock && (
                          <div className="stock-status"> Out of Stock </div>
                        )}
                        {fastDelivery ? (
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
                              ? dataDispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: _id,
                                })
                              : dataDispatch({
                                  type: "DECREMENT",
                                  payload: _id,
                                })
                          }
                          className="btn-outline btn-sm count-btn"
                        >
                          {quantity < 2 ? <DeleteSvg /> : "-"}
                        </button>

                        <span className="quantity-count">{quantity}</span>

                        <button
                          onClick={() =>
                            dataDispatch({ type: "INCREMENT", payload: _id })
                          }
                          className="btn-outline btn-sm count-btn"
                        >
                          +
                        </button>
                      </div>
                    </span>
                  </div>

                  <div className="action-btns">
                    <button
                      className="btn-outline btn-sm"
                      onClick={() =>
                        dataDispatch({ type: "REMOVE_FROM_CART", payload: _id })
                      }
                    >
                      Remove
                    </button>
                    <button
                      className="btn-outline btn-sm"
                      onClick={() => {
                        dataDispatch({
                          type: "ADD_TO_WISHLIST_AND_CHECK_FOR_DUPLICATION",
                          payload: {
                            _id,
                            name,
                            image,
                            price,
                            productName,
                            inStock,
                            fastDelivery,
                          },
                        });
                        dataDispatch({
                          type: "REMOVE_FROM_CART",
                          payload: _id,
                        });
                      }}
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
    </div>
  );
};
