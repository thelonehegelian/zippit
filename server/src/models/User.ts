import { Document, Schema, Model, model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath?: string;
  friends?: string[];
  location?: string;
  occupation?: string;
  profileViews?: number;
}

export const UserSchema: Schema<IUser> = new Schema<IUser>(
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
      maxlength: 50,
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
  },
  { timestamps: true }
);

export const User: Model<IUser> = model<IUser>('User', UserSchema);
