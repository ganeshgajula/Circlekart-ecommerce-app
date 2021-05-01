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

    default:
      return state;
  }
};
