import { PostPopulated } from "graphql/Post";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPopulated {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  posts: Array<PostPopulated>;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllUsers {
  getAllUsers: Array<User>;
}

export interface GetUser {
  getUser: User;
}
export interface GetUserById {
  getUserById: UserPopulated;
}
