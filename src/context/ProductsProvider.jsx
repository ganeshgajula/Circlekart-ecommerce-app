import { createContext, useContext, useReducer } from "react";
// import { products } from "../api/faker-data";
import { productsReducer } from "../reducer/productsReducer";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const initialState = {
    products: [],
    showInventoryAll: true,
    fastDeliveryOnly: false,
    sortBy: null,
    searchedKeyword: "",
  };

  const [state, dispatch] = useReducer(productsReducer, initialState);
  return (
    <ProductsContext.Provider
      value={{ data: state, productsDispatch: dispatch }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
