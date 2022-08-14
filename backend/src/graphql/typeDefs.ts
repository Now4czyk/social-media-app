import { gql } from 'apollo-server-express';
import { User } from './User';

export const typeDefs = gql(`
  ${User.types}

  type Query {
    ${User.queries}
  }
  type Mutation {
    ${User.mutations}
  }
`);
