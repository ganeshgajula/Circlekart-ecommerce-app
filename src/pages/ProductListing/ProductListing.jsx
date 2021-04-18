import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "../ProductListing/ProductListing.css";
import { useProducts } from "../../context/ProductsProvider";
import { useData } from "../../context/DataProvider";
import { isItemPresent } from "../../components/utils/utils";
import { Link } from "react-router-dom";

export const ProductListing = () => {
  const {
    data: { products, showInventoryAll, fastDeliveryOnly, sortBy },
    productsDispatch,
  } = useProducts();

  const {
    state: { itemsInWishlist, itemsInCart },
    dataDispatch,
  } = useData();

  const getSortedData = (products, sortBy) => {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return products.sort((a, b) => b.price - a.price);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return products.sort((a, b) => a.price - b.price);
    }

    return products;
  };

  const getFilteredData = (products, { showInventoryAll, fastDeliveryOnly }) =>
    products
      .filter(({ inStock }) => (showInventoryAll ? true : inStock))
      .filter(({ fastDelivery }) => (fastDeliveryOnly ? fastDelivery : true));

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showInventoryAll,
    fastDeliveryOnly,
  });

  return (
    <div>
      <Navbar />
      <div className="main-product-area">
        <aside className="side-pannel">
          <fieldset>
            <legend>Sort By</legend>
            <label htmlFor="sort">
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  productsDispatch({
                    type: "SORT",
                    payload: "PRICE_HIGH_TO_LOW",
                  })
                }
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
              />
              Price - High to Low
            </label>
            <label htmlFor="sort">
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  productsDispatch({
                    type: "SORT",
                    payload: "PRICE_LOW_TO_HIGH",
                  })
                }
                checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
              />
              Price - Low to High
            </label>
          </fieldset>

          <fieldset>
            <legend>Filters</legend>
            <label htmlFor="outOfStock">
              <input
                type="checkbox"
                onChange={() => productsDispatch({ type: "TOGGLE_STOCK" })}
                checked={showInventoryAll}
              />
              Include Out of Stock
            </label>
            <label htmlFor="fastDelivery">
              <input
                type="checkbox"
                onChange={() => productsDispatch({ type: "TOGGLE_DELIVERY" })}
                checked={fastDeliveryOnly}
              />
              Fast Delivery Only
            </label>
          </fieldset>
        </aside>

        <main className="products-area">
          {filteredData.map(
            ({
              id,
              name,
              image,
              price,
              productName,
              inStock,
              level,
              fastDelivery,
            }) => (
              <div
                key={id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  margin: "1rem",
                  padding: "0.9rem",
                }}
                className="card-with-dismiss"
              >
                <img src={image} width="100%" height="auto" alt={productName} />
                <span className="close-btn-on-card">
                  <svg
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    style={{
                      fill: `${
                        isItemPresent(itemsInWishlist, id) ? "red" : "white"
                      }`,
                    }}
                    onClick={() =>
                      isItemPresent(itemsInWishlist, id)
                        ? dataDispatch({
                            type: "REMOVE_FROM_WISHLIST",
                            payload: id,
                          })
                        : dataDispatch({
                            type: "ADD_TO_WISHLIST",
                            payload: {
                              id,
                              name,
                              image,
                              price,
                              productName,
                              inStock,
                              fastDelivery,
                            },
                          })
                    }
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"></path>
                  </svg>
                </span>
                <h4> {name} </h4>
                <div>Rs. {price}</div>
                {inStock && <div> In Stock </div>}
                {!inStock && <div> Out of Stock </div>}
                <div>{level}</div>
                {fastDelivery ? (
                  <div> Fast Delivery </div>
                ) : (
                  <div> 3 days minimum </div>
                )}
                {/* <button
                  onClick={() =>
                    dataDispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        fastDelivery,
                        quantity: 1,
                      },
                    })
                  }
                >
                  {isItemPresent(itemsInCart, id)
                    ? "Go to Cart"
                    : "Add to Cart"}
                </button> */}
                {!isItemPresent(itemsInCart, id) ? (
                  <button
                    className="btn-outline btn-sm"
                    onClick={() =>
                      dataDispatch({
                        type: "ADD_TO_CART",
                        payload: {
                          id,
                          name,
                          image,
                          price,
                          productName,
                          inStock,
                          fastDelivery,
                          quantity: 1,
                        },
                      })
                    }
                  >
                    Add to Cart
                  </button>
                ) : null}

                {isItemPresent(itemsInCart, id) ? (
                  <Link to="/cart">
                    <button className="btn-outline btn-sm">Go to Cart</button>
                  </Link>
                ) : null}
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
};
