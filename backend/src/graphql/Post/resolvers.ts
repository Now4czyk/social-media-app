import { Post } from './types';
import { PostModel, UserModel } from '../../models';
import { Request } from 'express';
import { decodeToken } from '../../middleware/decodeToken';
import { Decoded } from '../User/types';

const queries = {
  getAllPosts: async () => await PostModel.find(),
  getPostById: async (id: string) => await PostModel.findById(id),
};

const mutations = {
  createPost: async (
    _: ParentNode,
    { title, description, imageUrl }: Post,
    req: Request
  ) => {
    const decodedUser = decodeToken(req) as Decoded;

    const user = await UserModel.findOne({ id: decodedUser.userId });
    if (user) {
      const post = await new PostModel({
        title,
        description,
        imageUrl,
        userId: user.id,
      }).save();

      user.posts.push(post.id);
      user.save();

      return {
        id: post.id,
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    }

    return {
      id: 'ID!',
      title: 'String!',
      description: ' String!',
      imageUrl: 'String',
      createdAt: 'String!',
      updatedAt: 'String!',
    };
  },
};

export const resolvers = { queries, mutations };
