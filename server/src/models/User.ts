import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
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

const User = mongoose.model('User', UserSchema);

export default User;
