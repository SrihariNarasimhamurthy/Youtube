import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex p-2">
      <img
        className="h-6"
        alt="user"
        src="https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
      />
      <span className="font-bold px-2 text-sm">{name}</span>
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default ChatMessage;
