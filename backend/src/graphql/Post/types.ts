import { Schema } from 'mongoose';

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
`;

export interface Post {
  id: string;
  title: string;
  description: string;
  user: Schema.Types.ObjectId;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
