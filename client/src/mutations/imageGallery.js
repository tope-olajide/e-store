import { gql } from "apollo-boost";


export const DELETE_IMAGE_MUTATION = gql`
  mutation deleteImage($imageId: ID!) {
    deleteImage( imageId: $imageId) {
        isImageDeleted
    }
  }
`;
