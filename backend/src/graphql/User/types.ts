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
  
  type AuthData {
    token: String!
    userId: String!
  }
`;

export type UserType = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};
