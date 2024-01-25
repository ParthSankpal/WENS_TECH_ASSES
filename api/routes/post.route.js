import express from 'express';
import {createPost, getPostsByUser, getPostDetails, likePost, getAllPosts  } from "../controllers/post.controller.js"
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, createPost)
router.get('/get/user/:userId', getPostsByUser);
router.get("/get/:postId", getPostDetails);
router.put('/like/:postId', likePost);
router.get('/getAll/:userId', getAllPosts)

export default router;