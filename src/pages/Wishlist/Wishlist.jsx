import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import { useAuth } from "../../context/AuthProvider";
import { isItemPresent } from "../../components/utils/utils";
import { EmptyWishlist } from "../../components/EmptyWishlist/EmptyWishlist";
import {
  moveProductToCart,
  removeProductFromWishlist,
} from "../../components/utils/utils";
import { Link } from "react-router-dom";
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
            {state.itemsInWishlist.map(
              ({ productId: { _id, image, name, price, inStock } }) => (
                <div
                  key={_id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    margin: "1rem",
                    padding: "0.9rem",
                  }}
                  className="card-with-dismiss card-vertical"
                >
                  <Link to={`/product/${_id}`}>
                    <img src={image} width="210px" height="260px" alt={name} />
                  </Link>
                  <span className="close-btn-on-card">
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 24 24"
                      onClick={() =>
                        removeProductFromWishlist(_id, dataDispatch, userId)
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
                      <Link
                        to={`/product/${_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <h4 className="product-name"> {name} </h4>
                      </Link>
                      <p className="product-price-card-view">Rs. {price}</p>
                      {inStock && <div> In Stock </div>}
                      {!inStock && <div> Out of Stock </div>}
                    </div>
                    <button
                      className="btn-outline btn-sm"
                      onClick={() =>
                        isItemPresent(state.itemsInCart, _id)
                          ? removeProductFromWishlist(_id, dataDispatch, userId)
                          : moveProductToCart(_id, dataDispatch, userId)
                      }
                      style={{
                        cursor: !inStock ? "not-allowed" : "pointer",
                      }}
                      disabled={!inStock ? true : false}
                    >
                      Move to Cart
                    </button>
                  </div>
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
