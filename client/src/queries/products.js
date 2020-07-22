import gql from "graphql-tag";

export const GET_ALL_PRODUCTS = gql`
  {
    allProducts {
      product {
        _id
        name
        price
        productImageUrl
      }
      isUserFavorite
    }
  }
`;
export const GET_PRODUCT_DETAILS = gql`
  query ProductDetails($productId: ID!) {
    productDetails(productId: $productId) {
      name
      summary
      price
      description
      category
      productImageUrl
    }
  }
`;
