export const queries = `
  getAllUsers : [User!]!
  
  getUser : User
  
  getUserById(
    id: ID!
  ): User
`;
