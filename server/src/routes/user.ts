import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/userController';
import { verifyToken } from '../middleware/authJwt';

const router = express.Router();

/**
 * GET requests
 */
// dynamic route for user profile, in express you we use :id or :<something-else> to create a dynamic route
router.get('/user/:id', verifyToken, getUser);
router.get('./user/:id/friends', verifyToken, getUserFriends);

// https://stackoverflow.com/questions/28459418/use-of-put-vs-patch-vs-post-in-rest-api-real-life-scenarios (TLDR: patch is used to update a resource)
router.patch('/user/:id/friends', verifyToken, addRemoveFriend);
