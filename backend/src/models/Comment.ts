import mongoose, { Schema } from 'mongoose';
import { CommentPopulated } from '../graphql/Comment/types';

const CommentSchema = new Schema<CommentPopulated>(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model('Comment', CommentSchema);
