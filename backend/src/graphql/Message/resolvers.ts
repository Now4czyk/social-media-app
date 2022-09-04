import { Request } from 'express';
import { decodeToken } from '../../middleware/decodeToken';
import { Decoded } from '../User/types';
import { Message } from './types';
import { MessageModel } from '../../models/Message';

const queries = {
  getAllMessages: async (_: ParentNode, args: any, req: Request) => {
    decodeToken(req);

    return await MessageModel.find().populate('user');
  },
};

const mutations = {
  createMessage: async (
    _: ParentNode,
    { content }: Pick<Message, 'content'>,
    req: Request
  ) => {
    const decodedUser = decodeToken(req) as Decoded;

    return new MessageModel({
      content,
      user: decodedUser.userId,
    }).save();
  },
};

export const resolvers = { queries, mutations };
