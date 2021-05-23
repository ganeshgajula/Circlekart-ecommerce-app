import { createContext, useContext, useReducer } from "react";
import { productsReducer } from "../reducer/productsReducer";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const initialState = {
    products: [],
    showInventoryAll: false,
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
