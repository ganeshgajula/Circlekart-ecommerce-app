import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import { isItemPresent } from "../../components/utils/utils";
import "../Wishlist/Wishlist.css";
import { EmptyWishlist } from "../../components/EmptyWishlist/EmptyWishlist";

export const Wishlist = () => {
  const { state, dataDispatch } = useData();

  const increaseQtyInCartAndRemoveFromWishlist = (_id) => {
    dataDispatch({
      type: "ADD_ITEM_WITH_INCREASED_QUANTITY",
      payload: _id,
    });
    dataDispatch({ type: "REMOVE_FROM_WISHLIST", payload: _id });
  };

  const moveToCartAndRemoveFromWishlist = (
    _id,
    name,
    image,
    price,
    productName,
    inStock
  ) => {
    dataDispatch({
      type: "ADD_TO_CART",
      payload: {
        _id,
        name,
        image,
        price,
        productName,
        inStock,
        quantity: 1,
      },
    });
    dataDispatch({ type: "REMOVE_FROM_WISHLIST", payload: _id });
  };

  return (
    <div>
      <Navbar />
      {state.itemsInWishlist.length > 0 ? (
        <main className="wishlist-area">
          <div className="wishlist-count-value">
            My Wishlist ({state.itemsInWishlist.length} items)
          </div>
          <div className="wishlisted-items">
            {state.itemsInWishlist.map(
              ({ _id, name, image, price, productName, inStock }) => (
                <div
                  key={_id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    margin: "1rem",
                    padding: "0.9rem",
                  }}
                  className="card-with-dismiss"
                >
                  <img
                    src={image}
                    width="100%"
                    height="auto"
                    alt={productName}
                  />
                  <span className="close-btn-on-card">
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 24 24"
                      onClick={() =>
                        dataDispatch({
                          type: "REMOVE_FROM_WISHLIST",
                          payload: _id,
                        })
                      }
                    >
                      <path
                        d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                  <h4> {name} </h4>
                  <div>Rs. {price}</div>
                  {inStock && <div> In Stock </div>}
                  {!inStock && <div> Out of Stock </div>}
                  <button
                    className="btn-outline btn-sm"
                    onClick={() =>
                      isItemPresent(state.itemsInCart, _id)
                        ? increaseQtyInCartAndRemoveFromWishlist(_id)
                        : moveToCartAndRemoveFromWishlist(
                            _id,
                            name,
                            image,
                            price,
                            productName,
                            inStock
                          )
                    }
                  >
                    Move to Cart
                  </button>
                </div>
              )
            )}
          </div>
        </main>
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
};
