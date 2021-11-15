import { isSelectedItemPresent } from "../components/utils/utils";

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return { ...state, products: action.payload };

    case "SORT":
      return { ...state, sortBy: action.payload };

    case "TOGGLE_STOCK":
      return { ...state, showInventoryAll: !state.showInventoryAll };

    case "TOGGLE_DELIVERY":
      return { ...state, fastDeliveryOnly: !state.fastDeliveryOnly };

    case "SEARCH_PRODUCT":
      return { ...state, searchedKeyword: action.payload };

    case "FILTER_BY_LEVEL":
      return {
        ...state,
        selectedLevels: !isSelectedItemPresent(
          state.selectedLevels,
          action.payload
        )
          ? [...state.selectedLevels, action.payload]
          : state.selectedLevels.filter((level) => level !== action.payload),
      };

    case "FILTER_BY_AUTHOR":
      return {
        ...state,
        selectedAuthors: !isSelectedItemPresent(
          state.selectedAuthors,
          action.payload
        )
          ? [...state.selectedAuthors, action.payload]
          : state.selectedAuthors.filter((author) => author !== action.payload),
      };

    case "RESET_FILTERS":
      return {
        ...state,
        showInventoryAll: false,
        fastDeliveryOnly: false,
        sortBy: null,
        selectedLevels: [],
        selectedAuthors: [],
      };

    default:
      return state;
  }
};
