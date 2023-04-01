//  getUser,
// getUserFriends,
// addRemoveFriend,
import { Request, Response } from 'express';
import User from '../models/user';

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// @audit - revisit, probably won't work
export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      const friendIds = user.friends || [];
      const friends = await Promise.all(
        friendIds.map(async (friendId) => {
          const friend = await User.findById(friendId);
          return friend ? friend.toJSON() : null;
        })
      );

      res.json(friends.filter((friend) => friend !== null));
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user && friend) {
      if (user.friends?.includes(friendId)) {
        user.friends = user.friends = user.friends.filter(
          (friend) => friend !== friendId
        );
        friend.friends = friend?.friends?.filter((friend) => friend !== id);
      } else {
        if (user.friends) {
          user.friends.push(friendId);
          friend.friends?.push(id);
        }
      }
      await user.save();
      await friend.save();
      const friendIds = user.friends || [];
      const friends = await Promise.all(
        friendIds.map(async (friendId) => {
          const friend = await User.findById(friendId);
          return friend ? friend.toJSON() : null;
        })
      );

      res.send(200).json(friends.filter((friend) => friend !== null));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
