import { gql } from 'apollo-server-express';
import { User } from './User';
import { Authorization } from './Authorization';
import { Post } from './Post';

export const typeDefs = gql(`
  ${User.types}
  ${Authorization.types}
  ${Post.types}

  type Query {
    ${User.queries}
    ${Authorization.queries}
    ${Post.queries}
  }
  type Mutation {
    ${User.mutations}
    ${Post.mutations}
  }
`);
