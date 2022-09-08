import mongoose, { Schema } from 'mongoose';
import { PostPopulated } from '../graphql/Post/types';

const PostSchema = new Schema<PostPopulated>(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model('Post', PostSchema);
