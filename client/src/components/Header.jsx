import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currUser } = useSelector((state) => state.user);
  return (
    <header className="bg-black shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex  ">
            <span className="text-white">Pathan</span>
            <span className="text-orange-500">Estate</span>
          </h1>
        </Link>
        <form className="bg-white p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search...."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch
            className="text-black hover:cursor-pointer hover:text-orange-500
          "
          />
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/create-listing">
            {" "}
            <button className=" text-sm sm:text-base sm:px-5 border bg-black ml-4 text-white py-2 px-4 rounded-xl  hover:text-orange-500 hover:cursor-pointer active:border-orange-500 ">
              Post
            </button>
          </Link>
          <Link to="/">
            <li className="hidden sm:inline text-white hover:text-orange-400 hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-white hover:text-orange-400 hover:cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currUser ? (
              <img
                className="w-10 h-10 rounded-2xl object-cover"
                src={currUser.avatar}
                alt="Profile"
              />
            ) : (
              <li className="text-white hover:text-orange-400 hover:cursor-pointer">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
