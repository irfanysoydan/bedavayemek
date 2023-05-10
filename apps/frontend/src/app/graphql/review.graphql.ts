import { gql } from 'apollo-angular';

export const CREATE_REVIEW = gql`
  mutation ($review: CreateReviewDto!, $postId: String!) {
    createReview(createReviewDto: $review, postId: $postId) {
      data {
        id
        likeCount
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
          likeCount
          isActive
          auth {
            id
            firstName
            lastName
            username
            email
            password
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

export const GET_REVIEWS_BY_POST_ID = gql`
  query ($postId: String!) {
    getReviewsByPostId(postId: $postId) {
      data {
        id
        likeCount
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
          likeCount
          reviewCount
          isActive
          auth {
            id
            firstName
            lastName
            username
            email
            password
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

export const GET_OWN_REVIEWS = gql`
  query {
    getOwnReviews {
      data {
        id
        likeCount
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
          likeCount
          reviewCount
          isActive
          auth {
            id
            firstName
            lastName
            username
            email
            password
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

export const GET_REVIEW_BY_ID = gql`
  query ($id: String!) {
    getReviewById(id: $id) {
      data {
        id
        likeCount
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
          likeCount
          reviewCount
          isActive
          auth {
            id
            firstName
            lastName
            username
            email
            password
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

export const DELETE_REVIEW = gql`
  mutation ($id: String!) {
    deleteReviewById(id: $id) {
      data
      message
      statusCode
      isSuccessful
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation ($id: String!, $review: CreateReviewDto!) {
    updateReviewById(id: $id, createReviewDto: $review) {
      data
      message
      statusCode
      isSuccessful
    }
  }
`;
