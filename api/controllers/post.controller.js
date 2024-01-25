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

  export const getPostDetails = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      
      // console.log(post, "POST DATA");
      return res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  export const likePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId;
    console.log(postId, userId);

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        const index = post.likes.findIndex((id) => id === String(userId));

        if (index === -1) {
            // Like the post
            post.likes.push(userId);
        } else {
            // Dislike the post
            post.likes = post.likes.filter((id) => id !== String(userId));
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true });
        
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const posts = await Post.find({ userId: { $ne: userId } })
    console.log(posts);
    return res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}