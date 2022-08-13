import { UserType } from "./types";
import { User } from "../../models";
import validator from "validator";
import { UserInputError } from "apollo-server-express";

const queries = {
  getAllUsers: async () => await User.find(),
};

const mutations = {
  createUser: async (a: ParentNode, args: UserType) => {
    const errors = [];
    if (!validator.isEmail(args.email))
      errors.push({
        message: "Email not valid",
        id: "email",
      });

    if (!validator.isLength(args.firstName, { min: 5 }))
      errors.push({
        message: "First name not valid",
        id: "firstName",
      });

    if (!validator.isLength(args.lastName, { min: 5 }))
      errors.push({
        message: "Last name not valid",
        id: "lastName",
      });

    if (!validator.isLength(args.password, { min: 5 }))
      errors.push({
        message: "Password not valid",
        id: "password",
        status: 403,
      });

    if (errors.length)
      throw new UserInputError("Failed to create a user", {
        ...errors,
      });

    return await new User({
      email: args.email,
      password: args.password,
      firstName: args.firstName,
      lastName: args.lastName,
    }).save();
  },
};

export const resolvers = { queries, mutations };
