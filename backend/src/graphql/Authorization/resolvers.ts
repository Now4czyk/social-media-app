import { Request } from 'express';
import { decodeToken } from '../../middleware/decodeToken';

const queries = {
  verify: async (_: ParentNode, args: any, req: Request) => ({
    isAuthorized: !!(await decodeToken(req)),
  }),
};

export const resolvers = { queries };
