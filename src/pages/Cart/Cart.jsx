import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";

export const Cart = () => {
  const { state, dataDispatch } = useData();
  return (
    <div>
      <Navbar />
      {state.itemsInCart.map(
        ({
          id,
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
              key={id}
              style={{
                border: "1px solid #4B5563",
                borderRadius: "0 0 0.5rem 0.5rem",
                margin: "10rem 1rem 1rem",
                maxWidth: "20%",
                padding: "0 0rem 1rem",
              }}
            >
              <img src={image} width="100%" height="auto" alt={productName} />
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
                onClick={() => dataDispatch({ type: "DECREMENT", payload: id })}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => dataDispatch({ type: "INCREMENT", payload: id })}
              >
                +
              </button>
              <button
                onClick={() =>
                  dataDispatch({ type: "REMOVE_FROM_CART", payload: id })
                }
              >
                Remove
              </button>
              <button
                onClick={() => {
                  dataDispatch({
                    type: "MOVE_TO_WISHLIST",
                    payload: {
                      id,
                      name,
                      image,
                      price,
                      productName,
                      inStock,
                      fastDelivery,
                    },
                  });
                  dataDispatch({ type: "REMOVE_FROM_CART", payload: id });
                }}
              >
                Move to wishlist
              </button>
            </div>
          )
      )}
    </div>
  );
};
