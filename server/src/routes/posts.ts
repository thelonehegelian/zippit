import { Router } from 'express';
import verifyToken from '../middleware/authToken';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../controllers/postController';

const router = Router();

router.get('./', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

router.patch('/:postId/like', verifyToken, likePost);

export default router;
