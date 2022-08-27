import { User } from './User';
import { Authorization } from './Authorization';
import { Post } from './Post';

export const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Post.resolvers.queries,
    ...Authorization.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Post.resolvers.mutations,
  },
};
