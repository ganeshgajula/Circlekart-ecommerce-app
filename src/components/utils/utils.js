import axios from "axios";
import { toast } from "react-toastify";

export const isItemPresent = (array, id) =>
  !!array.find(({ productId }) => productId._id === id);

export const addProductToCart = async (_id, dataDispatch, userId) => {
  try {
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
      toast.success("Product added to cart", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }
};

export const removeProductFromCart = async (_id, dataDispatch, userId) => {
  try {
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
      toast.success("Removed product from cart.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }
};

export const incrementItemQuantityInCart = async (
  _id,
  quantity,
  dataDispatch,
  userId
) => {
  try {
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
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }
};

export const decrementItemQuantityInCart = async (
  _id,
  quantity,
  dataDispatch,
  userId
) => {
  try {
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
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }
};

export const addProductToWishlist = async (_id, dataDispatch, userId) => {
  try {
    const {
      data: { wishlist },
      status,
    } = await axios.post(`http://localhost:4000/wishlists/${userId}/wishlist`, {
      _id,
      isActive: true,
    });
    if (status === 200) {
      dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
      toast.success("Product added to wishlist", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }
};

export const removeProductFromWishlist = async (_id, dataDispatch, userId) => {
  try {
    const {
      data: { wishlist },
      status,
    } = await axios.post(`http://localhost:4000/wishlists/${userId}/wishlist`, {
      _id,
    });

    if (status === 200) {
      dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
      toast.success("Removed product from wishlist.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }
};

export const moveProductToWishlist = async (_id, dataDispatch, userId) => {
  try {
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

    const {
      data: { wishlist },
      status: wishlistStatus,
    } = await axios.post(`http://localhost:4000/wishlists/${userId}/wishlist`, {
      _id,
      isActive: true,
    });
    if (wishlistStatus === 200) {
      dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
      toast.success("Product added to wishlist", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }
};

export const moveProductToCart = async (_id, dataDispatch, userId) => {
  try {
    const {
      data: { wishlist },
      status,
    } = await axios.post(`http://localhost:4000/wishlists/${userId}/wishlist`, {
      _id,
    });

    if (status === 200) {
      dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
    }

    const {
      data: { cart },
      status: cartStatus,
    } = await axios.post(`http://localhost:4000/carts/${userId}/cart`, {
      _id,
      quantity: 1,
      isActive: true,
    });
    if (cartStatus === 200) {
      dataDispatch({ type: "LOAD_CART", payload: cart });
      toast.success("Product added to cart", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }
};
