import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductsProvider } from "../src/context/ProductsProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
