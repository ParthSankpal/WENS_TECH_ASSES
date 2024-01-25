import express from 'express';

import { createComment, getCommentsForPost } from '../controllers/comment.controller.js';

const router = express.Router();


router.post('/create', createComment);
router.get('/get/:postId', getCommentsForPost);


export default router;