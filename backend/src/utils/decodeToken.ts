import jwt from 'jsonwebtoken';
import express from 'express';
import { ValidationError } from 'apollo-server-express';

export const decodeToken = (req: express.Request) => {
  const header = req.headers.authorization;

  if (header) {
    try {
      const token = header.replace('Bearer ', '');
      const verified = jwt.verify(token, process.env.JWT_KEY!);

      return verified;
    } catch (error) {
      throw new ValidationError('JWT validation failed');
    }
  }
  return null;
};
