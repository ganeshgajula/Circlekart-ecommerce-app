import React from "react";
import { useProducts } from "../../context/ProductsProvider";
import { EmptySearch } from "../EmptySearch/EmptySearch";
import { Spinner } from "../Spinner/Spinner";

export const SpinnerOrEmptySearch = () => {
  const {
    data: { searchedKeyword },
  } = useProducts();

  return !searchedKeyword ? (
    <div className="spinner-area">
      <Spinner size={60} />
    </div>
  ) : (
    <EmptySearch />
  );
};
