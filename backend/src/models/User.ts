import mongoose, { Schema } from 'mongoose';
import { User } from '../graphql/User/types';

const UserSchema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);
