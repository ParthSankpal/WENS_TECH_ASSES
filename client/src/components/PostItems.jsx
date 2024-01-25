import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg sm:w-[400px]">
      <Link to={`/post/${post._id}`}>
        <img
          src={post.image || "https://via.placeholder.com/400"}
          alt="post cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {post.title}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {post.content}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            Category: {post.category}
          </p>
          {/* Additional post details can be added here */}
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
