import { gql } from "apollo-server";

export default gql`
  type Favorite {
    id: ID!
    userId: ID!
    productId: ID!
  }
  type favoriteProducts {
    _id: ID!
    productName: String!
    summary: String!
    price: String!
    createdAt: Date
    updatedAt: Date
    description: String!
    category: [String!]!
    productImageUrl: String!
    userId: String!
  }
  extend type Mutation {
    addProductToFavorite(productId: ID!): Favorite!
    removeProductFromFavorite(productId: ID!): Favorite!
  }
  extend type Query {
    fetchAllFavoriteProduct: [favoriteProducts!]!
  }
`;
