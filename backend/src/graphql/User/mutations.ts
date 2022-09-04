export const mutations = `
  createUser(
    email: String!
    password: String!
    confirmPassword: String!
    firstName: String!
    lastName: String!
  ): User
  
  login(
    email: String!
    password: String!
  ): Token
  
  updateUser(
    firstName: String!
    lastName: String!
    email: String!
  ): User
`;
