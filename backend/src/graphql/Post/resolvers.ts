import { PostPopulated } from './types';
import { CommentModel, PostModel, UserModel } from '../../models';
import { decodeToken } from '../../utils';
import { remove } from 'lodash';
import { Context, Decoded } from '../../types';

const queries = {
  getAllPosts: async (_: ParentNode, args: any, { req }: Context) => {
    decodeToken(req);

    return PostModel.find()
      .populate('user')
      .populate('likes')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      });
  },
  getPostsPagination: async (
    _: ParentNode,
    { perPage, page }: { perPage: number; page: number },
    { req }: Context
  ) => {
    decodeToken(req);

    const total = await PostModel.count();

    const posts = await PostModel.find()
      .populate('user')
      .populate('likes')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return { total, posts };
  },
  getPostById: async (
    _: ParentNode,
    args: { id: string },
    { req }: Context
  ) => {
    decodeToken(req);

    return PostModel.findById({ _id: args.id })
      .populate('user')
      .populate('likes')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      });
  },
};

const mutations = {
  createPost: async (
    _: ParentNode,
    {
      title,
      description,
      imageUrl,
    }: Pick<PostPopulated, 'title' | 'description' | 'imageUrl'>,
    { req }: Context
  ) => {
    const decodedUser = decodeToken(req) as Decoded;

    const user = await UserModel.findOne({ _id: decodedUser.userId });

    if (user) {
      const post = await new PostModel({
        title,
        description,
        imageUrl,
        user: user.id,
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

  deletePost: async (
    _: ParentNode,
    { id }: { id: string },
    { req }: Context
  ) => {
    const decodedUser = decodeToken(req) as Decoded;
    const post = await PostModel.findOne({ _id: id }).populate('user');

    if (post?.user.id === decodedUser.userId) {
      await PostModel.deleteOne({ _id: id });
      const user = await UserModel.findOne({
        _id: decodedUser.userId,
      }).populate('posts');
      remove(user?.posts || [], (post) => post.id === id);
      await user?.save();
    }

    return post;
  },

  updatePost: async (
    _: ParentNode,
    { title, description, imageUrl, id }: PostPopulated & { id: string },
    { req }: Context
  ) => {
    const decodedUser = decodeToken(req) as Decoded;
    const post = await PostModel.findOne({ _id: id }).populate('user');

    if (post?.user.id === decodedUser.userId) {
      post.title = title ? title : post.title;
      post.description = description ? description : post.description;
      post.imageUrl = imageUrl ? imageUrl : post.imageUrl;
      await post.save();
    }

    return post;
  },

  likePost: async (_: ParentNode, { id }: { id: string }, { req }: Context) => {
    const decodedUser = decodeToken(req) as Decoded;
    const post = await PostModel.findOne({ _id: id }).populate('likes');
    const user = await UserModel.findOne({ _id: decodedUser.userId });

    const index = post?.likes.findIndex(
      (like) => like.id === decodedUser.userId
    );

    if (index === -1) post?.likes.push(user!);
    else post?.likes.splice(index as number, 1);

    await post!.save();

    return post;
  },

  commentPost: async (
    _: ParentNode,
    { id, content }: { id: string; content: string },
    { req }: Context
  ) => {
    const decodedUser = decodeToken(req) as Decoded;
    const post = await PostModel.findOne({ _id: id });
    const user = await UserModel.findOne({ _id: decodedUser.userId });

    const comment = new CommentModel({
      user,
      content,
    });
    await comment.save();

    post?.comments.push(comment);
    await post?.save();

    return post;
  },
};

export const resolvers = { queries, mutations };
