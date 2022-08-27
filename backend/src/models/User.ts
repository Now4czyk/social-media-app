import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
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
