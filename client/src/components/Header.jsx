import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) =>{

    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("searchTerm", searchTerm);

    const seaechQuery = urlParams.toString();

    navigate(`/search/${seaechQuery}`);

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className=" font-Raleway bg-slate-700 shadow-md ">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to="/">
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-slate-200">Story</span>
            <span className=" text-white">Stream</span>
          </h1>
        </Link>

        {/* <form
          action=""
          className=" bg-slate-100 p-3 rounded-lg flex items-center"

          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent focus:outline-none w-20 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className=" text-slate-600" />
          </button>
        </form> */}

        <ul className=" flex gap-4">
          <Link to="/">
            <li className=" hidden sm:inline text-white hover:underline hover:text-slate-400">
              Home
            </li>
          </Link>

          <Link to="#">
            <li className=" hidden sm:inline text-white hover:underline hover:text-slate-400">
              About
            </li>
          </Link>

          <Link to="profile">
            {currentUser ? (
              <img
                className=" rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline hover:text-slate-400">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
