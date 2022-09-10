import { User } from "graphql/User";
import { CommentPopulated } from "../Comment";

export interface PostPopulated {
  id: string;
  title: string;
  description: string;
  user: User;
  likes: Array<{ id: string }>;
  comments: Array<CommentPopulated>;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllPosts {
  getAllPosts: Array<PostPopulated>;
}

export interface GetPostsPagination {
  getPostsPagination: { total: number; posts: Array<PostPopulated> };
}

export interface GetPostById {
  getPostById: PostPopulated;
}
