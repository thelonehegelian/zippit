import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      unique: true,
      lowercase: true,
      // @note is there a way to validate email here?
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
    picturePath: {
      type: String,
      default: '',
    },
    friends: {
      type: [String],
      default: [],
    },
    location: String,
    occupation: String,
    profileViews: Number,
    impressions: Number,
  },
  { timestamps: true }
);

export default model<IUser>('User', UserSchema);
