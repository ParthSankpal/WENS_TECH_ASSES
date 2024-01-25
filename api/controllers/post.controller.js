import Post from '../models/post.model.js'

import { errorHandler } from '../utils/error.js'

export const createPost = async (req, res, next )=>{
    try{

        const post = await Post.create(req.body);
        return res.status(200).json(post);
        
        
    } catch(error){
        next(error);
    }
}


export const getPostsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const posts = await Post.find({ userId: userId });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };