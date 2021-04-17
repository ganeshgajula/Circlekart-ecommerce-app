import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "../ProductListing/ProductListing.css";
import { useProducts } from "../../context/ProductsProvider";

export const ProductListing = () => {
  const {
    data: { products, showInventoryAll, fastDeliveryOnly, sortBy },
    productsDispatch,
  } = useProducts();

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
        <aside>
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

        <main>
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
                  border: "1px solid #4B5563",
                  borderRadius: "0 0 0.5rem 0.5rem",
                  margin: "1rem",
                  maxWidth: "20%",
                  padding: "0 0rem 1rem",
                }}
              >
                <img src={image} width="100%" height="auto" alt={productName} />
                <h3> {name} </h3>
                <div>Rs. {price}</div>
                {inStock && <div> In Stock </div>}
                {!inStock && <div> Out of Stock </div>}
                <div>{level}</div>
                {fastDelivery ? (
                  <div> Fast Delivery </div>
                ) : (
                  <div> 3 days minimum </div>
                )}
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
};
