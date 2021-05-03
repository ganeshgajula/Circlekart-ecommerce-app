import { SearchSvg } from "../Reusable-Svgs/svgs";
import { useProducts } from "../../context/ProductsProvider";
import { SearchedProductPage } from "../../pages/ProductListing/SearchedProduct";

export const SearchBar = () => {
  const {
    data: { searchedKeyword },
    productsDispatch,
  } = useProducts();

  return (
    <span className="search-field">
      {<SearchSvg />}
      <input
        type="text"
        className="search-bar"
        value={searchedKeyword}
        placeholder="Search for book, author and more"
        onChange={(e) =>
          productsDispatch({ type: "SEARCH_PRODUCT", payload: e.target.value })
        }
      />
      {searchedKeyword !== "" ? <SearchedProductPage /> : null}
    </span>
  );
};