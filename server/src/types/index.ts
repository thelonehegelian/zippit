import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath?: string;
  friends?: string[];
  location?: string;
  occupation?: string;
  profileViews?: number;
  impressions?: number;
}

export interface IPost extends Document {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  userPicturePath?: string;
  picturePath?: string;
  likes?: Map<string, boolean>;
  comments?: string[];
}

export interface IFriend extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  picturePath?: string;
  occupation: string;
  location: string;
}

export interface IImage extends Document {
  path: string;
}
