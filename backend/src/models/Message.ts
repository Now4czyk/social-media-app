import mongoose, { Schema } from 'mongoose';
import { Message } from '../graphql/Message/types';

const MessageSchema = new Schema<Message>(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model('Message', MessageSchema);
