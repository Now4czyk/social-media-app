import { PostType } from "./types";
import { Post } from "../../models";

const queries = {
  getAllPosts: async () => await Post.find(),
  getPostById: async (id: string) => await Post.findById(id),
};

const mutations = {
  createPost: async (_: ParentNode, args: PostType) => {},
};

export const resolvers = { queries, mutations };
