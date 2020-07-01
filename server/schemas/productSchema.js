import { gql } from 'apollo-server';

export default gql`
scalar Date
type Product {
  _id: ID!
  productName: String!
  summary: String!
  price: String!
  createdAt: Date
  updatedAt: Date
  description: String!
  category: String!
  productImageUrl: String!
}

type AllProducts{
  product:Product!
  isUserFavorite:Boolean
}


  input CreateProductInput {
    productName: String!
    summary: String!
    price: String!
    createdAt: Date
    updatedAt: Date
    description: String!
    category: String!
    productImageUrl: String!
  }

  input UpdateProductInput {
    productName: String!
    summary: String!
    price: String!
    updatedAt: Date
    description: String!
    category: String!
    productImageUrl: String!
  }
  
  extend type Mutation {
    createProduct(data: CreateProductInput!): Product!
  }

`;