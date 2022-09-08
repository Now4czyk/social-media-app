import { User } from "graphql/User";

export interface MessagePopulated {
  content: string;
  user: Pick<User, "id" | "firstName" | "lastName">;
  createdAt: string;
}

export interface GetAllMessages {
  getAllMessages: Array<MessagePopulated>;
}
