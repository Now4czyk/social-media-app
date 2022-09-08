import { gql } from "@apollo/client";

export const VERIFY = gql(`
  query {   
    verify {
      isAuthorized
    }
  }
`);
