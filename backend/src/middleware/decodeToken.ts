import jwt from 'jsonwebtoken';
import express from 'express';

export const decodeToken = (req: express.Request, requireAuth = true) => {
  //@ts-ignore
  const header = req.req.headers.authorization;
  console.log('headers');
  console.log();

  if (header) {
    const token = header.replace('Bearer ', '');

    const verified = jwt.verify(token, process.env.JWT_KEY!);
    console.log('verified');
    console.log(verified);
    return verified;
    //  TODO try catch
  }
  return null;
};
