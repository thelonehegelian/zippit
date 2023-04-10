import { Request, Response } from 'express';
import { IPost } from '../types';
import User from '../models/user';
import Post from '../models/post';

// CREATE POST
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

export const getFeedPosts = async (res: Response) => {
  try {
    const allPosts = await Post.find();
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const usersPosts = await Post.find({ userId });

    return res.status(200).json(usersPosts);
  } catch (error) {}
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post?.likes?.get(userId);
    if (!(post && post.likes))
      return res.status(404).json({ error: 'Post not found' });
    isLiked ? post.likes.delete(userId) : post.likes.set(userId, true);

    // update the post
    const updatedPost = await Post.findByIdAndUpdate({
      _id: postId,
      likes: post.likes,
      new: true,
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
