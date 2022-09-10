export const queries = `
  getAllPosts : [Post!]!
  
  getPostById(
    id: ID!
  ): Post!
  
  getPostsPagination(
    perPage: Int!
    page: Int!
  ): PostsWithTotal
`;
