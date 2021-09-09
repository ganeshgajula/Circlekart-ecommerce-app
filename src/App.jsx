import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { Home } from "./pages/Home/Home";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Cart } from "./pages/Cart/Cart";
import { Login } from "./pages/Login/Login";
import { ProductListing } from "./pages/ProductListing/ProductListing";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import { useProducts } from "./context/ProductsProvider";
import { useData } from "./context/DataProvider";
import { useAuth } from "./context/AuthProvider";
import { Signup } from "./pages/Signup/Signup";
import "./App.css";

const App = () => {
  const { productsDispatch } = useProducts();
  const { dataDispatch } = useData();
  const { token, userId } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products },
        } = await axios.get("http://localhost:4000/products");
        productsDispatch({ type: "LOAD_PRODUCTS", payload: products });
      } catch (error) {
        toast.error(error.response.data.errorMessage, {
          position: "bottom-center",
          autoClose: 2000,
        });
      }
    })();
  }, [productsDispatch]);

  useEffect(() => {
    token &&
      (async () => {
        try {
          const {
            data: { cart },
          } = await axios.get(`http://localhost:4000/carts/${userId}/cart`);
          dataDispatch({ type: "LOAD_CART", payload: cart });

          const {
            data: { wishlist },
          } = await axios.get(
            `http://localhost:4000/wishlists/${userId}/wishlist`
          );
          dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
        } catch (error) {
          toast.error(error.response.data.errorMessage, {
            position: "bottom-center",
            autoClose: 2000,
          });
        }
      })();
  }, [userId, token, dataDispatch]);

  function PrivateRoute({ path, ...props }) {
    return token ? (
      <Route {...props} path={path} />
    ) : (
      <Navigate state={{ from: path }} replace to="/login" />
    );
  }

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductListing />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
