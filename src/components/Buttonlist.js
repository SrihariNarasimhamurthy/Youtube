import React from "react";
import Button from "./Button";
import { useSelector } from "react-redux";

const Buttonlist = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const buttonList = [
    "All",
    "Music",
    "Gaming",
    "Adventure",
    "Cooking",
    "Fishing",
    "Live",
    "Football",
    "Cricket",
    "News",
    "Animals",
    "Meditation",
    "Sprituality",
    "Books",
    "Journals",
  ];
  if (!isMenuOpen) {
    buttonList.push("Concert", "Albums");
  }
  return (
    <div className="flex fixed top-16 bg-white">
      {buttonList.map((button) => (
        <Button key={button} name={button} />
      ))}
    </div>
  );
};

export default Buttonlist;
