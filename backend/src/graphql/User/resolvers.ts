import { UserType } from './types';
import { User } from '../../models';
import validator from 'validator';
import { UserInputError, ValidationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const queries = {
  getAllUsers: async () => await User.find(),
};

const mutations = {
  createUser: async (
    _: ParentNode,
    { firstName, lastName, password, confirmPassword, email }: UserType
  ) => {
    const errors = [];

    const user = await User.findOne({ email });
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

    return await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
  },
  login: async (
    _: ParentNode,
    { email, password }: Pick<UserType, 'email' | 'password'>
  ) => {
    const user = await User.findOne({ email });
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

    return {
      token,
      userId: user.id,
    };
  },
};

export const resolvers = { queries, mutations };
