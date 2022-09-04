import { Request } from 'express';
import { PubSub } from 'graphql-subscriptions';

export interface Context {
  req: Request;
  pubSub: PubSub;
}

export type Decoded = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};
