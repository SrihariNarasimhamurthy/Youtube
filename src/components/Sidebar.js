import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  //early return pattern
  if (!isMenuOpen) return null;
  return (
    <div className="fixed top-[64px] left-0 h-screen w-3/4 sm:w-60 md:w-64 lg:w-44 bg-white px-4 md:px-6 py-5 shadow-lg z-50 overflow-y-auto">
      <ul>
        <li className="py-2">
          <Link to="/">Home</Link>
        </li>
        <li className="py-2">Shorts</li>
        <li className="py-2">Subscriptions</li>
      </ul>

      <hr className="my-4 border-t-2 border-gray-300" />

      <h1 className="font-bold py-3">Explore</h1>
      <ul>
        <li className="py-2">Trending</li>
        <li className="py-2">Shopping</li>
        <li className="py-2">Live</li>
        <li className="py-2">News</li>
      </ul>

      <hr className="my-4 border-t-2 border-gray-300" />

      <h1 className="font-bold py-3">Subscriptions</h1>
      <ul>
        <li className="py-2">Music</li>
        <li className="py-2">Sports</li>
        <li className="py-2">Gaming</li>
        <li className="py-2">Movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
