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
