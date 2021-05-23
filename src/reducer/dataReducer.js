export const data = {
  itemsInCart: [],
  itemsInWishlist: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return { ...state, itemsInCart: action.payload };

    case "LOAD_WISHLIST":
      return { ...state, itemsInWishlist: action.payload };

    case "RESET_APP_ON_LOGOUT":
      return { ...state, itemsInWishlist: [], itemsInCart: [] };

    default:
      return state;
  }
};
