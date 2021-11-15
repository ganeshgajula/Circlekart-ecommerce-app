import React from "react";
import { useProducts } from "../../context/ProductsProvider";
import { isSelectedItemPresent } from "../utils/utils";
import "./SideFilters.css";

export const SideFilters = () => {
  const {
    data: {
      products,
      sortBy,
      showInventoryAll,
      fastDeliveryOnly,
      selectedLevels,
      selectedAuthors,
    },
    productsDispatch,
  } = useProducts();

  let levels = products.map((product) => product.level);
  levels = levels.filter((item, index) => levels.indexOf(item) === index);

  let inStockProducts = products.filter((product) => product.inStock);
  let authors = inStockProducts.map((product) => product.author);
  authors = authors.filter((item, index) => authors.indexOf(item) === index);

  return (
    <aside className="side-pannel">
      <div>
        <p className="sort-heading">SORT BY</p>
        <label className="form-label">
          <input
            type="radio"
            name="sort"
            className="mr-04"
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
        <label className="form-label">
          <input
            type="radio"
            name="sort"
            className="mr-04"
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
      </div>

      <div>
        <div className="filter-header-container">
          <span className="filter-heading">FILTER BY</span>
          <span
            className="clear-btn"
            onClick={() => productsDispatch({ type: "RESET_FILTERS" })}
          >
            CLEAR ALL
          </span>
        </div>
        <div className="subFilter-container">
          <span className="filter-title">STOCK</span>
          <label className="form-label">
            <input
              type="checkbox"
              className="mr-04"
              onChange={() => productsDispatch({ type: "TOGGLE_STOCK" })}
              checked={showInventoryAll}
            />
            Include Out of Stock
          </label>
        </div>
        <div className="subFilter-container">
          <span className="filter-title">DELIVERY</span>
          <label className="form-label">
            <input
              type="checkbox"
              className="mr-04"
              onChange={() => productsDispatch({ type: "TOGGLE_DELIVERY" })}
              checked={fastDeliveryOnly}
            />
            Fast Delivery Only
          </label>
        </div>
        <div className="subFilter-container">
          <span className="filter-title">LEVEL</span>
          {levels.map((level, index) => (
            <label className="form-label" key={index}>
              <input
                type="checkbox"
                className="mr-04"
                value={level}
                onChange={(e) =>
                  productsDispatch({
                    type: "FILTER_BY_LEVEL",
                    payload: e.target.value,
                  })
                }
                checked={isSelectedItemPresent(selectedLevels, level)}
              />
              {level}
            </label>
          ))}
        </div>
        <div className="subFilter-container">
          <span className="filter-title">AUTHORS</span>
          {authors.slice(0, 7).map((author, index) => (
            <label className="form-label author-names" key={index}>
              <input
                type="checkbox"
                className="mr-04"
                value={author}
                onChange={(e) =>
                  productsDispatch({
                    type: "FILTER_BY_AUTHOR",
                    payload: e.target.value,
                  })
                }
                checked={isSelectedItemPresent(selectedAuthors, author)}
              />
              {author}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
