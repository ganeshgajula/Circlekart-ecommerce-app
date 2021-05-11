import React from "react";

export function ProductDetailCard({
  _id,
  name,
  image,
  price,
  productName,
  inStock,
  level,
  fastDelivery,
}) {
  return (
    <div>
      <img src={image} alt="product" />
      <h1>{name}</h1>
    </div>
  );
}
