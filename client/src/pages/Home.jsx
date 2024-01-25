import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import PostItem from "../components/PostItems";
import SwiperCore from "swiper";
import "swiper/css/bundle";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [userPosts, setUserPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const allPostIds = userPosts.map((post) => post._id);
  console.log(userPosts, "USERPOSTS");
  console.log(userPosts._id, "USERPOSTSID");

  for (let post of userPosts) {
    console.log(post._id, "will log the '_id' of each post in the array"); // will log the '_id' of each post in the array
  }
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`/api/post/get/user/${currentUser._id}`);
        const data = await res.json();
        setUserPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllPosts = async () => {
      try {

        const res = await fetch(`/api/post/getAll/${currentUser._id}`);
        const data = await res.json();
        setAllPosts(data);
        console.log(allPosts);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllPosts()
    fetchUserPosts();
  }, [currentUser._id]);

  return (
    <div className=" font-Raleway">
      {/* top */}
      <div className=" flex flex-col gap-6 py-28 px-4 max-w-6xl mx-auto">
        <h1 className=" text-slate-700 font-bold text-3xl lg:text-6xl">
          StoryStream: Weaving Narratives, Connecting Worlds – Your Digital
          Diary of Diverse Tales.
        </h1>
      </div>

     

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
  <div className="">
    <div className="my-3">
      <h2 className="text-2xl font-semibold text-slate-600">
        Your Posts
      </h2>
    </div>
    {userPosts.length > 0 ? (
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {userPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    ) : (
      <div className="text-center">
        <p className=" py-4">You don't have any posts yet. Let's create one!</p>
        <Link to="/create-post" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Post
        </Link>
      </div>
    )}
  </div>

  <div>
  <div className="my-3">
      <h2 className="text-2xl font-semibold text-slate-600">
        View all Posts
      </h2>
    </div>
    {allPosts.length > 0 ? (
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {allPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    ) : (
      <div className="text-center">
        <p>No posts yet</p>
        
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default Home;
