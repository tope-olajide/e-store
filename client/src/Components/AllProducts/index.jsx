import React from "react";
import ProductCard from "../Commons/ProductCard";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_PRODUCTS } from "../../queries/products";
const AllProducts = () => {
  const { data, error, loading } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <section class="product-section">
        {data.allProducts.map((product) => {
          return (
            <ProductCard
              isUserFavorite={product.isUserFavorite}
              name={product.product.name}
              price={product.product.price}
              productId={product.product._id}
            />
          );
        })}
      </section>
    </>
  );
};
export default AllProducts;
