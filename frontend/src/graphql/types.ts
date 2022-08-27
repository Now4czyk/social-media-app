export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersQuery {
  getAllUsers: Array<User>;
}

export interface UserQuery {
  getUser: User;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  userId: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsQuery {
  getAllPosts: Array<Post>;
}

export interface AuthorizationQuery {
  verify: {
    isAuthorized: boolean;
  };
}
