import React from "react";
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
import "./App.css";

import { useAuth } from "./context/AuthProvider";
import { Signup } from "./pages/Signup/Signup";

const App = () => {
  const { productsDispatch } = useProducts();
  const { dataDispatch } = useData();
  const { isUserLoggedIn, userId } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products },
        } = await axios.get("https://api-circlekart.herokuapp.com/products");
        productsDispatch({ type: "LOAD_PRODUCTS", payload: products });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      (async () => {
        try {
          const {
            data: { cart },
          } = await axios.get(
            `https://api-circlekart.herokuapp.com/carts/${userId}/cart`
          );
          console.log({ userId });
          dataDispatch({ type: "LOAD_CART", payload: cart });
        } catch (error) {
          console.log(error);
        }

        try {
          const {
            data: { wishlist },
          } = await axios.get(
            `https://api-circlekart.herokuapp.com/wishlists/${userId}/wishlist`
          );
          console.log({ userId });
          dataDispatch({ type: "LOAD_WISHLIST", payload: wishlist });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [userId]);

  function PrivateRoute({ path, ...props }) {
    return isUserLoggedIn ? (
      <Route {...props} path={path} />
    ) : (
      <Navigate state={{ from: path }} replace to="/login" />
    );
  }

  return (
    <div className="App">
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
