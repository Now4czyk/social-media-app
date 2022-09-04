import mongoose, { Schema } from 'mongoose';
import { MessagePopulated } from '../graphql/Message/types';

const MessageSchema = new Schema<MessagePopulated>(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model('Message', MessageSchema);
