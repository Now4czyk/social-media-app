import { gql } from "@apollo/client";

export const LOAD_USERS = gql(`
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

export const VERIFY = gql(`
  query {   
    verify {
      isAuthorized
    }
  }
`);
