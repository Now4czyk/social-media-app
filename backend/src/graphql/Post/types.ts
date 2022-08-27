export const types = `
  type Post {
    id: ID!
    title: String!
    description: String!
    imageUrl: String
    userId: String!
    createdAt: String!
    updatedAt: String!
  }
`;

export interface Post {
  id: string;
  title: string;
  description: string;
  userId: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
