import { decodeToken } from '../../middleware';
import { MessagePopulated } from './types';
import { MessageModel } from '../../models';
import { Context, Decoded } from '../../types';

const subscriptions = {
  getAllMessages: {
    subscribe: (_: ParentNode, args: any, { pubSub }: Context) => {
      //immediate data fetch without waiting until user send a message
      setTimeout(
        async () =>
          pubSub.publish('NEW_MESSAGE', {
            getAllMessages: await MessageModel.find().populate('user'),
          }),
        0
      );

      return pubSub.asyncIterator('NEW_MESSAGE');
    },
  },
};

const mutations = {
  createMessage: async (
    _: ParentNode,
    { content }: Pick<MessagePopulated, 'content'>,
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

export const resolvers = { mutations, subscriptions };
