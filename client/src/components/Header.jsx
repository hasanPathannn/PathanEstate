import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currUser } = useSelector((state) => state.user);
  return (
    <header className="bg-lime-200 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-lime-500">Pathan</span>
            <span className="text-lime-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-lime-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search...."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch
            className="text-lime-700 hover:cursor-pointer hover:text-orange-400
          "
          />
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-lime-700 hover:text-orange-400 hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-lime-700 hover:text-orange-400 hover:cursor-pointer">
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
              <li className="text-lime-700 hover:text-orange-400 hover:cursor-pointer">
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
