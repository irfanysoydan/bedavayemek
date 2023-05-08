import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation ($auth: CreateAuthDto!) {
    register(createAuthDto: $auth) {
      data {
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
      message
      statusCode
      isSuccessful
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($auth: LoginDto!) {
    login(loginDto: $auth) {
      data
      message
      statusCode
      isSuccessful
    }
  }
`;

export const GET_USER = gql`
  query {
    getAuth {
      data {
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
      message
      statusCode
      isSuccessful
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation ($username: String!, $updateAuthDto: UpdateAuthDto!) {
    updateUserProfile(username: $username, updateAuthDto: $updateAuthDto) {
      data
      message
      statusCode
      isSuccessful
    }
  }
`;
