import { User } from './User';
import { Authorization } from './Authorization';
import { Post } from './Post';
import { Message } from './Message';

export const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Post.resolvers.queries,
    ...Authorization.resolvers.queries,
    //TODO: delete because of subscription
    ...Message.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Post.resolvers.mutations,
    ...Message.resolvers.mutations,
  },
  Subscription: {
    ...Message.resolvers.subscriptions,
  },
};
