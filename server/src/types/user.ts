import { Document } from "mongoose";

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
  impressions?: number;
}