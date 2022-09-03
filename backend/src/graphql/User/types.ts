import { Post } from '../Post/types';

export const types = `
  type User {
    id: ID!
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
  }
  
  type UserPopulated {
    id: ID!
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }
  
  type Token {
    token: String!
  }
`;

export interface User {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
  posts: Array<Post>;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export type Decoded = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};
