import axios from "axios";

export const isItemPresent = (array, id) =>
  !!array.find(({ productId }) => productId._id === id);

export const addProductToCart = async (_id, dataDispatch, userId) => {
  const {
    data: { cart },
    status,
  } = await axios.post(`http://localhost:4000/carts/${userId}/cart`, {
    _id,
    quantity: 1,
    isActive: true,
  });
  if (status === 200) {
    dataDispatch({ type: "LOAD_CART", payload: cart });
  }
};

export const removeProductFromCart = async (_id, dataDispatch, userId) => {
  const {
    data: { cart },
    status,
  } = await axios.post(`http://localhost:4000/carts/${userId}/cart`, {
    _id,
    quantity: 0,
    isActive: false,
  });
  if (status === 200) {
    dataDispatch({ type: "LOAD_CART", payload: cart });
  }
};

export const incrementItemQuantityInCart = async (
  _id,
  quantity,
  dataDispatch,
  userId
) => {
  const {
    data: { cart },
    status,
  } = await axios.post(`http://localhost:4000/carts/${userId}/cart`, {
    _id,
    quantity: quantity + 1,
    isActive: true,
  });
  if (status === 200) {
    dataDispatch({ type: "LOAD_CART", payload: cart });
  }
};

export const decrementItemQuantityInCart = async (
  _id,
  quantity,
  dataDispatch,
  userId
) => {
  const {
    data: { cart },
    status,
  } = await axios.post(`http://localhost:4000/carts/${userId}/cart`, {
    _id,
    quantity: quantity - 1,
    isActive: true,
  });
  if (status === 200) {
    dataDispatch({ type: "LOAD_CART", payload: cart });
  }
};

export const addProductToWishlist = async (_id, dataDispatch, userId) => {
  const {
    data: { wishlist },
    status,
  } = await axios.post(`http://localhost:4000/wishlists/${userId}/wishlist`, {
    _id,
    isActive: true,
  });
  if (status === 200) {
    dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
  }
};

export const removeProductFromWishlist = async (_id, dataDispatch, userId) => {
  const {
    data: { wishlist },
    status,
  } = await axios.post(`http://localhost:4000/wishlists/${userId}/wishlist`, {
    _id,
  });

  if (status === 200) {
    dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
  }
};
