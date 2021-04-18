import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";
import { isItemPresent } from "../../components/utils/utils";

export const Wishlist = () => {
  const { state, dataDispatch } = useData();

  const increaseQtyInCartAndRemoveFromWishlist = (id) => {
    dataDispatch({
      type: "ADD_ITEM_WITH_INCREASED_QUANTITY",
      payload: id,
    });
    dataDispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  const moveToCartAndRemoveFromWishlist = (
    id,
    name,
    image,
    price,
    productName,
    inStock
  ) => {
    dataDispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name,
        image,
        price,
        productName,
        inStock,
        quantity: 1,
      },
    });
    dataDispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  return (
    <div>
      <Navbar />
      <h1>Wishlist Page</h1>
      {state.itemsInWishlist.map(
        ({ id, name, image, price, productName, inStock }) => (
          <div
            key={id}
            style={{
              border: "1px solid #4B5563",
              borderRadius: "0 0 0.5rem 0.5rem",
              margin: "10rem 1rem 1rem",
              maxWidth: "20%",
              padding: "0 0rem 1rem",
            }}
            className="card-content-vertical card-with-dismiss"
          >
            <img src={image} width="100%" height="auto" alt={productName} />
            <span className="close-btn-on-card">
              <svg
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
                onClick={() =>
                  dataDispatch({ type: "REMOVE_FROM_WISHLIST", payload: id })
                }
              >
                <path
                  d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7z"
                  fill="white"
                ></path>
              </svg>
            </span>
            <h3> {name} </h3>
            <div>Rs. {price}</div>
            {inStock && <div> In Stock </div>}
            {!inStock && <div> Out of Stock </div>}
            <button
              onClick={() =>
                isItemPresent(state.itemsInCart, id)
                  ? increaseQtyInCartAndRemoveFromWishlist(id)
                  : moveToCartAndRemoveFromWishlist(
                      id,
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
  );
};
