import { gql } from "@apollo/client";

export const FETCH_MESSAGES = gql(`
  subscription {
    getAllMessages {
      content
      user {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`);
