import { useProducts } from "../../context/ProductsProvider";
import { ProductCard } from "../../components/ProductsCard/ProductCard";

export const SearchedProductPage = () => {
  const {
    data: { products, searchedKeyword },
  } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchedKeyword.toLowerCase())
  );

  return <ProductCard ProductsList={filteredProducts} />;
};
