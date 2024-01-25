import Comment from '../models/comment.model.js'

export const createComment = async (req, res) => {
    try {
      const newComment = new Comment({
        content: req.body.content,
        postId: req.body.postId,
        userId: req.body.userId,
      });
  
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getCommentsForPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await Comment.find({ postId: postId }).sort({ createdAt: -1 });
  
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching comments', error: err });
    }
  };