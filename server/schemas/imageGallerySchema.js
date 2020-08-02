import { gql } from "apollo-server";

export default gql`
  type ImageGallery {
    _id: ID!
    imageUrl: String!
    imageId: String!
  }
  type IsImageDeleted {
    isImageDeleted: Boolean
  }
  input Image {
    imageUrl: String!
    imageId: String!
  }

  extend type Mutation {
    saveImageUrl(uploadedImagesUrl: [Image!]!): [ImageGallery!]!
    deleteImage(imageId:ID!): IsImageDeleted
  }
  extend type Query {
    fetchUserGallery: [ImageGallery]
  }
`;
