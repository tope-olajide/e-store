import gql from "graphql-tag";

export const GET_ALL_PRODUCTS = gql`
   {allProducts{
        product{
          _id
          name
          summary
          price
          createdAt
          updatedAt
          description
          category
          productImageUrl
      },
      isUserFavorite
    }
  }
`;
