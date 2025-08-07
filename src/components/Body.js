import React from "react";
import Sidebar from "./Sidebar";
// import Maincontainer from "./Maincontainer";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          isMenuOpen ? "ml-44" : "ml-5 "
        } flex-1`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
