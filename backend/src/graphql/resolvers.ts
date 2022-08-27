import { User } from './User';
import { Authorization } from './Authorization';

export const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Authorization.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
  },
};
