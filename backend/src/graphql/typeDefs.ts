import { gql } from 'apollo-server-express';
import { User } from './User';
import { Authorization } from './Authorization';
import { Post } from './Post';
import { Message } from './Message';
import { Comment } from './Comment';

export const typeDefs = gql(`
  ${User.types}
  ${Authorization.types}
  ${Post.types}
  ${Message.types}
  ${Comment.types}

  type Query {
    ${User.queries}
    ${Authorization.queries}
    ${Post.queries}
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
