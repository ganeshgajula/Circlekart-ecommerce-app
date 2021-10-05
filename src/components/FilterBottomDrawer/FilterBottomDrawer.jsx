import React, { useState } from "react";
import { CloseIcon } from "../../assets/svgs";
import { useProducts } from "../../context/ProductsProvider";
import "./FilterBottomDrawer.css";

export const FilterBottomDrawer = ({ setShowFilterDrawer }) => {
  const {
    data: { showInventoryAll, fastDeliveryOnly },
    productsDispatch,
  } = useProducts();

  const [toggleStock, setToggleStock] = useState(showInventoryAll);
  const [toggleDelivery, setToggleDelivery] = useState(fastDeliveryOnly);

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
        <div className="options">
          <label className="form-label">
            Include Out of Stock
            <input
              type="checkbox"
              onChange={() => setToggleStock((prev) => !prev)}
              checked={toggleStock}
            />
          </label>
          <label className="form-label">
            Fast Delivery Only
            <input
              type="checkbox"
              onChange={() => setToggleDelivery((prev) => !prev)}
              checked={toggleDelivery}
            />
          </label>
        </div>
        <div className="filter-btn">
          <button className="btn-apply" onClick={applyFilters}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
