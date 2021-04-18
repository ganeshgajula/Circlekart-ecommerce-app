export const data = {
  itemsInCart: [],
  itemsInWishlist: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, itemsInCart: [...state.itemsInCart, action.payload] };

    case "INCREMENT":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((cartItem) =>
          cartItem.id === action.payload
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((cartItem) =>
          cartItem.id === action.payload
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
