import { gql } from 'apollo-server-express';
import { User } from './User';
import { Authorization } from './Authorization';
import { Post } from './Post';
import { Message } from './Message';

export const typeDefs = gql(`
  ${User.types}
  ${Authorization.types}
  ${Post.types}
  ${Message.types}

  type Query {
    ${User.queries}
    ${Authorization.queries}
    ${Post.queries}
    ${Message.queries}
  }
  type Mutation {
    ${User.mutations}
    ${Post.mutations}
    ${Message.mutations}
  }
  
  type Subscription {
    ${Message.subscriptions}
  }
`);
