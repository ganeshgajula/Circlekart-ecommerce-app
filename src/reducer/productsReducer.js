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

    // case "SEARCH_PRODUCT":
    //   // console.log(action.payload);
    //   // console.log(state.filteredProducts);
    //   return {
    //     ...state,
    //     searchedKeyword: action.payload,
    //     filteredProducts: state.products.filter((product) =>
    //       product.name
    //         .toLowerCase()
    //         .includes(state.searchedKeyword.toLowerCase())
    //     ),
    //     displayFilteredData: state.filteredProducts,
    //   };
    // return {
    //   ...state,
    //   searchedKeyword: action.payload,
    //   products: state.products.filter((product) => {
    //     if (state.searchedKeyword === "") {
    //       return product;
    //     } else if (
    //       product.name
    //         .toLowerCase()
    //         .includes(state.searchedKeyword.toLowerCase())
    //     ) {
    //       return product;
    //     }
    //   }),
    // };

    default:
      return state;
  }
};
