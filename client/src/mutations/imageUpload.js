import { gql } from "apollo-boost";

export const SAVE_UPLOADED_PICTURES = gql`

  mutation saveImageUrl($uploadedImagesUrl: [Image!]!) {
    saveImageUrl( uploadedImagesUrl:$uploadedImagesUrl ) {
      imageId
      imageUrl
    }
  }
`;
