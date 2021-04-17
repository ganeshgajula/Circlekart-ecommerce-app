import React from "react";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Cart } from "./pages/Cart/Cart";
import { ProductListing } from "./pages/ProductListing/ProductListing";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productDetail" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
