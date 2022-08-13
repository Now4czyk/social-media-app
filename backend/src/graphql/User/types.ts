export const types = `
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
  }
`;

export type UserType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
