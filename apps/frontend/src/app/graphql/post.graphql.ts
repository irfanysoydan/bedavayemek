import { gql } from 'apollo-angular';

export const GET_POSTS = gql`
  query {
    getPosts {
      data {
        id
        title
        description
        image
        location
        expireDate
        rating
        isActive
        auth {
          id
          firstName
          lastName
          username
          email
          password
          rating
          avatar
          isActive
        }
      }
      message
      statusCode
      isSuccessful
    }
  }
`;
