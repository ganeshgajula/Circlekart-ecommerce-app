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

    default:
      return state;
  }
};
