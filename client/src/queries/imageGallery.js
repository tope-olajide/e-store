import gql from "graphql-tag";

export const FETCH_MY_IMAGE_GALLERY = gql`
  {
    fetchUserGallery{
        _id
        imageId
        imageUrl
      }
  }
`;