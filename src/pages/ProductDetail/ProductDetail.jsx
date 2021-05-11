import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsProvider";
import { ProductDetailCard } from "../../components/ProductDetailCard/ProductDetailCard";

export const ProductDetail = () => {
  const { productId } = useParams();

  const { data } = useProducts();

  const getProductDetails = (products, productId) => {
    return products.find((product) => product._id === productId);
  };
  const product = getProductDetails(data.products, productId);

  return (
    <div>
      <h1>Welcome to product details page</h1>
      {<ProductDetailCard {...product} />}
    </div>
  );
};
