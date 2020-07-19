import { gql } from "apollo-boost";

export const SIGNUP_MUTATION = gql`
  mutation signup(
    $fullname: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    signup(
      data: {
        fullname: $fullname
        email: $email
        password: $password
        username: $username
      }
    ) {
      token
      user {
        fullname
        email
        username
        role
        _id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation signin($usernameOrEmail: String!, $password: String!) {
    signin(data: { usernameOrEmail: $usernameOrEmail, password: $password }) {
      token
    }
  }
`;