import { AuthenticationError, ExpressContext } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

//TOUSE with jwt validation
export const auth = (context: ExpressContext) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_KEY!);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error('Authentication token must be Bearer [token]');
  }
  throw new Error('Authorization header must be provided');
};
