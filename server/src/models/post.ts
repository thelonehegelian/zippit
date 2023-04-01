import { Schema, model } from 'mongoose';
import { IPost } from '../types';

const PostSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userPicturePath: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    required: true,
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: [],
  },
});

export default model<IPost>('User', PostSchema);
