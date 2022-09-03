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

export interface GetAllUsersQuery {
  getAllUsers: Array<User>;
}

export interface GetUserQuery {
  getUser: User;
}
export interface GetUserByIdQuery {
  getUserById: UserPopulated;
}

export interface PostPopulated {
  id: string;
  title: string;
  description: string;
  user: User;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllPostsQuery {
  getAllPosts: Array<PostPopulated>;
}

export interface GetPostByIdQuery {
  getPostById: PostPopulated;
}

export interface AuthorizationQuery {
  verify: {
    isAuthorized: boolean;
  };
}
