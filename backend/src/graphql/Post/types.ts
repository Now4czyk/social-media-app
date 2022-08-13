export const types = `
  type Post {
    id: ID!
    title: String!
    description: String!
    imageUrl: String
    createdAt: String!
    updatedAt: String!
  }
`;

export type PostType = {
  title: string;
  description: string;
  imageUrl?: string;
};
