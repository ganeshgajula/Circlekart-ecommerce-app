import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductsProvider } from "../src/context/ProductsProvider";
import { DataProvider } from "../src/context/DataProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProductsProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </ProductsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
