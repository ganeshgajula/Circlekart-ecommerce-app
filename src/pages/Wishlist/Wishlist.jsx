import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { isItemPresent } from "../../components/utils/utils";
import { EmptyWishlist } from "../../components/EmptyWishlist/EmptyWishlist";
import {
  addProductToCart,
  removeProductFromWishlist,
} from "../../components/utils/utils";
import "../Wishlist/Wishlist.css";

export const Wishlist = () => {
  const { state, dataDispatch } = useData();

  const { userId } = useAuth();

  return (
    <div>
      <Navbar />
      {state.itemsInWishlist.length > 0 ? (
        <main className="wishlist-area">
          <div className="wishlist-count-value">
            My Wishlist ({state.itemsInWishlist.length} items)
          </div>
          <div className="wishlisted-items">
            {state.itemsInWishlist.map(({ productId }) => (
              <div
                key={productId._id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  margin: "1rem",
                  padding: "0.9rem",
                }}
                className="card-with-dismiss card-vertical"
              >
                <img
                  src={productId.image}
                  width="100%"
                  height="auto"
                  alt={productId.name}
                />
                <span className="close-btn-on-card">
                  <svg
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    onClick={() =>
                      removeProductFromWishlist(
                        productId._id,
                        dataDispatch,
                        userId
                      )
                    }
                  >
                    <path
                      d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
                <div className="product-description-container">
                  <div className="product-info">
                    <h4> {productId.name} </h4>
                    <div>Rs. {productId.price}</div>
                    {productId.inStock && <div> In Stock </div>}
                    {!productId.inStock && <div> Out of Stock </div>}
                  </div>
                  <button
                    className="btn-outline btn-sm"
                    onClick={() =>
                      isItemPresent(state.itemsInCart, productId._id)
                        ? removeProductFromWishlist(
                            productId._id,
                            dataDispatch,
                            userId
                          )
                        : addProductToCart(
                            productId._id,
                            dataDispatch,
                            userId
                          ) &&
                          removeProductFromWishlist(
                            productId._id,
                            dataDispatch,
                            userId
                          )
                    }
                    style={{
                      cursor: !productId.inStock ? "not-allowed" : "pointer",
                    }}
                    disabled={!productId.inStock ? true : false}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
};
