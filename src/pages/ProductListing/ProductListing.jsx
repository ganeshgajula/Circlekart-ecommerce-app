import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "../ProductListing/ProductListing.css";
import { useProducts } from "../../context/ProductsProvider";
import { ProductCard } from "../../components/ProductsCard/ProductCard";
import { EmptySearch } from "../../components/EmptySearch/EmptySearch";
import { FilterIcon, SortIcon } from "../../assets/svgs";
import { SortBottomDrawer } from "../../components/SortBottomDrawer/SortBottomDrawer";
import { FilterBottomDrawer } from "../../components/FilterBottomDrawer/FilterBottomDrawer";

export const ProductListing = () => {
  const {
    data: {
      products,
      showInventoryAll,
      fastDeliveryOnly,
      sortBy,
      searchedKeyword,
    },
    productsDispatch,
  } = useProducts();

  const [showSortDrawer, setShowSortDrawer] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

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

  const filteredProducts = filteredData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchedKeyword.toLowerCase()) ||
      product.author.toLowerCase().includes(searchedKeyword.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="main-product-area">
        <aside className="side-pannel">
          <fieldset>
            <legend>Sort By</legend>
            <label className="form-label">
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
            <label className="form-label">
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
            <label className="form-label">
              <input
                type="checkbox"
                onChange={() => productsDispatch({ type: "TOGGLE_STOCK" })}
                checked={showInventoryAll}
              />
              Include Out of Stock
            </label>
            <label className="form-label">
              <input
                type="checkbox"
                onChange={() => productsDispatch({ type: "TOGGLE_DELIVERY" })}
                checked={fastDeliveryOnly}
              />
              Fast Delivery Only
            </label>
          </fieldset>
        </aside>

        {filteredProducts.length > 0 ? (
          <div className="outer">
            <main className="products-area">
              <ProductCard ProductsList={filteredProducts} />
            </main>

            <div className="mobile-filters">
              <span
                className="sort-container"
                onClick={() => setShowSortDrawer(true)}
              >
                <SortIcon />
                <span className="display-text">Sort</span>
              </span>
              <span
                className="filter-container"
                onClick={() => setShowFilterDrawer(true)}
              >
                <FilterIcon />
                <span className="display-text">Filter</span>
              </span>
            </div>

            {showSortDrawer && (
              <SortBottomDrawer setShowSortDrawer={setShowSortDrawer} />
            )}
            {showFilterDrawer && (
              <FilterBottomDrawer setShowFilterDrawer={setShowFilterDrawer} />
            )}
          </div>
        ) : (
          <EmptySearch />
        )}
      </div>
    </div>
  );
};
