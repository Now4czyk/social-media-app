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

export const VERIFY = gql(`
  query {   
    verify {
      isAuthorized
    }
  }
`);
