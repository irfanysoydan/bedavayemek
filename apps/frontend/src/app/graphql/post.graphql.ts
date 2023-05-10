import { gql } from 'apollo-angular';

export const CREATE_POST = gql`
  mutation ($post: CreatePostDto!) {
    createPost(createPostDto: $post) {
      data {
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
        likeCount
        reviewCount
        isActive
        createdAt
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

export const GET_OWN_POSTS = gql`
  query {
    getOwnPosts {
      data {
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
      message
      statusCode
      isSuccessful
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query ($id: String!) {
    getPostById(id: $id) {
      data {
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
      message
      statusCode
      isSuccessful
    }
  }
`;

export const DELETE_POST = gql`
  mutation ($id: String!) {
    deletePostById(id: $id) {
      data
      message
      statusCode
      isSuccessful
    }
  }
`;

export const UPDATE_POST = gql`
  mutation ($id: String!, $post: CreatePostDto!) {
    updatePostById(id: $id, createPostDto: $post) {
      data
      message
      statusCode
      isSuccessful
    }
  }
`;

export const LIKE_POST = gql`
  mutation ($postId: String!) {
    likePost(postId: $postId) {
      data
      message
      statusCode
      isSuccessful
    }
  }
`;
