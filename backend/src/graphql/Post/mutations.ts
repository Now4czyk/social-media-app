export const mutations = `
  createPost(
    title: String!
    description: String!
    imageUrl: String
  ): Post
  
  deletePost(
    id: ID!
  ): Post
  
  updatePost(
    id: ID!
    title: String!
    description: String!
    imageUrl: String
  ): Post
  
  likePost(
    id: ID!
  ):Post
  
  commentPost(
    id: ID!
    content: String!
  ):Post
`;
