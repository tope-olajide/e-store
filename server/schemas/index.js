import userSchema from './userSchema';
import productSchema from './productSchema';
import favoriteSchema from './favoriteSchema';
import imageGallerySchema from './imageGallerySchema';

import { gql } from 'apollo-server';

const linkSchema = gql`
type Query {
  _: Boolean
}
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, productSchema, favoriteSchema, imageGallerySchema];