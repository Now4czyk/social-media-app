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
  
  type Token {
    token: String!
  }
`;

export interface User {
  email: string;
  password: string;
  confirmPassword: string;
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
