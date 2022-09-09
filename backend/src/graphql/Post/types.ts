import { User } from '../User/types';

export const types = `
  type Post {
    id: ID!
    title: String!
    description: String!
    imageUrl: String
    user: User
    createdAt: String!
    updatedAt: String!
  }
  
  type PostsWithTotal {
    posts: [Post!]!
    total: Int!
  }
`;

export interface PostPopulated {
  id: string;
  title: string;
  description: string;
  user: User;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
