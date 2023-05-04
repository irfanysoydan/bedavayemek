import { gql } from 'apollo-angular';

export const GET_REVIEWS_BY_POST_ID = gql`
  query ($postId: String!) {
    getReviewsByPostId(postId: $postId) {
      data {
        id
        rating
        comment
        image
        isActive
        post {
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
    }
  }
`;
