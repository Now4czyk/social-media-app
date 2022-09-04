import { gql } from "@apollo/client";

export const FETCH_MESSAGES_SUBSCRIPTION = gql(`
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
