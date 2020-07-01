import { gql } from 'apollo-server';

export default gql`

type User {
  _id: ID!
  email: String!
  username: String!
  password: String!
  firstname: String!
  lastname: String!
  role: String!
}

type AuthPayload {
  token: String!
  user: User!
}

input SignupUserInput {
  email: String!
  username: String!
  password: String!
  firstname: String!
  lastname: String!
}

input LoginUserInput {
  usernameOrEmail: String!
  password: String!
}

extend type Query {
  users: [User!]!
}

extend type Mutation {
  signup(data: SignupUserInput!): AuthPayload!
  signin(data: LoginUserInput!):  AuthPayload!
}

`