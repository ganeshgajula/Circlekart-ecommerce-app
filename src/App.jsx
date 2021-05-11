import React from "react";
import { useEffect } from "react";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Cart } from "./pages/Cart/Cart";
import { Login } from "./pages/Login/Login";
import { ProductListing } from "./pages/ProductListing/ProductListing";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import { useProducts } from "./context/ProductsProvider";
import axios from "axios";

import { useAuth } from "./context/AuthProvider";

const App = () => {
  const { productsDispatch } = useProducts();

  const { isUserLoggedIn } = useAuth();

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
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductListing />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/productDetail" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
