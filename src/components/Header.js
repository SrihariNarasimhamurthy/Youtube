import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log(searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const dispatch = useDispatch();
  const hangleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white h-16 px-4 shadow-md flex flex-wrap items-center justify-between gap-3">
      {/* Left section - Hamburger + Logo */}
      <div className="flex items-center gap-4">
        <img
          src="https://cdn2.iconfinder.com/data/icons/most-useful-icons-4/50/HAMBURGER_MENU-512.png"
          alt="hamburger"
          className="h-6 cursor-pointer"
          onClick={hangleToggleMenu}
        />
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png"
          alt="LOGO"
          className="h-10"
        />
      </div>

      {/* Middle section - Search bar */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative">
        <div className="flex w-full md:w-2/3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            className="w-full border border-gray-400 px-4 py-1.5 rounded-l-full text-sm"
            placeholder="Search"
          />
          <button className="border border-gray-400 px-4 py-1.5 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {searchQuery && showSuggestions && (
          <div className="absolute top-12 md:top-full bg-white py-2 px-3 mt-1 w-full md:w-[31rem] rounded-lg border border-gray-300 shadow-lg z-50">
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="py-2 px-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
                >
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right section - Profile Icon */}
      <div className="flex items-center">
        <img
          src="https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
          alt="usericon"
          className="h-8"
        />
      </div>
    </div>
  );
};

export default Header;
