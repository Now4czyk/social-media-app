import { decodeToken } from '../../middleware/decodeToken';
import { Decoded } from '../User/types';
import { Message } from './types';
import { MessageModel } from '../../models/Message';
import { Context } from '../../utils';

const subscriptions = {
  getAllMessages: {
    subscribe: (_: ParentNode, args: any, { pubSub }: Context) =>
      pubSub.asyncIterator('NEW_MESSAGE'),
  },
};

const queries = {
  getAllMessages: async (_: ParentNode, args: any, { req }: Context) => {
    decodeToken(req);

    return await MessageModel.find().populate('user');
  },
};

const mutations = {
  createMessage: async (
    _: ParentNode,
    { content }: Pick<Message, 'content'>,
    { req, pubSub }: Context
  ) => {
    const decodedUser = decodeToken(req) as Decoded;

    const message = await new MessageModel({
      content,
      user: decodedUser.userId,
    }).save();

    await pubSub.publish('NEW_MESSAGE', {
      getAllMessages: await MessageModel.find().populate('user'),
    });

    return message;
  },
};

export const resolvers = { queries, mutations, subscriptions };
