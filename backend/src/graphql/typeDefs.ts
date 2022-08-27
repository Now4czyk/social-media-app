import { gql } from 'apollo-server-express';
import { User } from './User';
import { Authorization } from './Authorization';

export const typeDefs = gql(`
  ${User.types}
  ${Authorization.types}

  type Query {
    ${User.queries}
    ${Authorization.queries}
  }
  type Mutation {
    ${User.mutations}
  }
`);
