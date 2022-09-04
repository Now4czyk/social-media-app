import { User } from '../User/types';

export const types = `
  type Message {
    id: ID!
    content: String!
    user: String!
    createdAt: String!
    updatedAt: String!
  }
  
  type MessagePopulated {
    id: ID!
    content: String!
    user: User
    createdAt: String!
    updatedAt: String!
  }
`;

export interface Message {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
