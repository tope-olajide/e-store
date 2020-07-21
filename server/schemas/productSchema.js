import { gql } from 'apollo-server';

export default gql`
scalar Date
type Product {
  _id: ID!
  name: String!
  summary: String!
  price: String!
  createdAt: Date
  updatedAt: Date
  description: String!
  category: [String!]!
  productImageUrl: String!
}

type AllProducts{
  product:Product!
  isUserFavorite:Boolean
}
  input CreateProductInput {
    name: String!
    summary: String!
    price: String!
    createdAt: Date
    updatedAt: Date
    description: String!
    category: [String!]!
    productImageUrl: String!
  }

  input UpdateProductInput {
    name: String!
    summary: String!
    price: String!
    updatedAt: Date
    description: String!
    category: [String!]!
    productImageUrl: String!
  }
  
  extend type Mutation {
    createProduct(data: CreateProductInput!): Product!
    modifyProduct(productId:ID!, data: UpdateProductInput!): Product!
    deleteMyProduct(productId:ID!): Product!
  }
  extend type Query {
    allProducts:[AllProducts]
productDetails(productId:ID!): Product!
  }
`;