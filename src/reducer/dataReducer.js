export const data = {
  itemsInCart: [],
  itemsInWishlist: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, itemsInCart: [...state.itemsInCart, action.payload] };

    default:
      return state;
  }
};
