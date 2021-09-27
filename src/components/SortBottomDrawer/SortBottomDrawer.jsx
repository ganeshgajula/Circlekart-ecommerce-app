import React from "react";
import { CloseIcon } from "../../assets/svgs";
import { useProducts } from "../../context/ProductsProvider";
import "./SortBottomDrawer.css";

export const SortBottomDrawer = ({ setShowSortDrawer }) => {
  const {
    data: { sortBy },
    productsDispatch,
  } = useProducts();

  return (
    <div className="bottom-drawer">
      <div className="drawer-header">
        <span className="drawer-title">SORT BY</span>
        <span onClick={() => setShowSortDrawer(false)}>
          <CloseIcon />
        </span>
      </div>
      <div className="options">
        <label className="form-label" onClick={() => setShowSortDrawer(false)}>
          Price - High to Low
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
        </label>
        <label className="form-label" onClick={() => setShowSortDrawer(false)}>
          Price - Low to High
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
        </label>
      </div>
    </div>
  );
};