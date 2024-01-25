import express from 'express';
import {createPost, getPostsByUser } from "../controllers/post.controller.js"
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, createPost)
router.get('/get/user/:userId', getPostsByUser);

export default router;