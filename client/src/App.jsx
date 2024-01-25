import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route path="/about" element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path="/post/:postId" element={<Post/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
