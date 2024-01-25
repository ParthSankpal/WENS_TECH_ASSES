import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {  // REFERENCING FROM POST SCHEMA
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
  },
    userId: {
      type: String,
      required: true,
    },
    
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;