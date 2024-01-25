import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router-dom";

const Post = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  console.log(formData);
  const params = useParams();
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [postCommentData, setPostCommentData] = useState([]);
  console.log(postCommentData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        // Fetch post
        const postRes = await fetch(`/api/post/get/${params.postId}`);
        const postData = await postRes.json();
        if (postRes.ok) {
          setPostData(postData);
          setIsLiked(postData.likes.includes(currentUser._id)); // Set isLiked
          setLikeCount(postData.likes.length); // Set likeCount
        } else {
          throw new Error(postData.message || 'Failed to fetch post');
        }
  
        // Fetch comments
        const commentsRes = await fetch(`/api/comments/get/${params.postId}`);
        const commentsData = await commentsRes.json();
        if (commentsRes.ok) {
          setPostCommentData(commentsData);
        } else {
          throw new Error(commentsData.message || 'Failed to fetch comments');
        }
      } catch (err) {
        setError(true);
        console.error('Fetch error:', err.message);
      }
      setLoading(false);
    };
    fetchPostAndComments();
  }, [params.postId, currentUser._id]); // Added currentUser._id as a dependency
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      content: formData.comment,
      postId: params.postId,
      userId: currentUser._id,
    };

    try {
      // Send a POST request to your API endpoint
      const response = await fetch("/api/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Comment posted successfully:", data);
        console.log("Comment posted successfully:", data);
        setPostCommentData([...postCommentData, data]);
        setFormData({ ...formData, comment: "" });
      } else {
        throw new Error(data.message || "Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  const handleLikeClick = async () => {
    try {
        const response = await fetch(`/api/post/like/${params.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: currentUser._id }),
        });

        const data = await response.json();

        if (response.ok) {
            // Update local state based on the updated post data
            setPostData(data);
            setIsLiked(data.likes.includes(currentUser._id));
            setLikeCount(data.likes.length);
        } else {
            throw new Error(data.message || "Failed to update like");
        }
    } catch (error) {
        console.error("Error updating like:", error.message);
    }
};


  return (
    <div className="p-3 max-w-4xl flex gap-5 mx-auto justify-center">
      <div>
      <h1 className=" text-2xl">{postData.title}</h1>
      <div className=" py-10 ">
        <img
          src={postData.image}
          alt={postData.title}
          className=" rounded-lg "
        />
        <p className=" py-5">Category: {postData.category}</p>
        <div>{postData.content}</div>
      </div>
      <div className=" flex align-middle items-center gap-3">
    <AiOutlineLike onClick={handleLikeClick} style={{ cursor: 'pointer' }} className={`${likeCount > 0 ? "text-green-700" : "text-red-500"} text-2xl`}/>
    <span className={`${likeCount > 0 ? "text-green-700" : "text-red-500"}`}>{likeCount > 0 ? likeCount : "No likes yet"}</span>

</div>

      </div>

      <div className=" w-full  mt-12 pt-6">
        <div className=" p-5 bg-slate-100 rounded-lg">
        <h3 className=" py-4 text-lg">Comments:</h3>
        {postCommentData.length > 0 ? (
          postCommentData.map((comment, index) => (
            <div key={index} className=" px-4 py-4">
              <p>{comment.content}</p>
              {/* Additional comment details can be added here */}
            </div>
            
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          placeholder="enter comment"
          className="border p-3 rounded-lg"
          id="comment"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          post comment
        </button>
      </form>
      </div>
    </div>
  );
};

export default Post;
