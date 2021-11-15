import React, { useState } from "react";
import { CloseIcon } from "../../assets/svgs";
import { useProducts } from "../../context/ProductsProvider";
import { isSelectedItemPresent } from "../utils/utils";
import "./FilterBottomDrawer.css";

export const FilterBottomDrawer = ({ setShowFilterDrawer }) => {
  const {
    data: {
      products,
      showInventoryAll,
      fastDeliveryOnly,
      selectedLevels,
      selectedAuthors,
    },
    productsDispatch,
  } = useProducts();

  const [toggleStock, setToggleStock] = useState(showInventoryAll);
  const [toggleDelivery, setToggleDelivery] = useState(fastDeliveryOnly);

  let levels = products.map((product) => product.level);
  levels = levels.filter((item, index) => levels.indexOf(item) === index);

  let inStockProducts = products.filter((product) => product.inStock);
  let authors = inStockProducts.map((product) => product.author);
  authors = authors.filter((item, index) => authors.indexOf(item) === index);

  const applyFilters = () => {
    toggleStock !== showInventoryAll &&
      productsDispatch({ type: "TOGGLE_STOCK" });
    toggleDelivery !== fastDeliveryOnly &&
      productsDispatch({ type: "TOGGLE_DELIVERY" });
    setShowFilterDrawer(false);
  };

  return (
    <div className="outer-area">
      <div className="bottom-drawer">
        <div className="drawer-header">
          <span className="drawer-title">Filter By</span>
          <span onClick={() => setShowFilterDrawer(false)}>
            <CloseIcon />
          </span>
        </div>
        <div className="filter-options">
          <div className="subFilter-container">
            <span className="filter-title">STOCK</span>
            <label className="form-label">
              <input
                type="checkbox"
                className="mr-04"
                onChange={() => setToggleStock((prev) => !prev)}
                checked={toggleStock}
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
                onChange={() => setToggleDelivery((prev) => !prev)}
                checked={toggleDelivery}
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
            {authors.slice(0, 9).map((author, index) => (
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
        <div className="filter-btn">
          <button
            className="btn-clear"
            onClick={() => productsDispatch({ type: "RESET_FILTERS" })}
          >
            Clear Filters
          </button>
          <button className="btn-apply" onClick={applyFilters}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
