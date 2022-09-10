import { User } from "../User";

export interface CommentPopulated {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
