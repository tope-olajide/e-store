import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCT_DETAILS } from "../../queries/products";
const ProductDetails = ({match}) => {
  const [itemNumber, setItemNumber] = useState(0);
  const { productId } = match.params;
  const { data, error, loading } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { productId }
  });
  
  const increaseItem = () => {
    setItemNumber(itemNumber + 1);
  };
  const decreaseItem = () => {
    if (itemNumber <= 0) {
      setItemNumber(0);
    } else {
      setItemNumber(itemNumber - 1);
    }
  };
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!data) return <p>Not found</p>;
  return (
    <>{console.log(data)}
      <nav class="nav-to-product">
        <p>Home</p>
        <span>{">"}</span>
        <p>All Products</p>
        <span>{">"}</span>
        <p>product</p>
      </nav>
      <section class="product-details-container">
        <div class="product-image-section">
          <img src={data.productDetails.productImageUrl} alt={data.productDetails.productImageUrl} />
        </div>
        <div class="product-summary-section">
          <h1>{data.productDetails.name}</h1>
          <h4>{data.productDetails.price}</h4>
          <p class="product-summary">{data.productDetails.summary}</p>
          <section class="counter-section">
            <input
              type="button"
              onClick={decreaseItem}
              value="-"
              class="product-counter-botton"
            />
            <input
              type="text"
              value={itemNumber}
              class="product-counter-input"
            />
            <input
              type="button"
              onClick={increaseItem}
              value="+"
              class="product-counter-botton"
            />
          </section>
          <input type="button" value="Add to cart" class="secondary-button" />
        </div>
      </section>
      <section class="description_review-section">
        <div class="description-container">
          <h3>Description</h3>
          <p>{data.productDetails.description}</p>
        </div>
      </section>
    </>
  );
};
export default ProductDetails;
