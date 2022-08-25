import { gql } from "@apollo/client";

export const LOAD_USERS = gql(`
  query {
    getAllUsers {
      id
      email
      firstName
      lastName
      token
      createdAt
      updatedAt
    }
  }
`);

export type UserType = Record<string, string>;
