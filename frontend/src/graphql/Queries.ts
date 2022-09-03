import { gql } from "@apollo/client";

export const FETCH_USERS = gql(`
  query {
    getAllUsers {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`);

export const FETCH_USER = gql(`
  query {
    getUser {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`);

export const FETCH_USER_BY_ID = gql(`
  query GetUserById($userId: ID!) {
    getUserById(id: $userId) {
      id
      email
      firstName
      lastName
      posts {
          id
          title
          description
          imageUrl
          createdAt
          updatedAt
      }
      createdAt
      updatedAt
    }
  }
`);

export const FETCH_POST_BY_ID = gql(`
  query GetPostById($postId: ID!) {
    getPostById(id: $postId) {
      id
      title
      description
      imageUrl
      user {
        firstName
        lastName
        id
      }
      createdAt
      updatedAt
    }
  }
`);

export const FETCH_POSTS = gql(`
  query {
    getAllPosts {
      id
      title
      description
      imageUrl
      user {
        id
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`);

export const VERIFY = gql(`
  query {   
    verify {
      isAuthorized
    }
  }
`);
