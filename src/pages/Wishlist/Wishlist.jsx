import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataProvider";

export const Wishlist = () => {
  const { state } = useData();
  return (
    <div>
      <Navbar />
      <h1>Wishlist Page</h1>
      {state.itemsInWishlist.map(
        ({ id, name, image, price, productName, inStock }) => (
          <div
            key={id}
            style={{
              border: "1px solid #4B5563",
              borderRadius: "0 0 0.5rem 0.5rem",
              margin: "10rem 1rem 1rem",
              maxWidth: "20%",
              padding: "0 0rem 1rem",
            }}
          >
            <img src={image} width="100%" height="auto" alt={productName} />
            <h3> {name} </h3>
            <div>Rs. {price}</div>
            {inStock && <div> In Stock </div>}
            {!inStock && <div> Out of Stock </div>}
          </div>
        )
      )}
    </div>
  );
};
