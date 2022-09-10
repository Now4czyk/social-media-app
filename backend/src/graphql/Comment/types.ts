import { User } from '../User/types';

export const types = `
  type Comment {
    id: ID!
    content: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;

export interface CommentPopulated {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
