import { User } from './types';
import { UserModel } from '../../models';
import validator from 'validator';
import { UserInputError, ValidationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { decodeToken } from '../../middleware/decodeToken';

const queries = {
  getAllUsers: async (_: ParentNode, args: any, req: Request) => {
    decodeToken(req);

    return UserModel.find();
  },
  getUser: async (_: ParentNode, args: any) =>
    //TODO
    await UserModel.findOne(),
};

const mutations = {
  createUser: async (
    _: ParentNode,
    { firstName, lastName, password, confirmPassword, email }: User
  ) => {
    const errors = [];

    const user = await UserModel.findOne({ email });
    if (user) {
      throw new ValidationError('Email already assigned to an account');
    }

    if (!validator.isLength(firstName, { min: 1 }))
      errors.push({
        message: 'First name not valid',
        id: 'firstName',
      });

    if (!validator.isLength(lastName, { min: 1 }))
      errors.push({
        message: 'Last name not valid',
        id: 'lastName',
      });

    if (!validator.isEmail(email))
      errors.push({
        message: 'Email not valid',
        id: 'email',
      });

    if (!validator.isLength(password, { min: 5 }))
      errors.push({
        message: 'Password not valid',
        id: 'password',
        status: 403,
      });

    if (password !== confirmPassword)
      errors.push({
        message: 'Passwords should be identical',
        id: 'passwords',
        status: 403,
      });

    if (errors.length)
      throw new UserInputError('Failed to create a user', {
        ...errors,
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return newUser;
  },
  login: async (
    _: ParentNode,
    { email, password }: Pick<User, 'email' | 'password'>,
    req: Request
  ) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new ValidationError('Email is invalid');

    const isEqual = await bcrypt.compare(password, user!.password);
    if (!isEqual) throw new ValidationError('Password is invalid');

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_KEY!,
      { expiresIn: '1h' }
    );

    return { token };
  },
};

export const resolvers = { queries, mutations };
