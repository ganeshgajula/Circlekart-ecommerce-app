import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import "../Cart/Cart.css";

export const Cart = () => {
  const { state, dataDispatch } = useData();

  const getTotal = (cartItems) =>
    cartItems.reduce((total, value) => total + value.price * value.quantity, 0);

  return (
    <div>
      <Navbar />
      <main className="cart-area">
        <div className="cartItems-section">
          <div className="cartValue-msg">
            <span className="cart-items-qty">
              My Cart ({state.itemsInCart.length} items)
            </span>
            <span className="total-cart-value">
              Total: Rs.{getTotal(state.itemsInCart)}
            </span>
          </div>
          {state.itemsInCart.map(
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
                      <h3> {name} </h3>
                      <div>Rs. {price}</div>
                      {inStock && <div> In Stock </div>}
                      {!inStock && <div> Out of Stock </div>}

                      {fastDelivery ? (
                        <div> Fast Delivery </div>
                      ) : (
                        <div> 3 days minimum </div>
                      )}
                      <button
                        onClick={() =>
                          dataDispatch({ type: "DECREMENT", payload: _id })
                        }
                        className="btn-outline btn-sm count-btn"
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() =>
                          dataDispatch({ type: "INCREMENT", payload: _id })
                        }
                        className="btn-outline btn-sm count-btn"
                      >
                        +
                      </button>
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
              PRICE DETAILS <span>({state.itemsInCart.length} Items)</span>
            </div>
            <div className="checkout-field">
              <span>Total MRP</span>
              <span>Rs.{getTotal(state.itemsInCart)}</span>
            </div>
            <div className="checkout-field">
              <span>Delivery Fee</span>
              <span>Free</span>
            </div>
            <div className="checkout-field">
              <span>Total Amount</span>
              <span>Rs.{getTotal(state.itemsInCart)}</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
