import { Request, Response } from 'express';
import { IPost } from '../types';
import User from '../models/user';
import Post from '../models/post';

export const getFeedPosts = async (req: Request, res: Response) => {};
export const getUserPosts = async (req: Request, res: Response) => {};
export const likePost = async (req: Request, res: Response) => {};

// export default createPost;

export const createPost = async (req: Request, res: Response) => {
  try {
    const body = req.body as Pick<
      IPost,
      'userId' | 'description' | 'picturePath'
    >;
    const user = await User.findById(body.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newPost = await Post.create({
      userId: body.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: body.description,
      picturePath: body.picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    // get the newly created post
    const allPosts = await Post.find();
    return res.status(201).json(allPosts);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
